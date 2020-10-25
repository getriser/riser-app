import React from 'react';
import { FieldErrors } from 'react-hook-form';
import { View, Text } from 'react-native';
import colors from '../../styles/colors';

interface ApiErrorsProps {
  errors: FieldErrors;
}

const ApiErrors: React.FC<ApiErrorsProps> = ({ errors }) => {
  if (!errors.apiError) {
    return null;
  }

  return (
    <View
      style={{
        backgroundColor: colors.danger,
        padding: 10,
        borderRadius: 3,
        marginBottom: 10,
      }}>
      <Text style={{ color: colors.white }}>{errors.apiError.message}</Text>
    </View>
  );
};

export default ApiErrors;
