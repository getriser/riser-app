import React from 'react';
import { Announcement } from '../types';
import { Image, Text, View } from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import moment from 'moment';

interface AnnouncementDetailHeaderProps {
  announcement: Announcement;
}

const AnnouncementDetailHeader: React.FC<AnnouncementDetailHeaderProps> = ({
  announcement,
}) => {
  return (
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
            {moment(announcement.createdAt).format('MMM Do, YYYY • h:mm A')}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default AnnouncementDetailHeader;
