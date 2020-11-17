import React, { MutableRefObject } from 'react';
import ActionSheet from 'react-native-actions-sheet';
import { View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import DocumentPicker from 'react-native-document-picker';
import { FolderControllerApi } from '../../api';
import { getConfiguration } from '../../utils/ApiUtils';

interface FilesActionSheetProps {
  actionSheetRef: MutableRefObject<ActionSheet | undefined>;
  folderId: number;
  isRoot: boolean;
  onRefresh(): void;
}

const FilesActionSheet: React.FC<FilesActionSheetProps> = ({
  actionSheetRef,
  folderId,
  isRoot,
  onRefresh,
}) => {
  const navigation = useNavigation();

  const openFilePicker = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      console.log(
        res.uri,
        res.type, // mime type
        res.name,
        res.size,
      );

      const api = new FolderControllerApi(getConfiguration());
      await api.uploadFile(folderId, res);

      onRefresh();
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  return (
    // @ts-ignore
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
            navigation.navigate('CreateFolder', { id: folderId });
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
  );
};

export default FilesActionSheet;
