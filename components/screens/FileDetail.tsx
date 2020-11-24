import React, { useState } from 'react';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';
import { StackNavigationProp } from '@react-navigation/stack';
import { ButtonType, FilesParams } from '../../types';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { RootState } from '../../redux/rootReducer';
import { useSelector } from 'react-redux';
import IconButton from '../IconButton';
import { canAddFilesFolders } from '../../utils/AuthorizationUtils';
import { RouteProp } from '@react-navigation/native';
import ModalHeader from '../ModalHeader';
import colors from '../../styles/colors';
import RiserButton from '../forms/RiserButton';
import { FileControllerApi } from '../../api';
import { getConfiguration } from '../../utils/ApiUtils';
import Logger from '../../utils/Logger';

type FileDetailNavigationProps = StackNavigationProp<FilesParams, 'FileDetail'>;

type FileDetailRouteProp = RouteProp<FilesParams, 'FileDetail'>;

interface FileDetailProps {
  navigation: FileDetailNavigationProps;
  route: FileDetailRouteProp;
}

const FileDetail: React.FC<FileDetailProps> = ({ navigation, route }) => {
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [downloadPercentage, setDownloadPercentage] = useState<number>(0);

  const fileId = route.params.id;

  const {
    files: { filesById },
    organizations: { currentOrganization },
  } = useSelector((state: RootState) => state);

  const file = filesById[fileId];

  const RightComponent = (
    <IconButton
      containerStyle={{ padding: undefined }}
      onPress={() => navigation.navigate('UpdateFile', { id: fileId })}
      iconName={'edit'}
    />
  );

  const onDownload = async () => {
    setDownloadPercentage(0);

    const api = new FileControllerApi(getConfiguration());
    const response = await api.downloadFile(fileId);
    const localFile = `${RNFS.DocumentDirectoryPath}/${response.data.name}`;
    const options: RNFS.DownloadFileOptions = {
      fromUrl: response.data.downloadUrl,
      toFile: localFile,
      progress: (res) => {
        Logger.debug('res:', res);
        setDownloadPercentage(res.bytesWritten / res.contentLength);
      },
    };

    setIsDownloading(true);

    await RNFS.downloadFile(options).promise;
    FileViewer.open(localFile);

    setIsDownloading(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.primary }}>
      <ModalHeader
        title={file.name}
        backIcon={'chevron-left'}
        RightComponent={
          canAddFilesFolders(currentOrganization!.role) ? RightComponent : null
        }
      />
      <ScrollView style={{ flex: 1, backgroundColor: colors.white }}>
        <View style={{ paddingHorizontal: 20 }}>
          <RiserButton
            buttonType={ButtonType.DEFAULT}
            text={
              isDownloading ? `${downloadPercentage}% Complete` : 'Download'
            }
            onPress={onDownload}
          />

          <RiserButton
            buttonType={ButtonType.DANGER}
            text={'Delete'}
            onPress={() => {}}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FileDetail;
