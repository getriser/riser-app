import React, { useEffect, useRef } from 'react';
import ActionSheet from 'react-native-actions-sheet';
import { StackNavigationProp } from '@react-navigation/stack';
import { FilesParams } from '../../types';
import { SafeAreaView, View } from 'react-native';
import PageHeader from '../PageHeader';
import { RootState } from '../../redux/rootReducer';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../Loading';
import { getRootFolderForOrganization } from '../../redux/slices/FilesSlice';
import FileFolderList from '../Files/FileFolderList';

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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PageHeader text={'Files'} />
      <View style={{ flex: 1 }}>
        {loading && !files ? (
          <Loading />
        ) : (
          <FileFolderList
            folderId={rootFolderId}
            isLoading={loading}
            onRefresh={() =>
              dispatch(getRootFolderForOrganization(currentOrganization!))
            }
            isRoot
            actionSheetRef={actionSheetRef}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default FilesIndex;
