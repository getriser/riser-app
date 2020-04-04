import React from 'react';
import { Author } from '../types';
import moment from 'moment';
import { Image, View } from 'react-native';

interface AnnouncementAuthorSubtitleProps {
  author: Author;
  createdAt: string;
}

const AnnouncementAuthorSubtitle: React.FC<AnnouncementAuthorSubtitleProps> = ({
  author,
  createdAt,
}) => {
  const date = moment(createdAt);
  const formattedDate = date.format('MMM Do, YYYY');
  const formattedTime = date.format('h:mma');

  return (
    <View>
      <View></View>
    </View>
  );
};

export default AnnouncementAuthorSubtitle;
