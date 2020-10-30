import React from 'react';
import { Member } from '../types';
import styled from 'styled-components/native';

interface MemberRowProps {
  member: Member;
}

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  border-bottom-color: rgba(0, 0, 0, 0.05);
  border-bottom-width: 1px;
  padding: 10px;
`;

const RoundedImage = styled.Image`
  border-radius: 100;
  width: 50px;
  height: 50px;
`;

const NameContainer = styled.View`
  flex: 2;
  flex-direction: column;
  justify-content: flex-start;
  margin-left: 10px;
`;

const Name = styled.Text``;

const Username = styled.Text`
  color: #979797;
`;

const MemberRow: React.FC<MemberRowProps> = ({ member }) => {
  return (
    <Container>
      <RoundedImage source={{ uri: member.avatarUrl }} />
      <NameContainer>
        <Name>{member.name}</Name>
        <Username>@{member.username}</Username>
      </NameContainer>
    </Container>
  );
};

export default MemberRow;
