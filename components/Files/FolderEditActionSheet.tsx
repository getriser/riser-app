import React, { MutableRefObject, useState } from 'react';
import ActionSheet from 'react-native-actions-sheet';
import { View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import colors from '../../styles/colors';
import ActionSheetDeleteConfirmation from '../ActionSheet/ActionSheetDeleteConfirmation';
import { deleteFolder } from '../../redux/slices/FilesSlice';

interface FolderEditActionSheetProps {
  actionSheetRef: MutableRefObject<ActionSheet | undefined>;
  folderId: number;
  onDismiss(): void;
  onDelete(): void;
}

const FolderEditActionSheet: React.FC<FolderEditActionSheetProps> = ({
  actionSheetRef,
  folderId,
  onDismiss,
  onDelete,
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [inDeleteMode, setInDeleteMode] = useState<boolean>(false);

  return (
    <ActionSheet
      headerAlwaysVisible
      gestureEnabled
      // @ts-ignore
      ref={actionSheetRef}
      onClose={() => setInDeleteMode(false)}>
      <View style={{ paddingVertical: 10, minHeight: 200 }}>
        {inDeleteMode ? (
          <ActionSheetDeleteConfirmation
            onCancel={() => setInDeleteMode(false)}
            onConfirm={async () => {
              await dispatch(deleteFolder(folderId!));
              setInDeleteMode(false);
              onDismiss();
              onDelete();
            }}
          />
        ) : (
          <>
            <ListItem
              leftAvatar={{
                icon: { type: 'feather', name: 'edit' },
                iconStyle: { color: '#000' },
                overlayContainerStyle: { backgroundColor: '#000' },
              }}
              onPress={() => {
                onDismiss();
                navigation.navigate('UpdateFolder', { id: folderId });
              }}
              title="Edit Folder"
            />

            <ListItem
              leftAvatar={{
                icon: { type: 'feather', name: 'trash-2' },
                iconStyle: { color: '#000' },
                overlayContainerStyle: { backgroundColor: colors.danger },
              }}
              onPress={() => {
                setInDeleteMode(true);
              }}
              title="Delete Folder"
            />
          </>
        )}
      </View>
    </ActionSheet>
  );
};

export default FolderEditActionSheet;
