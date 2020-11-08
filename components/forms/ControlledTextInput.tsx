import React from 'react';
import {
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  ReturnKeyTypeOptions,
  Text,
  TextInput,
  TextInputEndEditingEventData,
  TextInputSubmitEditingEventData,
  TextStyle,
  View,
} from 'react-native';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import colors from '../../styles/colors';
import { human } from 'react-native-typography';

interface ControlledTextInputProps {
  control: Control;
  errors: FieldErrors;
  name: string;
  inputStyle?: TextStyle;
  label?: string;
  placeholder?: string;
  defaultValue?: string;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  returnKeyType?: ReturnKeyTypeOptions;
  onSubmitEditing?: (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ) => void;
  multiline?: boolean;
  onEndEditing?: (
    e: NativeSyntheticEvent<TextInputEndEditingEventData>,
  ) => void;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoCompleteType?:
    | 'cc-csc'
    | 'cc-exp'
    | 'cc-exp-month'
    | 'cc-exp-year'
    | 'cc-number'
    | 'email'
    | 'name'
    | 'password'
    | 'postal-code'
    | 'street-address'
    | 'tel'
    | 'username'
    | 'off';
}

const ControlledTextInput: React.FC<ControlledTextInputProps> = ({
  control,
  errors,
  name,
  label,
  placeholder,
  defaultValue = '',
  keyboardType,
  secureTextEntry,
  autoCapitalize,
  autoCompleteType,
  returnKeyType,
  onSubmitEditing,
  multiline,
  onEndEditing,
  inputStyle,
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
                borderRadius: 5,
              },
              inputStyle,
            ]}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
            placeholder={placeholder}
            autoCapitalize={autoCapitalize}
            autoCompleteType={autoCompleteType}
            returnKeyType={returnKeyType}
            onSubmitEditing={onSubmitEditing}
            onEndEditing={onEndEditing}
            multiline={multiline}
            textAlignVertical={multiline ? 'top' : undefined}
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
