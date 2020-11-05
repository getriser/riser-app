import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ButtonType, DefaultFormFields, MembersParams } from '../../types';
import ModalHeader from '../ModalHeader';
import colors from '../../styles/colors';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Logger from '../../utils/Logger';
import ApiErrors from '../forms/ApiErrors';
import ControlledTextInput from '../forms/ControlledTextInput';
import RiserButton from '../forms/RiserButton';
import { OrganizationControllerApi } from '../../api';
import { getConfiguration } from '../../utils/ApiUtils';
import { RootState } from '../../redux/rootReducer';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMembers } from '../../redux/slices/MembersSlice';

type AddMemberNavigationProps = StackNavigationProp<MembersParams, 'AddMember'>;

type AddMemberRouteProp = RouteProp<MembersParams, 'AddMember'>;

interface AddMemberProps {
  navigation: AddMemberNavigationProps;
  route: AddMemberRouteProp;
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
});

interface AddMemberFormFields extends DefaultFormFields {
  email: string;
  firstName: string;
  lastName: string;
}

const AddMember: React.FC<AddMemberProps> = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { handleSubmit, control, errors, setError, clearErrors } = useForm<
    AddMemberFormFields
  >({
    resolver: yupResolver(schema),
  });

  const { currentOrganization } = useSelector(
    (state: RootState) => state.organizations,
  );

  const onSubmit = async (data: AddMemberFormFields) => {
    clearErrors();

    const api = new OrganizationControllerApi(getConfiguration());

    try {
      await api.inviteMember(currentOrganization!.id, data);
      dispatch(fetchMembers(currentOrganization!.id));
      navigation.goBack();
    } catch (e) {
      Logger.error('Error thrown while logging in:', e);
      setError('apiError', { message: e.response.data.message });
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.headerBlack }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ModalHeader title="Add Member" />
        <View style={{ padding: 20 }}>
          <ApiErrors errors={errors} />

          <ControlledTextInput
            label="First Name"
            control={control}
            errors={errors}
            name={'firstName'}
          />

          <ControlledTextInput
            label="Last Name"
            control={control}
            errors={errors}
            name={'lastName'}
          />

          <ControlledTextInput
            label="Email"
            keyboardType={'email-address'}
            control={control}
            errors={errors}
            name={'email'}
          />

          <RiserButton
            text={'Add Member'}
            onPress={handleSubmit(onSubmit)}
            buttonType={ButtonType.PRIMARY}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default AddMember;
