import React from 'react';
import { View, Text } from 'react-native';
import { OrganizationResponse } from '../api';
import AvatarInitials from './AvatarInitials';
import { human } from 'react-native-typography';

interface OrganizationRowProps {
  organization: OrganizationResponse;
}

const OrganizationRow: React.FC<OrganizationRowProps> = ({ organization }) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        padding: 15,
        backgroundColor: '#fff',
        borderBottomColor: '#e7e7e7',
        borderBottomWidth: 1,
      }}>
      <AvatarInitials name={organization.name} />
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text style={[human.body, { marginLeft: 10 }]}>
          {organization.name}
        </Text>
      </View>
    </View>
  );
};

export default OrganizationRow;
