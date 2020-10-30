import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import PageHeader from '../PageHeader';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ControlledTextInput from '../forms/ControlledTextInput';
import { Button } from 'react-native-paper';
import colors from '../../styles/colors';
import { AuthControllerApi } from '../../api';
import ApiErrors from '../forms/ApiErrors';
import { setToken } from '../../redux/slices/UserSlice';
import { DefaultFormFields } from '../../types';
import { useDispatch } from 'react-redux';

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

    const api = new AuthControllerApi({ basePath: 'http://localhost:3000' });

    try {
      const response = await api.login(data);
      dispatch(setToken(response.data.token));
    } catch (e) {
      setError('apiError', { message: e.response.data.message });
    }
  };

  return (
    <SafeAreaView>
      <PageHeader text={'Login'} />

      <View style={{ paddingHorizontal: 20, marginTop: 100 }}>
        <ApiErrors errors={errors} />

        <ControlledTextInput
          label="Email"
          keyboardType={'email-address'}
          control={control}
          errors={errors}
          name={'email'}
        />

        <ControlledTextInput
          label="Password"
          control={control}
          errors={errors}
          name={'password'}
          secureTextEntry
        />

        <Button
          theme={{ colors: { primary: colors.headerBlack } }}
          style={{ backgroundColor: colors.headerBlack, marginTop: 10 }}
          onPress={handleSubmit(onSubmit)}>
          <Text style={{ color: colors.white }}>Log In</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default Login;
