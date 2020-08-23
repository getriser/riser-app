import React, { useEffect } from 'react';
import { Image, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AnnouncementsParams, Reaction } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/rootReducer';
import {
  fetchAnnouncement,
  removeReactionFromAnnouncement,
  addReactionToAnnouncement,
} from '../../redux/slices/AnnouncementsSlice';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import Loading from '../Loading';
import BackButton from '../BackButton';
import EmojiPill from '../EmojiPill';
import AnnouncementDetailHeader from '../AnnouncementDetailHeader';
import CommentRow from '../CommentRow';
import Logger from '../../utils/Logger';

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

  const onEmojiClick = (reaction: Reaction) => {
    if (reaction.isChecked) {
      dispatch(removeReactionFromAnnouncement(announcement, reaction));
    } else {
      dispatch(addReactionToAnnouncement(announcement, reaction));
    }
  };

  const onEmojiLongPress = (reaction: Reaction) => {
    Logger.debug('onEmojiLongPress...');
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          backgroundColor: colors.primary,
        }}>
        <SafeAreaView
          style={{
            position: 'relative',
            top: 30,
          }}>
          <BackButton />

          <View>
            <View
              style={{
                backgroundColor: colors.primary,
                paddingBottom: 70,
              }}>
              <AnnouncementDetailHeader announcement={announcement} />
            </View>
          </View>
        </SafeAreaView>
      </View>
      <ScrollView
        style={{
          borderTopRightRadius: 40,
          borderTopLeftRadius: 40,
          backgroundColor: '#fff',
          zIndex: 100,
          elevation: 100,
          flex: 1,
        }}>
        <View
          style={{
            paddingHorizontal: 40,
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
            {announcement.reactions
              .slice()
              .sort((a, b) => a.count - b.count)
              .map((reaction: Reaction) => (
                <EmojiPill
                  reaction={reaction}
                  onPress={() => onEmojiClick(reaction)}
                  onLongPress={() => onEmojiLongPress(reaction)}
                />
              ))}
          </View>
        </View>

        <View>
          <View
            style={{
              marginTop: 20,
              marginHorizontal: 10,
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 16,
                marginBottom: 10,
              }}>
              Comments
            </Text>
          </View>

          {announcement.comments.map((comment) => (
            <CommentRow comment={comment} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default AnnouncementsDetail;
