import React, { MutableRefObject, useState } from 'react';
import ActionSheet from 'react-native-actions-sheet';
import { Linking, View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import { RootState } from '../../redux/rootReducer';
import { useSelector } from 'react-redux';
import { FileControllerApi } from '../../api';
import { getConfiguration } from '../../utils/ApiUtils';
import { useNavigation } from '@react-navigation/native';
import { canEditFiles } from '../../utils/AuthorizationUtils';
import colors from '../../styles/colors';
import ActionSheetDeleteConfirmation from '../ActionSheet/ActionSheetDeleteConfirmation';
import Logger from '../../utils/Logger';

interface FileDetailActionSheetProps {
  actionSheetRef: MutableRefObject<ActionSheet | undefined>;
  fileId?: number;
  onDismiss(): void;
}

const FileDetailActionSheet: React.FC<FileDetailActionSheetProps> = ({
  actionSheetRef,
  fileId,
  onDismiss,
}) => {
  const navigation = useNavigation();
  const [inDeleteMode, setInDeleteMode] = useState<boolean>(false);
  const {
    files: { filesById },
    organizations: { currentOrganization },
  } = useSelector((state: RootState) => state);

  const fileName = fileId ? filesById[fileId]?.name || '' : '';

  const minHeight = canEditFiles(currentOrganization!.role) ? 250 : 125;

  return (
    // @ts-ignore
    <ActionSheet headerAlwaysVisible gestureEnabled ref={actionSheetRef}>
      <View style={{ paddingVertical: 10, minHeight }}>
        <Text style={{ textAlign: 'center' }}>{fileName}</Text>
        {inDeleteMode ? (
          <ActionSheetDeleteConfirmation
            onCancel={() => setInDeleteMode(false)}
            onConfirm={() => Logger.debug('delete')}
          />
        ) : (
          <>
            <ListItem
              leftAvatar={{
                icon: { type: 'feather', name: 'download' },
                iconStyle: { color: '#000' },
                overlayContainerStyle: { backgroundColor: '#000' },
              }}
              title="Download File"
              onPress={async () => {
                const api = new FileControllerApi(getConfiguration());
                const response = await api.downloadFile(fileId!);

                Linking.openURL(response.data.downloadUrl);
              }}
            />
            {canEditFiles(currentOrganization!.role) && (
              <>
                <ListItem
                  leftAvatar={{
                    icon: { type: 'feather', name: 'edit' },
                    iconStyle: { color: '#000' },
                    overlayContainerStyle: { backgroundColor: '#000' },
                  }}
                  onPress={() => {
                    onDismiss();
                    navigation.navigate('UpdateFile', { id: fileId });
                  }}
                  title="Edit File"
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
                  title="Delete File"
                />
              </>
            )}
          </>
        )}
      </View>
    </ActionSheet>
  );
};

export default FileDetailActionSheet;
