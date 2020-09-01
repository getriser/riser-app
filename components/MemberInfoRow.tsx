import React from 'react';
import { Text, View } from 'react-native';

interface MemberInfoRowProps {
  name: string;
  value: string;
}

const MemberInfoRow: React.FC<MemberInfoRowProps> = ({ name, value }) => {
  return (
    <View
      style={{
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
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
