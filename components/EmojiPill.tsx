import React from 'react';
import { Reaction } from '../types';
import styled from 'styled-components/native';
import colors from '../styles/colors';

interface EmojiPillProps {
  reaction: Reaction;
  onPress?(): void;
  onLongPress?(): void;
}

interface ActiveProps {
  active: boolean;
}

const Container = styled.TouchableOpacity<ActiveProps>`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  border-radius: 50px;
  border-color: #cbcbcb;
  border-width: 1px;
  padding-horizontal: 12px;
  padding-vertical: 7px;
  margin-right: 10px;
  background-color: ${(props) =>
    props.active ? colors.lighterPrimary : 'white'};
  border: ${colors.lighterPrimary} 1px solid;
`;

const EmojiText = styled.Text`
  margin-right: 10px;
`;

const CountText = styled.Text<ActiveProps>`
  color: #000;
`;

const EmojiPill: React.FC<EmojiPillProps> = ({
  reaction,
  onPress,
  onLongPress,
}) => {
  return (
    <Container
      onPress={onPress}
      onLongPress={onLongPress}
      active={reaction.isChecked}>
      <EmojiText>{reaction.emoji}</EmojiText>
      <CountText active={reaction.isChecked}>{reaction.count}</CountText>
    </Container>
  );
};

export default EmojiPill;
