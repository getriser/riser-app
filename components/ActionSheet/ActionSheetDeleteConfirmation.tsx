import React from 'react';
import { View, Text } from 'react-native';
import RiserButton from '../forms/RiserButton';
import { ButtonType } from '../../types';
import { human } from 'react-native-typography';

interface ActionSheetDeleteConfirmationProps {
  onCancel(): void;
  onConfirm(): void;
}

const ActionSheetDeleteConfirmation: React.FC<ActionSheetDeleteConfirmationProps> = ({
  onCancel,
  onConfirm,
}) => {
  return (
    <View style={{ marginVertical: 10 }}>
      <Text style={[human.body, { textAlign: 'center' }]}>
        Are you sure you want to delete this?
      </Text>
      <View style={{ marginTop: 10, marginHorizontal: 15 }}>
        <RiserButton
          text={'Cancel'}
          onPress={onCancel}
          buttonType={ButtonType.DEFAULT}
        />

        <RiserButton
          text={'Delete'}
          onPress={onConfirm}
          buttonType={ButtonType.DANGER}
        />
      </View>
    </View>
  );
};

export default ActionSheetDeleteConfirmation;
