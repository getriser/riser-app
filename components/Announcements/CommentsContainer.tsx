import React, { useEffect } from 'react';
import { AnnouncementResponse } from '../../api';
import { Text, View } from 'react-native';
import CommentRow from '../CommentRow';
import { useDispatch, useSelector } from 'react-redux';
import { getComments } from '../../redux/slices/AnnouncementsSlice';
import { RootState } from '../../redux/rootReducer';
import Loading from '../Loading';
import colors from '../../styles/colors';
import AddComment from './AddComment';

interface CommentsContainerProps {
  announcement: AnnouncementResponse;
}

const CommentsContainer: React.FC<CommentsContainerProps> = ({
  announcement,
}) => {
  const dispatch = useDispatch();

  const { commentsByAnnouncementId, isCommentsLoading } = useSelector(
    (state: RootState) => state.announcements,
  );

  const comments = commentsByAnnouncementId[announcement.id] || [];

  useEffect(() => {
    dispatch(getComments(announcement));
  }, [announcement]);

  if (isCommentsLoading) {
    return <Loading />;
  }

  return (
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

      {comments.length === 0 && (
        <Text
          style={{
            marginTop: 10,
            textAlign: 'center',
            color: colors.subtitleGray,
          }}>
          There are no comments.
        </Text>
      )}

      {comments.map((comment) => (
        <CommentRow key={comment.id} comment={comment} />
      ))}

      <AddComment announcement={announcement} />
    </View>
  );
};

export default CommentsContainer;
