import React from 'react';
import { View, SafeAreaView } from 'react-native';
import PageHeader from '../PageHeader';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ControlledTextInput from '../forms/ControlledTextInput';
import { AuthControllerApi } from '../../api';
import ApiErrors from '../forms/ApiErrors';
import { setToken } from '../../redux/slices/UserSlice';
import { DefaultFormFields } from '../../types';
import { useDispatch } from 'react-redux';
import { saveToken } from '../../utils/AuthUtils';
import Logger from '../../utils/Logger';
import RiserButton from '../forms/RiserButton';
import { getConfiguration } from '../../utils/ApiUtils';
import colors from '../../styles/colors';

interface LoginProps {}

interface LoginFormFields extends DefaultFormFields {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const Login: React.FC<LoginProps> = ({}) => {
  const dispatch = useDispatch();

  const { handleSubmit, control, errors, setError, clearErrors } = useForm<
    LoginFormFields
  >({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: LoginFormFields) => {
    clearErrors();

    const api = new AuthControllerApi(getConfiguration());

    try {
      const response = await api.login(data);
      await saveToken(response.data.token);
      dispatch(setToken(response.data.token));
    } catch (e) {
      Logger.error('Error thrown while logging in:', e);
      setError('apiError', { message: e.response.data.message });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.primary }}>
      <PageHeader text={'Login'} textStyle={{ color: colors.white }} />

      <View style={{ paddingHorizontal: 20, marginTop: 100 }}>
        <ApiErrors errors={errors} />

        <ControlledTextInput
          label="Email"
          keyboardType={'email-address'}
          control={control}
          errors={errors}
          name={'email'}
          autoCapitalize={'none'}
          autoCompleteType={'email'}
        />

        <ControlledTextInput
          label="Password"
          control={control}
          errors={errors}
          name={'password'}
          autoCompleteType={'password'}
          returnKeyType={'go'}
          onSubmitEditing={handleSubmit(onSubmit)}
          secureTextEntry
        />

        <RiserButton text="Log In" onPress={handleSubmit(onSubmit)} />
      </View>
    </SafeAreaView>
  );
};

export default Login;
