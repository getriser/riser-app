import React from 'react';
import { human } from 'react-native-typography';
import { Text, View } from 'react-native';
import colors from '../styles/colors';

interface AvatarInitialsProps {
  name: string;
}

const AvatarInitials: React.FC<AvatarInitialsProps> = ({ name }) => {
  const initials = name
    .split(' ')
    .map((text) => text[0])
    .filter((text) => text.match(/[A-z]/))
    .join('')
    .toUpperCase()
    .substring(0, 2);

  return (
    <View
      style={{
        backgroundColor: colors.primary,
        padding: 10,
        borderRadius: 200,
      }}>
      <Text style={[human.calloutWhite, { minWidth: 20, textAlign: 'center' }]}>
        {initials}
      </Text>
    </View>
  );
};

export default AvatarInitials;
