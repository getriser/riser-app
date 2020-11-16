import React, { useEffect, useRef } from 'react';
import ActionSheet from 'react-native-actions-sheet';
import { StackNavigationProp } from '@react-navigation/stack';
import { ListItem } from 'react-native-elements';
import { FilesParams } from '../../types';
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import PageHeader from '../PageHeader';
import { RootState } from '../../redux/rootReducer';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../Loading';
import IconButton from '../IconButton';
import { canAddFilesFolders } from '../../utils/AuthorizationUtils';
import { getRootFolderForOrganization } from '../../redux/slices/FilesSlice';
import DocumentPicker from 'react-native-document-picker';
import Logger from '../../utils/Logger';
import { FileFolderType, FolderControllerApi } from '../../api';
import { getConfiguration } from '../../utils/ApiUtils';
import colors from '../../styles/colors';

type FilesIndexNavigationProps = StackNavigationProp<FilesParams, 'FilesIndex'>;

interface FilesIndexProps {
  navigation: FilesIndexNavigationProps;
}

const FilesIndex: React.FC<FilesIndexProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const actionSheetRef = useRef<ActionSheet>();

  const {
    files: { loading, organizationIdToRootFolderId, folderToChildren },
    organizations: { currentOrganization },
  } = useSelector((state: RootState) => state);

  useEffect(() => {
    dispatch(getRootFolderForOrganization(currentOrganization!));
  }, []);

  const rootFolderId = organizationIdToRootFolderId[currentOrganization!.id];
  const files = folderToChildren[rootFolderId];
  const openFilePicker = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });

      console.log(
        res.uri,
        res.type, // mime type
        res.name,
        res.size,
      );

      const api = new FolderControllerApi(getConfiguration());
      await api.uploadFile(rootFolderId, res);

      dispatch(getRootFolderForOrganization(currentOrganization!));
    } catch (err) {
      Logger.error('error!', err);
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  const RightComponent = (
    <IconButton
      onPress={() => {
        actionSheetRef.current?.setModalVisible(true);
      }}
      iconName={'file-plus'}
    />
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PageHeader
        text={'Files'}
        RightComponent={
          canAddFilesFolders(currentOrganization!.role) ? RightComponent : null
        }
      />
      <View style={{ flex: 1 }}>
        {loading && !files ? (
          <Loading />
        ) : (
          <FlatList
            contentContainerStyle={{ flexGrow: 1 }}
            data={files}
            refreshing={loading}
            onRefresh={() =>
              dispatch(getRootFolderForOrganization(currentOrganization!))
            }
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  if (item.type === FileFolderType.FOLDER) {
                    navigation.navigate('FolderDetail', { id: item.id });
                  }
                }}>
                <ListItem
                  leftAvatar={{
                    icon: {
                      type: 'feather',
                      name:
                        item.type === FileFolderType.FILE ? 'file' : 'folder',
                    },
                    iconStyle: { color: '#fff' },
                    overlayContainerStyle: {
                      backgroundColor:
                        item.type == FileFolderType.FILE
                          ? '#000'
                          : colors.primary,
                    },
                  }}
                  title={item.name}
                  chevron={item.type === FileFolderType.FOLDER}
                />
              </TouchableOpacity>
            )}
            ListEmptyComponent={() => (
              <>
                <Text style={{ textAlign: 'center', marginTop: 20 }}>
                  There are no files uploaded.
                </Text>
                <Text style={{ textAlign: 'center', marginTop: 10 }}>
                  Click on the top right icon to begin uploading files and
                  folders.
                </Text>
              </>
            )}
          />
        )}
      </View>
      {/* @ts-ignore */}
      <ActionSheet headerAlwaysVisible gestureEnabled ref={actionSheetRef}>
        <View style={{ paddingVertical: 10 }}>
          <ListItem
            leftAvatar={{
              icon: { type: 'feather', name: 'folder-plus' },
              iconStyle: { color: '#000' },
              overlayContainerStyle: { backgroundColor: '#000' },
            }}
            title="Create Folder"
            onPress={() => {
              actionSheetRef.current?.setModalVisible(false);
              navigation.navigate('CreateFolder', { id: rootFolderId });
            }}
          />
          <ListItem
            leftAvatar={{
              icon: { type: 'feather', name: 'upload' },
              iconStyle: { color: '#000' },
              overlayContainerStyle: { backgroundColor: '#000' },
            }}
            onPress={() => {
              actionSheetRef.current?.setModalVisible(false);
              setTimeout(() => {
                openFilePicker();
              }, 1000);
            }}
            title="Upload File"
          />
        </View>
      </ActionSheet>
    </SafeAreaView>
  );
};

export default FilesIndex;
