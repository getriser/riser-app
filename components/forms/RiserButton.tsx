import React from 'react';
import { Text } from 'react-native';
import { Button } from 'react-native-paper';
import colors from '../../styles/colors';

interface RiserButtonProps {
  text: string;
  onPress(): void;
}

const RiserButton: React.FC<RiserButtonProps> = ({ text, onPress }) => {
  return (
    // @ts-ignore
    <Button
      theme={{ colors: { primary: colors.headerBlack } }}
      style={{ backgroundColor: colors.headerBlack, marginTop: 10 }}
      onPress={onPress}>
      <Text style={{ color: colors.white }}>{text}</Text>
    </Button>
  );
};

export default RiserButton;
