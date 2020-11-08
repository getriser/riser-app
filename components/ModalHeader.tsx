import React, { ComponentType, ReactElement } from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import colors from '../styles/colors';

interface ModalHeaderProps {
  title: string;
  backIcon?: string;
  RightComponent?: ComponentType<any> | ReactElement | null;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({
  title,
  backIcon = 'x',
  RightComponent,
}) => {
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
      <View>
        <Icon
          name={backIcon}
          size={25}
          style={{ color: colors.white }}
          onPress={() => navigation.goBack()}
        />
      </View>
      <View>
        <Text style={{ fontSize: 18, color: colors.white }}>{title}</Text>
      </View>
      <View>{RightComponent}</View>
    </View>
  );
};

export default ModalHeader;
