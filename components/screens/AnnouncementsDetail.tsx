import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, SafeAreaView, Text, View } from 'react-native';
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
import Loading from '../Loading';
import BackButton from '../BackButton';
import EmojiPill from '../EmojiPill';
import AnnouncementDetailHeader from '../AnnouncementDetailHeader';
// @ts-ignore
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import Logger from '../../utils/Logger';
import ModalHeader from '../ModalHeader';
import CommentsContainer from '../Announcements/CommentsContainer';

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
  const [stickyHeaderHeight, setStickyHeaderHeight] = useState<number>(0);
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
      <ParallaxScrollView
        scrollEvent={(event: any) => {
          if (
            event.nativeEvent.contentOffset.y <= 0 &&
            stickyHeaderHeight > 0
          ) {
            setStickyHeaderHeight(0);
          } else if (
            event.nativeEvent.contentOffset.y > 0 &&
            stickyHeaderHeight === 0
          ) {
            setStickyHeaderHeight(100);
          }
        }}
        backgroundColor={colors.primary}
        parallaxHeaderHeight={320}
        stickyHeaderHeight={stickyHeaderHeight}
        renderStickyHeader={() => (
          <SafeAreaView
            style={{
              backgroundColor: colors.primary,
            }}>
            <ModalHeader title={announcement.title} backIcon={'chevron-left'} />
          </SafeAreaView>
        )}
        renderForeground={() => (
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
        )}>
        <KeyboardAvoidingView
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-end',
          }}
          behavior={'padding'}>
          <View
            style={{
              position: 'relative',
              top: -70,
              borderTopRightRadius: 40,
              borderTopLeftRadius: 40,
              backgroundColor: '#fff',
              flex: 1,
            }}>
            <View
              style={{
                paddingHorizontal: 40,
              }}>
              <View
                style={{
                  marginTop: 40,
                  paddingBottom: 20,
                  borderBottomWidth: 1,
                  borderBottomColor: '#eaeaea',
                }}>
                <Text>{announcement.content}</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                {(announcement.reactions || [])
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
              <CommentsContainer announcement={announcement} />
            </View>
          </View>
        </KeyboardAvoidingView>
      </ParallaxScrollView>
    </View>
  );
};

export default AnnouncementsDetail;
