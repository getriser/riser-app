import React from 'react';
import { TouchableOpacity, ViewStyle } from 'react-native';
import colors from '../styles/colors';
import Icon from 'react-native-vector-icons/Feather';

interface IconButtonProps {
  onPress(): void;
  iconName: string;
  containerStyle?: ViewStyle;
  iconSize?: number;
}

const IconButton: React.FC<IconButtonProps> = ({
  onPress,
  iconName,
  containerStyle,
  iconSize = 20,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          backgroundColor: colors.primary,
          borderRadius: 100,
          padding: 10,
        },
        containerStyle,
      ]}>
      <Icon name={iconName} size={iconSize} style={{ color: colors.white }} />
    </TouchableOpacity>
  );
};

export default IconButton;
