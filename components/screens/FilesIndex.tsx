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
import PageHeader from '../PageHeader';
import { RootState } from '../../redux/rootReducer';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../Loading';
import IconButton from '../IconButton';
import { canAddFilesFolders } from '../../utils/AuthorizationUtils';
import { getRootFolderForOrganization } from '../../redux/slices/FilesSlice';

type FilesIndexNavigationProps = StackNavigationProp<FilesParams, 'FilesIndex'>;

interface FilesIndexProps {
  navigation: FilesIndexNavigationProps;
}

const FilesIndex: React.FC<FilesIndexProps> = ({ navigation }) => {
  const dispatch = useDispatch();

  const {
    files: { loading, organizationIdToRootFolderId, folderToChildren },
    organizations: { currentOrganization },
  } = useSelector((state: RootState) => state);

  useEffect(() => {
    dispatch(getRootFolderForOrganization(currentOrganization!));
  }, []);

  const rootFolderId = organizationIdToRootFolderId[currentOrganization!.id];
  const files = folderToChildren[rootFolderId];

  const RightComponent = (
    <IconButton
      onPress={() =>
        navigation.navigate('CreateFolder', {
          id: rootFolderId,
        })
      }
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
                onPress={() =>
                  navigation.navigate('FolderDetail', { id: item.id })
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

export default FilesIndex;
