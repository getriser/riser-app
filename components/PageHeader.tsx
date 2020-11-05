import * as React from 'react';
import { Text, TextStyle, View, ViewStyle } from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { ComponentType, ReactElement } from 'react';

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
  textStyle?: TextStyle;
  RightComponent?: ComponentType<any> | ReactElement | null;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  text,
  style,
  textStyle,
  RightComponent,
}) => {
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
      <Text style={[TEXT_STYLE, textStyle]}>{text}</Text>
      <View>{RightComponent}</View>
    </View>
  );
};

export default PageHeader;
