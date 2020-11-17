import React, { useEffect } from 'react';
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
import { RootState } from '../../redux/rootReducer';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../Loading';
import IconButton from '../IconButton';
import { canAddFilesFolders } from '../../utils/AuthorizationUtils';
import {
  getFilesForFolder,
  getRootFolderForOrganization,
} from '../../redux/slices/FilesSlice';
import { RouteProp } from '@react-navigation/native';
import ModalHeader from '../ModalHeader';
import colors from '../../styles/colors';

type FolderDetailNavigationProps = StackNavigationProp<
  FilesParams,
  'FolderDetail'
>;

type FolderDetailRouteProp = RouteProp<FilesParams, 'FolderDetail'>;

interface FolderDetailProps {
  navigation: FolderDetailNavigationProps;
  route: FolderDetailRouteProp;
}

const FolderDetail: React.FC<FolderDetailProps> = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const folderId = route.params.id;

  const {
    files: { loading, folderToChildren, foldersById },
    organizations: { currentOrganization },
  } = useSelector((state: RootState) => state);

  useEffect(() => {
    dispatch(getFilesForFolder(folderId));
  }, []);

  const files = folderToChildren[folderId];
  const folder = foldersById[folderId];

  const RightComponent = (
    <IconButton
      onPress={() =>
        navigation.navigate('CreateFolder', {
          id: folderId,
        })
      }
      iconName={'file-plus'}
    />
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.primary }}>
      <ModalHeader
        title={folder.name}
        backIcon={'chevron-left'}
        RightComponent={
          canAddFilesFolders(currentOrganization!.role) ? RightComponent : null
        }
      />
      <View style={{ flex: 1, backgroundColor: colors.white }}>
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
                onPress={() =>
                  navigation.push('FolderDetail', { id: item.id })
                }>
                <ListItem
                  leftAvatar={{
                    icon: { type: 'feather', name: 'file' },
                    iconStyle: { color: '#000' },
                    overlayContainerStyle: { backgroundColor: '#000' },
                  }}
                  title={item.name}
                  chevron
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
    </SafeAreaView>
  );
};

export default FolderDetail;
