import React from 'react';
import { KeyboardTypeOptions, Text, TextInput, View } from 'react-native';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import colors from '../../styles/colors';

interface ControlledTextInputProps {
  control: Control;
  errors: FieldErrors;
  name: string;
  label?: string;
  defaultValue?: string;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
}

const ControlledTextInput: React.FC<ControlledTextInputProps> = ({
  control,
  errors,
  name,
  label,
  defaultValue = '',
  keyboardType,
  secureTextEntry,
}) => {
  const hasErrors = errors[name];

  return (
    <>
      {label && <Text style={{ marginBottom: 5 }}>{label}</Text>}
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            style={{
              borderColor: hasErrors ? colors.danger : colors.headerBlack,
              borderWidth: 2,
              backgroundColor: colors.veryLightGray,
              color: colors.headerBlack,
              paddingVertical: 10,
              paddingHorizontal: 10,
            }}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
          />
        )}
        name={name}
        defaultValue={defaultValue}
      />

      {errors[name] && (
        <View style={{ backgroundColor: colors.lighterPrimary, padding: 5 }}>
          <Text style={{}}>{errors[name].message}</Text>
        </View>
      )}
    </>
  );
};

export default ControlledTextInput;
