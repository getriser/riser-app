import React from 'react';
import {
  SafeAreaView,
  View,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MembersParams } from '../../types';
import ModalHeader from '../ModalHeader';

type AddMemberNavigationProps = StackNavigationProp<MembersParams, 'AddMember'>;

type AddMemberRouteProp = RouteProp<MembersParams, 'AddMember'>;

interface AddMemberProps {
  navigation: AddMemberNavigationProps;
  route: AddMemberRouteProp;
}

const AddMember: React.FC<AddMemberProps> = ({ navigation, route }) => {
  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ModalHeader title="Add Member" />
      </SafeAreaView>
    </View>
  );
};

export default AddMember;
