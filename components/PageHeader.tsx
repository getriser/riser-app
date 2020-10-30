import * as React from 'react';
import {
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import Icon from 'react-native-vector-icons/Feather';

const TEXT_STYLE: TextStyle = {
  color: colors.titleBlack,
  fontSize: 40,
  fontWeight: 'bold',
  fontFamily: fonts.default,
  paddingLeft: 20,
  paddingTop: 10,
  marginBottom: 10,
};

interface PageHeaderProps {
  text: string;
  style?: ViewStyle;
}

const PageHeader: React.FC<PageHeaderProps> = ({ text, style }) => {
  return (
    <View
      style={[
        style,
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingRight: 15,
        },
      ]}>
      <Text style={TEXT_STYLE}>{text}</Text>
      {/*<View>*/}
      {/*  /!*TODO: Migrate this out of the this component into a prop.*!/*/}
      {/*  <TouchableOpacity*/}
      {/*    style={{*/}
      {/*      backgroundColor: colors.primary,*/}
      {/*      borderRadius: 100,*/}
      {/*      padding: 10,*/}
      {/*    }}>*/}
      {/*    <Icon name="edit" size={20} style={{ color: colors.white }} />*/}
      {/*  </TouchableOpacity>*/}
      {/*</View>*/}
    </View>
  );
};

export default PageHeader;
