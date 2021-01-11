import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  AnnouncementsParams,
  ButtonType,
  DefaultFormFields,
} from '../../types';
import ModalHeader from '../ModalHeader';
import colors from '../../styles/colors';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Logger from '../../utils/Logger';
import ApiErrors from '../forms/ApiErrors';
import ControlledTextInput from '../forms/ControlledTextInput';
import RiserButton from '../forms/RiserButton';
import { AnnouncementControllerApi } from '../../api';
import { getConfiguration } from '../../utils/ApiUtils';
import { RootState } from '../../redux/rootReducer';
import { useDispatch, useSelector } from 'react-redux';
import { human } from 'react-native-typography';
import { fetchAnnouncements } from '../../redux/slices/AnnouncementsSlice';

type CreateAnnouncementNavigationProps = StackNavigationProp<
  AnnouncementsParams,
  'CreateAnnouncement'
>;

type CreateAnnouncementRouteProp = RouteProp<
  AnnouncementsParams,
  'CreateAnnouncement'
>;

interface CreateAnnouncementProps {
  navigation: CreateAnnouncementNavigationProps;
  route: CreateAnnouncementRouteProp;
}

const schema = yup.object().shape({
  title: yup.string().required(),
  content: yup.string().required(),
});

interface CreateAnnouncementFormFields extends DefaultFormFields {
  title: string;
  content: string;
}

const CreateAnnouncement: React.FC<CreateAnnouncementProps> = ({
  navigation,
  route,
}) => {
  const dispatch = useDispatch();
  const { handleSubmit, control, errors, setError, clearErrors } = useForm<
    CreateAnnouncementFormFields
  >({
    resolver: yupResolver(schema),
  });

  const { currentOrganization } = useSelector(
    (state: RootState) => state.organizations,
  );

  const onSubmit = async (data: CreateAnnouncementFormFields) => {
    clearErrors();

    const api = new AnnouncementControllerApi(getConfiguration());

    try {
      await api.createAnnouncement({
        ...data,
        organizationId: currentOrganization!.id,
      });

      dispatch(fetchAnnouncements(currentOrganization!.id));
      navigation.goBack();
    } catch (e) {
      Logger.error('Error thrown while logging in:', e);
      setError('apiError', { message: e.response.data.message });
    }
  };

  const saveAndSend = async (data: CreateAnnouncementFormFields) => {
    clearErrors();

    const api = new AnnouncementControllerApi(getConfiguration());
    const response = await api.createAnnouncement({
      ...data,
      organizationId: currentOrganization!.id,
    });

    await api.publishAnnouncement(response.data.id);

    await dispatch(fetchAnnouncements(currentOrganization!.id));

    navigation.goBack();
  };

  const RightComponent = (
    <TouchableOpacity onPress={handleSubmit(saveAndSend)}>
      <Text style={[human.bodyWhite, { fontWeight: 'bold' }]}>Send</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.headerBlack }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ModalHeader
          title="Create Announcement"
          RightComponent={RightComponent}
        />
        <ScrollView style={{ padding: 20 }}>
          <ApiErrors errors={errors} />

          <ControlledTextInput
            label="Title"
            control={control}
            errors={errors}
            name={'title'}
          />

          <ControlledTextInput
            label="Content"
            control={control}
            errors={errors}
            name={'content'}
            onEndEditing={(e) => Logger.debug('onEndEditing', e)}
            multiline
            inputStyle={{ minHeight: 300 }}
          />

          <RiserButton
            text={'Save as Draft'}
            onPress={handleSubmit(onSubmit)}
            buttonType={ButtonType.PRIMARY}
          />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default CreateAnnouncement;
