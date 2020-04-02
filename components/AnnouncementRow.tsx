import * as React from 'react';
import {
  Image,
  Text,
  ImageStyle,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { Announcement } from '../types';
import { getDateAgoString } from '../utils/DateUtils';

export interface AnnouncementRowProps {
  announcement: Announcement;
}

const BOX_STYLE: ViewStyle = {
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
  borderTopColor: 'rgba(0,0,0,0.05)',
  borderTopWidth: 1,
  padding: 5,
};

const IMAGE_STYLE: ImageStyle = {
  borderRadius: 100,
};

const TITLE_STYLE: TextStyle = {
  color: '#000000',
  fontSize: 16,
  fontFamily: 'System',
};

const DOT_HOLDER_STYLE: TextStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  width: 30,
};

const DOT_STYLE: TextStyle = {
  color: '#0ce5d9',
  fontSize: 50,
};

const CONTENT_STYLE: TextStyle = {
  color: '#979797',
  fontSize: 14,
  fontFamily: 'System',
  marginTop: 5,
};

const CREATED_AT_STYLE: TextStyle = {
  color: '#000000',
  fontFamily: 'System',
  fontSize: 12,
};

const AnnouncementRow: React.FC<AnnouncementRowProps> = ({ announcement }) => {
  return (
    <View style={BOX_STYLE}>
      <View style={DOT_HOLDER_STYLE}>
        {!announcement.isRead ? <Text style={DOT_STYLE}>•</Text> : null}
      </View>

      <View
        style={{
          marginLeft: 10,
          flex: 7,
          flexDirection: 'column',
          justifyContent: 'flex-start',
        }}>
        <Text style={TITLE_STYLE}>{announcement.title}</Text>
        <Text style={CONTENT_STYLE} numberOfLines={3}>
          {announcement.content}
        </Text>
      </View>

      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}>
        <Text style={CREATED_AT_STYLE}>
          {getDateAgoString(announcement.createdAt)}
        </Text>
        <Image
          style={IMAGE_STYLE}
          source={{ uri: announcement.imageUrl, width: 35, height: 35 }}
        />
      </View>
    </View>
  );
};

export default AnnouncementRow;
