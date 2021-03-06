import React, { MutableRefObject, useRef, useState } from 'react';
import { FlatList, Text, TouchableOpacity } from 'react-native';
import { FAB } from 'react-native-paper';
import { FileFolderType } from '../../api';
import { ListItem } from 'react-native-elements';
import colors from '../../styles/colors';
import { useNavigation } from '@react-navigation/native';
import ActionSheet from 'react-native-actions-sheet';
import CreateFolderUploadFileActionSheet from './CreateFolderUploadFileActionSheet';
import { RootState } from '../../redux/rootReducer';
import { useSelector } from 'react-redux';
import { canAddFilesFolders } from '../../utils/AuthorizationUtils';
import { StackNavigationProp } from '@react-navigation/stack';
import FileDetailActionSheet from './FileDetailActionSheet';

interface FileFolderListProps {
  folderId: number;
  isLoading: boolean;
  onRefresh(): void;
  isRoot?: boolean;
  actionSheetRef: MutableRefObject<ActionSheet | undefined>;
}

const FileFolderList: React.FC<FileFolderListProps> = ({
  folderId,
  isLoading,
  onRefresh,
  actionSheetRef,
}) => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const [selectedFileId, setSelectedFileId] = useState<number | undefined>(
    undefined,
  );
  const fileActionSheetRef = useRef<ActionSheet>();

  const {
    files: { folderToChildren },
    organizations: { currentOrganization },
  } = useSelector((state: RootState) => state);
  const files = folderToChildren[folderId];

  return (
    <>
      <FlatList
        contentContainerStyle={{ flexGrow: 1 }}
        data={files}
        refreshing={isLoading}
        onRefresh={onRefresh}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={async () => {
              if (item.type === FileFolderType.FOLDER) {
                navigation.push('FolderDetail', { id: item.id });
              } else {
                setSelectedFileId(item.id);
                fileActionSheetRef.current!.setModalVisible(true);
              }
            }}>
            <ListItem
              leftAvatar={{
                icon: {
                  type: 'feather',
                  name: item.type === FileFolderType.FILE ? 'file' : 'folder',
                },
                iconStyle: { color: '#fff' },
                overlayContainerStyle: {
                  backgroundColor:
                    item.type === FileFolderType.FILE ? '#000' : colors.primary,
                },
              }}
              title={item.name}
              chevron
            />
          </TouchableOpacity>
        )}
        ListEmptyComponent={() => (
          <>
            <Text
              style={{
                textAlign: 'center',
                marginTop: 40,
                color: colors.subtitleGray,
              }}>
              There are no files uploaded.
            </Text>
          </>
        )}
      />
      {canAddFilesFolders(currentOrganization!.role) && (
        // @ts-ignore
        <FAB
          style={{
            position: 'absolute',
            bottom: 50,
            right: 30,
            backgroundColor: colors.primary,
          }}
          color={colors.white}
          icon="plus"
          onPress={() => actionSheetRef.current?.setModalVisible(true)}
        />
      )}

      <CreateFolderUploadFileActionSheet
        actionSheetRef={actionSheetRef}
        folderId={folderId}
        onRefresh={onRefresh}
      />

      <FileDetailActionSheet
        actionSheetRef={fileActionSheetRef}
        fileId={selectedFileId}
        onDismiss={() => {
          fileActionSheetRef.current!.setModalVisible(false);
          setSelectedFileId(undefined);
        }}
      />
    </>
  );
};

export default FileFolderList;
