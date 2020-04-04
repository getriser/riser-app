import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  Button,
  SafeAreaView,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AnnouncementsParams } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/rootReducer';
import { fetchAnnouncement } from '../../redux/slices/AnnouncementsSlice';
import Logger from '../../utils/Logger';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

type AnnouncementsDetailNavigationProps = StackNavigationProp<
  AnnouncementsParams,
  'AnnouncementsDetail'
>;

type AnnouncementsDetailRouteProp = RouteProp<
  AnnouncementsParams,
  'AnnouncementsDetail'
>;

interface AnnouncementsDetailProps {
  navigation: AnnouncementsDetailNavigationProps;
  route: AnnouncementsDetailRouteProp;
}

const AnnouncementsDetail: React.FC<AnnouncementsDetailProps> = ({
  navigation,
  route,
}) => {
  const dispatch = useDispatch();
  const announcementId = route.params.id;

  const { announcementsById, isLoading } = useSelector(
    (state: RootState) => state.announcements,
  );

  const announcement = announcementsById[announcementId];

  useEffect(() => {
    if (!announcement) {
      dispatch(fetchAnnouncement(route.params.id));
    }
  }, [announcement, dispatch]);

  return (
    <View>
      <View
        style={{
          backgroundColor: colors.primary,
        }}>
        <SafeAreaView>
          {isLoading ? (
            <ActivityIndicator />
          ) : !!announcement ? (
            <View>
              <View
                style={{
                  backgroundColor: colors.primary,
                  paddingBottom: 100,
                  marginTop: 50,
                }}>
                <View
                  style={{
                    marginHorizontal: 50,
                  }}>
                  <Text
                    style={{
                      color: colors.white,
                      fontFamily: fonts.default,
                      fontWeight: '600',
                      fontSize: 33,
                    }}>
                    {announcement.title}
                  </Text>
                </View>
              </View>
            </View>
          ) : null}
        </SafeAreaView>
      </View>
    </View>
  );
};

export default AnnouncementsDetail;
