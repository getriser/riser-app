import React, { MutableRefObject } from 'react';
import { FlatList, Text, TouchableOpacity } from 'react-native';
import { FAB } from 'react-native-paper';
import { FileFolderType } from '../../api';
import { ListItem } from 'react-native-elements';
import colors from '../../styles/colors';
import { useNavigation } from '@react-navigation/native';
import ActionSheet from 'react-native-actions-sheet';
import FilesActionSheet from './FilesActionSheet';
import { RootState } from '../../redux/rootReducer';
import { useSelector } from 'react-redux';

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
  isRoot = false,
}) => {
  const navigation = useNavigation();

  const { folderToChildren } = useSelector((state: RootState) => state.files);
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
            onPress={() => {
              if (item.type === FileFolderType.FOLDER) {
                navigation.navigate('FolderDetail', { id: item.id });
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
                    item.type == FileFolderType.FILE ? '#000' : colors.primary,
                },
              }}
              title={item.name}
              chevron={item.type === FileFolderType.FOLDER}
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
      {/* @ts-ignore */}
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
      <FilesActionSheet
        actionSheetRef={actionSheetRef}
        folderId={folderId}
        isRoot={isRoot}
        onRefresh={onRefresh}
      />
    </>
  );
};

export default FileFolderList;
