import * as React from 'react';
import { Text, TextStyle, View, ViewStyle } from 'react-native';

const TEXT_STYLE: TextStyle = {
  color: '#000000',
  fontSize: 40,
  fontWeight: 'bold',
  fontFamily: 'System',
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
