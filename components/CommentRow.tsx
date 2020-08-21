import React from 'react';
import { Comment } from '../types';
import { Image, View, Text } from 'react-native';
import moment from 'moment';

interface CommentProps {
  comment: Comment;
}

const CommentRow: React.FC<CommentProps> = ({ comment }) => {
  return (
    <View
      style={{
        backgroundColor: '#F8F8F8',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomColor: '#d0d0d0',
        borderBottomWidth: 0.3,
      }}>
      <Image
        source={{ uri: comment.author.avatarUrl }}
        style={{ width: 45, height: 45, borderRadius: 100 }}
      />
      <View style={{ flex: 1, marginHorizontal: 15 }}>
        <Text style={{ fontWeight: '600', marginBottom: 5 }}>
          {comment.author.name}
        </Text>
        <Text>{comment.text}</Text>
      </View>
      <View style={{ alignSelf: 'flex-start' }}>
        <Text style={{ color: '#7A7A7A' }}>
          {moment(comment.createdAt).format('MMM D')}
        </Text>
      </View>
    </View>
  );
};

export default CommentRow;
