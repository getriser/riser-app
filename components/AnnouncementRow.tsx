import * as React from 'react';
import {
  Image,
  Text,
  ImageStyle,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { getDateAgoString } from '../utils/DateUtils';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { AnnouncementResponse } from '../api';
import AvatarInitials from './AvatarInitials';

export interface AnnouncementRowProps {
  announcement: AnnouncementResponse;
}

const BOX_STYLE: ViewStyle = {
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
  borderTopColor: 'rgba(0,0,0,0.05)',
  borderTopWidth: 1,
  paddingHorizontal: 5,
  paddingVertical: 10,
};

const IMAGE_STYLE: ImageStyle = {
  borderRadius: 100,
  alignSelf: 'flex-end',
  marginBottom: 10,
};

const TITLE_STYLE: TextStyle = {
  color: colors.titleBlack,
  fontSize: 16,
  fontFamily: fonts.default,
  marginRight: 5,
};

const DOT_HOLDER_STYLE: TextStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  width: 30,
};

const DOT_STYLE: TextStyle = {
  color: colors.primary,
  fontSize: 50,
};

const CONTENT_STYLE: TextStyle = {
  color: colors.subtitleGray,
  fontSize: 14,
  fontFamily: fonts.default,
  marginTop: 5,
  marginRight: 10,
};

const CREATED_AT_STYLE: TextStyle = {
  flex: 1,
  color: colors.subtitleGray,
  fontFamily: fonts.default,
  fontSize: 12,
  marginTop: 2,
  textAlign: 'center'
};

const CREATED_AT_IMAGE_HOLDER_STYLE: ViewStyle = {
  flexDirection: 'column',
  flex: 1,
  alignSelf: 'flex-start',
  justifyContent: 'space-between',
};

const TITLE_CONTENT_HOLDER: ViewStyle = {
  marginLeft: 10,
  flex: 7,
  flexDirection: 'column',
  justifyContent: 'flex-start',
};

const AnnouncementRow: React.FC<AnnouncementRowProps> = ({ announcement }) => {
  return (
    <View style={BOX_STYLE}>
      <View style={DOT_HOLDER_STYLE}>
        {!announcement.isRead ? <Text style={DOT_STYLE}>•</Text> : null}
      </View>

      <View style={TITLE_CONTENT_HOLDER}>
        <Text style={TITLE_STYLE}>{announcement.title}</Text>
        <Text style={CONTENT_STYLE} numberOfLines={3}>
          {announcement.content}
        </Text>
      </View>

      <View style={CREATED_AT_IMAGE_HOLDER_STYLE}>
        <Text style={CREATED_AT_STYLE}>
          {getDateAgoString(announcement.createdAt)}
        </Text>
        <AvatarInitials name={announcement.author.name} />
        {/*<Image*/}
        {/*  style={IMAGE_STYLE}*/}
        {/*  source={{ uri: announcement.author.avatarUrl, width: 35, height: 35 }}*/}
        {/*/>*/}
      </View>
    </View>
  );
};

export default AnnouncementRow;
