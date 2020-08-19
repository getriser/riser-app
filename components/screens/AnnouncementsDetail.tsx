import React, { useEffect } from 'react';
import { Image, SafeAreaView, Text, View } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AnnouncementsParams, Reaction } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/rootReducer';
import { fetchAnnouncement } from '../../redux/slices/AnnouncementsSlice';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import Loading from '../Loading';
import BackButton from '../BackButton';
import moment from 'moment';
import EmojiPill from '../EmojiPill';

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

  if (isLoading) {
    return <Loading />;
  }

  if (!announcement) {
    return null;
  }

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          backgroundColor: colors.primary,
        }}>
        <SafeAreaView>
          <BackButton />

          <View>
            <View
              style={{
                backgroundColor: colors.primary,
                paddingBottom: 70,
              }}>
              <View
                style={{
                  marginHorizontal: 40,
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
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                  <Image
                    style={{ borderRadius: 100, width: 35, marginRight: 10 }}
                    source={{ uri: announcement.author.avatarUrl }}
                  />
                  <View>
                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                      {announcement.author.name}
                    </Text>
                    <Text style={{ color: '#fff' }}>
                      {moment(announcement.createdAt).format(
                        'MMM Do, YYYY • h:mm A',
                      )}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </View>
      <View
        style={{
          borderTopRightRadius: 40,
          borderTopLeftRadius: 40,
          backgroundColor: '#fff',
          position: 'relative',
          top: -30,
          zIndex: 100,
          elevation: 100,
          paddingHorizontal: 40,
          flex: 1,
        }}>
        <View
          style={{
            marginTop: 40,
            marginBottom: 20,
            borderBottomWidth: 1,
            borderBottomColor: '#eaeaea',
          }}>
          <Text>{announcement.content}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          {announcement.reactions.map((reaction: Reaction) => (
            <EmojiPill
              reaction={reaction}
              onPress={() => console.log('press!')}
              onLongPress={() => console.log('long press!')}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

export default AnnouncementsDetail;
