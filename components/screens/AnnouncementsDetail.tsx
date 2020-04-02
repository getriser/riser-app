import React from 'react';
import { Button, Text, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AnnouncementsParams } from '../../types';
import PageHeader from '../PageHeader';

type AnnouncementsDetailNavigationProps = StackNavigationProp<
  AnnouncementsParams,
  'AnnouncementsDetail'
>;

interface AnnouncementsDetailProps {
  navigation: AnnouncementsDetailNavigationProps;
}

const AnnouncementsDetail: React.FC<AnnouncementsDetailProps> = ({
  navigation,
}) => {
  return (
    <>
      <PageHeader text={'Announcements'} />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Announcements Show</Text>
        <Button title="Go Back" onPress={() => navigation.goBack()} />
      </View>
    </>
  );
};

export default AnnouncementsDetail;
