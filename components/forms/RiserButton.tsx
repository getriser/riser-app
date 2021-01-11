import React from 'react';
import { Text, ViewStyle } from 'react-native';
import { Button } from 'react-native-paper';
import colors from '../../styles/colors';
import { ButtonType } from '../../types';
import { human } from 'react-native-typography';

interface RiserButtonProps {
  text: string;
  onPress(): void;
  loading?: boolean;
  loadingText?: string;
  buttonType?: ButtonType;
  style?: ViewStyle;
}

const RiserButton: React.FC<RiserButtonProps> = ({
  text,
  onPress,
  style,
  buttonType = ButtonType.DEFAULT,
  loading = false,
  loadingText = 'Loading...',
}) => {
  let backgroundColor;
  let textColor;

  switch (buttonType) {
    case ButtonType.PRIMARY:
      backgroundColor = colors.primary;
      textColor = colors.white;
      break;
    case ButtonType.DANGER:
      backgroundColor = colors.danger;
      textColor = colors.white;
      break;
    default:
      backgroundColor = colors.headerBlack;
      textColor = colors.white;
  }

  return (
    // @ts-ignore
    <Button
      theme={{ colors: { primary: backgroundColor } }}
      style={[
        {
          backgroundColor: backgroundColor,
          marginTop: 10,
          opacity: loading ? 0.8 : 1,
        },
        style,
      ]}
      disabled={loading}
      onPress={onPress}
    >
      <Text style={[human.body, { color: textColor }]}>
        {loading ? loadingText : text}
      </Text>
    </Button>
  );
};

export default RiserButton;
