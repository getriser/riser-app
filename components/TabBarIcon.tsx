import React from 'react';
import colors from '../styles/colors';
import Icon from 'react-native-vector-icons/Feather';

interface TabBarIconProps {
  icon: string;
  focused: boolean;
}

const TabBarIcon: React.FC<TabBarIconProps> = ({ icon, focused }) => {
  return (
    <Icon
      name={icon}
      size={20}
      style={{
        color: focused ? colors.white : colors.subtitleGray,
      }}
    />
  );
};

export default TabBarIcon;
