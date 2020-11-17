import React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ButtonType, DefaultFormFields, FilesParams } from '../../types';
import ModalHeader from '../ModalHeader';
import colors from '../../styles/colors';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import ApiErrors from '../forms/ApiErrors';
import ControlledTextInput from '../forms/ControlledTextInput';
import RiserButton from '../forms/RiserButton';
import { useDispatch, useSelector } from 'react-redux';
import { updateFolder } from '../../redux/slices/FilesSlice';
import { RootState } from '../../redux/rootReducer';

type UpdateFolderNavigationProps = StackNavigationProp<
  FilesParams,
  'UpdateFolder'
>;

type UpdateFolderRouteProp = RouteProp<FilesParams, 'UpdateFolder'>;

interface UpdateFolderProps {
  navigation: UpdateFolderNavigationProps;
  route: UpdateFolderRouteProp;
}

const schema = yup.object().shape({
  name: yup.string().required(),
});

interface UpdateFolderFormFields extends DefaultFormFields {
  name: string;
}

const UpdateFolder: React.FC<UpdateFolderProps> = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const { foldersById } = useSelector((state: RootState) => state.files);
  const folderId = route.params.id;
  const folder = foldersById[folderId];

  const { handleSubmit, control, errors, clearErrors } = useForm<
    UpdateFolderFormFields
  >({
    resolver: yupResolver(schema),
    defaultValues: {
      name: folder.name,
    },
  });

  const onSubmit = async (data: UpdateFolderFormFields) => {
    clearErrors();

    await dispatch(updateFolder(folderId, data));
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.headerBlack }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ModalHeader title="Update Folder" />
        <ScrollView style={{ padding: 20 }}>
          <ApiErrors errors={errors} />

          <ControlledTextInput
            label="Name"
            control={control}
            errors={errors}
            name={'name'}
            returnKeyType={'go'}
            onSubmitEditing={handleSubmit(onSubmit)}
          />

          <RiserButton
            text={'Update'}
            onPress={handleSubmit(onSubmit)}
            buttonType={ButtonType.PRIMARY}
          />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default UpdateFolder;
