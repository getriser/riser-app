import React from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import colors from '../styles/colors';

interface ModalHeaderProps {
  title: string;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({ title }) => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: colors.primary,
        padding: 15,
        alignItems: 'center',
      }}>
      <View style={{}}>
        <Icon
          name="x"
          size={25}
          style={{ color: colors.white }}
          onPress={() => navigation.goBack()}
        />
      </View>
      <View>
        <Text style={{ fontSize: 18, color: colors.white }}>{title}</Text>
      </View>
      <View></View>
    </View>
  );
};

export default ModalHeader;
