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
import { useDispatch } from 'react-redux';
import { createFolder } from '../../redux/slices/FilesSlice';

type CreateFolderNavigationProps = StackNavigationProp<
  FilesParams,
  'CreateFolder'
>;

type CreateFolderRouteProp = RouteProp<FilesParams, 'CreateFolder'>;

interface CreateFolderProps {
  navigation: CreateFolderNavigationProps;
  route: CreateFolderRouteProp;
}

const schema = yup.object().shape({
  name: yup.string().required(),
});

interface CreateFolderFormFields extends DefaultFormFields {
  name: string;
}

const CreateFolder: React.FC<CreateFolderProps> = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { handleSubmit, control, errors, clearErrors } = useForm<
    CreateFolderFormFields
  >({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: CreateFolderFormFields) => {
    clearErrors();

    await dispatch(createFolder({ parentId: route.params.id, ...data }));
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.headerBlack }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ModalHeader title="Create Folder" />
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
            text={'+ Create Folder'}
            onPress={handleSubmit(onSubmit)}
            buttonType={ButtonType.PRIMARY}
          />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default CreateFolder;
