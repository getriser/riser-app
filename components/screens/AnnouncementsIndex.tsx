import React, { useEffect } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { AnnouncementsParams } from '../../types';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
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
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('AnnouncementsDetail', { id: item.id })
                }>
                <AnnouncementRow announcement={item} />
              </TouchableOpacity>
            )}
            ListEmptyComponent={() => (
              <>
                <Text style={{ textAlign: 'center', marginTop: 20 }}>
                  There are no announcements.
                </Text>
                <Text style={{ textAlign: 'center', marginTop: 10 }}>
                  Click on the top right icon to send one to your group!
                </Text>
              </>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default AnnouncementsIndex;
