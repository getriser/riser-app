import * as React from 'react';
import { Text, TextStyle, View, ViewStyle } from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

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
    <View style={style}>
      <Text style={TEXT_STYLE}>{text}</Text>
    </View>
  );
};

export default PageHeader;
