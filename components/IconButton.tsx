import React from 'react';
import { TouchableOpacity } from 'react-native';
import colors from '../styles/colors';
import Icon from 'react-native-vector-icons/Feather';

interface IconButtonProps {
  onPress(): void;
  iconName: string;
}

const IconButton: React.FC<IconButtonProps> = ({ onPress, iconName }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: colors.primary,
        borderRadius: 100,
        padding: 10,
      }}>
      <Icon name={iconName} size={20} style={{ color: colors.white }} />
    </TouchableOpacity>
  );
};

export default IconButton;
