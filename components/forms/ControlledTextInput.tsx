import React from 'react';
import { KeyboardTypeOptions, Text, TextInput, View } from 'react-native';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import colors from '../../styles/colors';
import { human } from 'react-native-typography';

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
    <View style={{ marginVertical: 5 }}>
      {label && (
        <Text
          style={[
            human.calloutWhite,
            { marginBottom: 5, color: colors.white },
          ]}>
          {label}
        </Text>
      )}
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            style={[
              human.body,
              {
                borderColor: hasErrors ? colors.danger : colors.headerBlack,
                borderWidth: 2,
                backgroundColor: colors.white,
                paddingVertical: 10,
                paddingHorizontal: 10,
              },
            ]}
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
        <View style={{ backgroundColor: colors.titleBlack, padding: 5 }}>
          <Text style={{ color: colors.white }}>{errors[name].message}</Text>
        </View>
      )}
    </View>
  );
};

export default ControlledTextInput;
