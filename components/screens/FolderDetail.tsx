import React, { useEffect, useRef } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { FilesParams } from '../../types';
import { SafeAreaView, View } from 'react-native';
import { RootState } from '../../redux/rootReducer';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../Loading';
import IconButton from '../IconButton';
import { canAddFilesFolders } from '../../utils/AuthorizationUtils';
import { getFilesForFolder } from '../../redux/slices/FilesSlice';
import { RouteProp } from '@react-navigation/native';
import ModalHeader from '../ModalHeader';
import colors from '../../styles/colors';
import FileFolderList from '../Files/FileFolderList';
import ActionSheet from 'react-native-actions-sheet';

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
  const actionSheetRef = useRef<ActionSheet>();

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
      containerStyle={{ padding: undefined }}
      onPress={() => navigation.navigate('UpdateFolder', { id: folderId })}
      iconName={'edit'}
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
          <FileFolderList
            folderId={folder.id}
            isLoading={loading}
            onRefresh={() => dispatch(getFilesForFolder(folder.id))}
            actionSheetRef={actionSheetRef}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default FolderDetail;
