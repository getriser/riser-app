import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { AnnouncementsParams } from '../../types';
import { Button, SafeAreaView, Text, View } from 'react-native';
import PageHeader from '../PageHeader';

type AnnouncementsIndexNavigationProps = StackNavigationProp<
  AnnouncementsParams,
  'AnnouncementsIndex'
>;

interface AnnouncementsIndexProps {
  navigation: AnnouncementsIndexNavigationProps;
}

const AnnouncementsIndex: React.FC<AnnouncementsIndexProps> = ({
  navigation,
}) => {
  return (
    <SafeAreaView>
      <PageHeader text={'Announcements'} />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Announcements screen</Text>
        <Button
          title="Go to Details"
          onPress={() => navigation.navigate('AnnouncementsShow', { id: 1 })}
        />
      </View>
    </SafeAreaView>
  );
};

export default AnnouncementsIndex;
