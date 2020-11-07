import React from 'react';
import { Avatar } from 'react-native-elements';

interface AvatarInitialsProps {
  name: string;
}

const colors = [
  '#00AA55',
  '#009FD4',
  '#B381B3',
  '#939393',
  '#E3BC00',
  '#D47500',
  '#DC2A2A',
];

const AvatarInitials: React.FC<AvatarInitialsProps> = ({ name }) => {
  const initials = name
    .split(' ')
    .map((text) => text[0])
    .filter((text) => text.match(/[A-z]/))
    .join('')
    .toUpperCase()
    .substring(0, 2);

  const intValueOfInitials = parseInt(
    initials
      .split('')
      .map((char) => char.charCodeAt(0))
      .join(''),
    10,
  );
  const backgroundColor = colors[intValueOfInitials % colors.length];

  return (
    <Avatar
      rounded
      title={initials}
      overlayContainerStyle={{ backgroundColor }}
    />
  );
};

export default AvatarInitials;
