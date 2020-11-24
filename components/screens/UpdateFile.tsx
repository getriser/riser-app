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
import { updateFile } from '../../redux/slices/FilesSlice';
import { RootState } from '../../redux/rootReducer';

type UpdateFileNavigationProps = StackNavigationProp<FilesParams, 'UpdateFile'>;

type UpdateFileRouteProp = RouteProp<FilesParams, 'UpdateFile'>;

interface UpdateFileProps {
  navigation: UpdateFileNavigationProps;
  route: UpdateFileRouteProp;
}

const schema = yup.object().shape({
  name: yup.string().required(),
});

interface UpdateFileFormFields extends DefaultFormFields {
  name: string;
}

const UpdateFile: React.FC<UpdateFileProps> = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const { filesById } = useSelector((state: RootState) => state.files);
  const fileId = route.params.id;
  const file = filesById[fileId];

  const { handleSubmit, control, errors, clearErrors } = useForm<
    UpdateFileFormFields
  >({
    resolver: yupResolver(schema),
    defaultValues: {
      name: file.name,
    },
  });

  const onSubmit = async (data: UpdateFileFormFields) => {
    clearErrors();

    await dispatch(updateFile(fileId, data));
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.headerBlack }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ModalHeader title="Update File" />
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

export default UpdateFile;
