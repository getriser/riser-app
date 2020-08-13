import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Appbar } from 'react-native-paper';

interface BackButtonProps {}

const BackButton: React.FC<BackButtonProps> = ({}) => {
  const navigation = useNavigation();

  return <Appbar.BackAction onPress={() => navigation.goBack()} />;
};

export default BackButton;
