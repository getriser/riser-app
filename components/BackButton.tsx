import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Entypo';

interface BackButtonProps {}

const BackButton: React.FC<BackButtonProps> = ({}) => {
  const navigation = useNavigation();

  return (
    <Icon
      size={25}
      name={'chevron-thin-left'}
      style={{ color: 'white', marginLeft: 10 }}
      onPress={() => navigation.goBack()}
    />
  );
};

export default BackButton;
