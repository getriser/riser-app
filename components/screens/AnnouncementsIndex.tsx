import React, { useEffect } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { AnnouncementsParams } from '../../types';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import PageHeader from '../PageHeader';
import { RootState } from '../../redux/rootReducer';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAnnouncements } from '../../redux/slices/AnnouncementsSlice';
import AnnouncementRow from '../AnnouncementRow';

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
  const dispatch = useDispatch();

  const { announcements, isLoading, fetchAnnouncementsError } = useSelector(
    (state: RootState) => state.announcements,
  );

  useEffect(() => {
    if (!announcements) {
      dispatch(fetchAnnouncements());
    }
  }, [dispatch, announcements]);

  return (
    <SafeAreaView>
      <PageHeader text={'Announcements'} />
      <View>
        {isLoading && !announcements ? (
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator />
          </View>
        ) : (
          <FlatList
            data={announcements}
            refreshing={isLoading}
            onRefresh={() => dispatch(fetchAnnouncements())}
            keyExtractor={(item, index) => item.id.toString()}
            ListEmptyComponent={() => <Text>There are no announcements.</Text>}
            renderItem={({ item }) => <AnnouncementRow announcement={item} />}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default AnnouncementsIndex;
