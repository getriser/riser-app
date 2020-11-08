import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IdMapping, Reaction } from '../../types';
import { AppThunk } from '../store';
import RiserApi from '../../utils/MockRiserApi';
import Logger from '../../utils/Logger';
import {
  AnnouncementControllerApi,
  AnnouncementResponse,
  CommentResponse,
  OrganizationControllerApi,
} from '../../api';
import { getConfiguration } from '../../utils/ApiUtils';

interface AnnouncementsState {
  announcementsById: IdMapping<AnnouncementResponse>;
  announcements: AnnouncementResponse[] | null;
  commentsByAnnouncementId: IdMapping<CommentResponse[]>;
  isLoading: boolean;
  isCommentsLoading: boolean;
  fetchAnnouncementsError?: string;
}

const initialState: AnnouncementsState = {
  announcementsById: {},
  commentsByAnnouncementId: {},
  announcements: null,
  isLoading: false,
  isCommentsLoading: false,
};

interface ReactionPayload {
  announcement: AnnouncementResponse;
  reaction: Reaction;
}

interface CommentsPayload {
  announcement: AnnouncementResponse;
  comments: CommentResponse[];
}

const announcementsSlice = createSlice({
  name: 'announcements',
  initialState,
  reducers: {
    startFetchAnnouncements(state, action: PayloadAction) {
      state.fetchAnnouncementsError = undefined;
      state.isLoading = true;
    },

    addReaction(state, action: PayloadAction<ReactionPayload>) {
      const announcement: AnnouncementResponse =
        state.announcementsById[action.payload.announcement.id];

      let reaction: Reaction = announcement.reactions.filter(
        (r) => r.emoji === action.payload.reaction.emoji,
      )[0];

      if (reaction) {
        reaction = {
          ...reaction,
          isChecked: true,
          count: reaction.count + 1,
        };
      } else {
        reaction = {
          ...action.payload.reaction,
          isChecked: true,
          count: 1,
        };
      }

      announcement.reactions = [
        ...announcement.reactions.filter((r) => r.emoji !== reaction.emoji),
        reaction,
      ];

      state.announcementsById[announcement.id] = announcement;
    },

    removeReaction(state, action: PayloadAction<ReactionPayload>) {
      const announcement: AnnouncementResponse =
        state.announcementsById[action.payload.announcement.id];

      let reaction: Reaction = announcement.reactions.filter(
        (r) => r.emoji === action.payload.reaction.emoji,
      )[0];

      reaction = {
        ...reaction,
        isChecked: false,
        count: reaction.count - 1,
      };

      announcement.reactions = [
        ...announcement.reactions.filter((r) => r.emoji !== reaction.emoji),
        reaction,
      ];

      state.announcementsById[announcement.id] = announcement;
    },

    errorFetchAnnouncements(state, action: PayloadAction) {
      state.fetchAnnouncementsError =
        'It seems like something went wrong. Please try again in a few minutes.';
    },

    endFetchAnnouncements(state, action: PayloadAction) {
      state.isLoading = false;
    },

    setAnnouncements(state, action: PayloadAction<AnnouncementResponse[]>) {
      state.announcements = action.payload;
    },

    addToAnnouncementsById(
      state,
      action: PayloadAction<AnnouncementResponse[]>,
    ) {
      const announcements = action.payload;
      announcements.forEach((announcement: AnnouncementResponse) => {
        state.announcementsById[announcement.id] = announcement;
      });
    },

    addAnnouncements(state, action: PayloadAction<AnnouncementResponse[]>) {
      const announcements = action.payload;
      if (state.announcements === null) {
        state.announcements = [];
      }

      announcements.forEach((announcement: AnnouncementResponse) => {
        state.announcements!.push(announcement);
      });
    },

    startFetchComments(state, action: PayloadAction) {
      state.isCommentsLoading = true;
    },

    endFetchComments(state, action: PayloadAction) {
      state.isCommentsLoading = false;
    },

    setCommentsForAnnouncement(state, action: PayloadAction<CommentsPayload>) {
      state.commentsByAnnouncementId[action.payload.announcement.id] =
        action.payload.comments;
    },

    appendCommentsToAnnouncement(
      state,
      action: PayloadAction<CommentsPayload>,
    ) {
      const existingComments =
        state.commentsByAnnouncementId[action.payload.announcement.id] || [];

      state.commentsByAnnouncementId[action.payload.announcement.id] = [
        ...existingComments,
        ...action.payload.comments,
      ];
    },
  },
});

export const {
  startFetchAnnouncements,
  errorFetchAnnouncements,
  endFetchAnnouncements,
  addAnnouncements,
  addReaction,
  removeReaction,
  addToAnnouncementsById,
  setAnnouncements,
  startFetchComments,
  endFetchComments,
  setCommentsForAnnouncement,
  appendCommentsToAnnouncement,
} = announcementsSlice.actions;

export const fetchAnnouncements = (
  organizationId: number,
  offset = 0,
  limit = 20,
): AppThunk => async (dispatch) => {
  dispatch(startFetchAnnouncements());

  try {
    const api = new OrganizationControllerApi(getConfiguration());
    const response = await api.getAnnouncements(organizationId, offset, limit);

    dispatch(setAnnouncements(response.data));
  } catch (e) {
    Logger.error('Error fetching announcements:', e);

    dispatch(errorFetchAnnouncements());
  } finally {
    dispatch(endFetchAnnouncements());
  }
};

export const fetchAnnouncement = (id: number): AppThunk => async (dispatch) => {
  dispatch(startFetchAnnouncements());

  try {
    const api = new AnnouncementControllerApi(getConfiguration());
    const response = await api.getAnnouncement(id);

    dispatch(addToAnnouncementsById([response.data]));
  } catch (e) {
    Logger.error('Error fetching announcement:', e);

    dispatch(errorFetchAnnouncements());
  } finally {
    dispatch(endFetchAnnouncements());
  }
};

export const addReactionToAnnouncement = (
  announcement: AnnouncementResponse,
  reaction: Reaction,
): AppThunk => async (dispatch) => {
  try {
    const api = new RiserApi();

    dispatch(addReaction({ announcement, reaction }));

    api.addReactionToAnnouncement(announcement, reaction);
  } catch (e) {
    Logger.error('Error thrown while trying to add a reaction.');
  }
};

export const removeReactionFromAnnouncement = (
  announcement: AnnouncementResponse,
  reaction: Reaction,
): AppThunk => async (dispatch) => {
  try {
    const api = new RiserApi();

    dispatch(removeReaction({ announcement, reaction }));

    api.removeReactionFromAnnouncement(announcement, reaction);
  } catch (e) {
    Logger.error('Error thrown while trying to add a reaction.');
  }
};

export const getComments = (
  announcement: AnnouncementResponse,
): AppThunk => async (dispatch) => {
  dispatch(startFetchComments());

  try {
    const api = new AnnouncementControllerApi(getConfiguration());
    const response = await api.getComments(announcement.id);

    dispatch(
      setCommentsForAnnouncement({
        announcement: announcement,
        comments: response.data,
      }),
    );
  } catch (e) {
    Logger.error('Error thrown while trying to add a reaction.');
  } finally {
    dispatch(endFetchComments());
  }
};

export const postComment = (
  announcement: AnnouncementResponse,
  comment: string,
): AppThunk => async (dispatch) => {
  try {
    const api = new AnnouncementControllerApi(getConfiguration());
    const response = await api.postComment(announcement.id, {
      content: comment,
    });

    dispatch(
      appendCommentsToAnnouncement({
        announcement: announcement,
        comments: [response.data],
      }),
    );
  } catch (e) {
    Logger.error('Error thrown while trying to add a reaction.');
  }
};

export default announcementsSlice.reducer;
