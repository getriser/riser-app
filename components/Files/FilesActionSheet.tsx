import React, { MutableRefObject, useState } from 'react';
import ActionSheet from 'react-native-actions-sheet';
import { View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import DocumentPicker from 'react-native-document-picker';
import { FolderControllerApi } from '../../api';
import { getConfiguration } from '../../utils/ApiUtils';
import { Modal, Portal, Provider } from 'react-native-paper';
import Loading from '../Loading';
import { UploadProgressEvent } from '../../types';
import Logger from '../../utils/Logger';

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
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

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

      setIsVisible(true);

      const api = new FolderControllerApi(getConfiguration());
      await api.uploadFile(folderId, res, {
        onUploadProgress: (event: UploadProgressEvent) => {
          Logger.debug('onUploadProgress:', event);
          setProgress(event.loaded / event.total);
        },
      });

      setIsVisible(false);

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
    <>
      {/*@ts-ignore*/}
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
      <Provider>
        <Portal>
          <Modal dismissable={false} visible={isVisible}>
            <View
              style={{
                marginHorizontal: 50,
                backgroundColor: '#fff',
                height: 200,
              }}>
              <Loading
                text={
                  progress !== 1
                    ? `Uploading ${(progress * 100).toFixed()}% complete...`
                    : 'Saving...'
                }
              />
            </View>
          </Modal>
        </Portal>
      </Provider>
    </>
  );
};

export default FilesActionSheet;
