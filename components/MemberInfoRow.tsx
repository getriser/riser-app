import React from 'react';
import { Text, View } from 'react-native';
import colors from '../styles/colors';

interface MemberInfoRowProps {
  name: string;
  value: string;
}

const MemberInfoRow: React.FC<MemberInfoRowProps> = ({ name, value }) => {
  return (
    <View
      style={{
        marginVertical: 10,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: colors.veryLightGray,
      }}>
      <View>
        <Text style={{ fontWeight: 'bold' }}>{name}:</Text>
      </View>
      <View>
        <Text>{value}</Text>
      </View>
    </View>
  );
};

export default MemberInfoRow;
