import React, { useState } from 'react';
import {  AnnouncementResponse } from '../../api';
import { View } from 'react-native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { DefaultFormFields } from '../../types';
import ControlledTextInput from '../forms/ControlledTextInput';
import RiserButton from '../forms/RiserButton';
import { useDispatch } from 'react-redux';
import { postComment } from '../../redux/slices/AnnouncementsSlice';

interface AddCommentProps {
  announcement: AnnouncementResponse;
}

interface AddCommentFields extends DefaultFormFields {
  comment: string;
}

const schema = yup.object().shape({
  comment: yup.string().required(),
});

const AddComment: React.FC<AddCommentProps> = ({ announcement }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    handleSubmit,
    control,
    errors,
    clearErrors,
    reset,
  } = useForm<AddCommentFields>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: AddCommentFields) => {
    clearErrors();
    setIsLoading(true);

    await dispatch(postComment(announcement, data.comment));

    setIsLoading(false);

    reset({ comment: '' });
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: 15,
        marginTop: 10,
        alignItems: 'center',
      }}>
      <View style={{ width: '80%', marginRight: 5 }}>
        <ControlledTextInput
          placeholder={'Add a comment...'}
          control={control}
          errors={errors}
          name={'comment'}
        />
      </View>
      <View style={{ marginBottom: 10 }}>
        <RiserButton
          text={isLoading ? '...' : 'Send'}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </View>
  );
};

export default AddComment;
