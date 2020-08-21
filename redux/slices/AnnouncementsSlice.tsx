import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  Announcement,
  AnnouncementLite,
  IdMapping,
  Reaction,
} from '../../types';
import { AppThunk } from '../store';
import RiserApi from '../../utils/MockRiserApi';
import Logger from '../../utils/Logger';

interface AnnouncementsState {
  announcementsById: IdMapping<Announcement>;
  announcements: AnnouncementLite[] | null;
  isLoading: boolean;
  fetchAnnouncementsError?: string;
}

const initialState: AnnouncementsState = {
  announcementsById: {},
  announcements: null,
  isLoading: false,
};

interface ReactionPayload {
  announcement: Announcement;
  reaction: Reaction;
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
      const announcement: Announcement =
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
      const announcement: Announcement =
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

    setAnnouncements(state, action: PayloadAction<AnnouncementLite[]>) {
      const announcements = action.payload;
      state.announcements = announcements;
    },

    addToAnnouncementsById(state, action: PayloadAction<Announcement[]>) {
      const announcements = action.payload;
      announcements.forEach((announcement: Announcement) => {
        state.announcementsById[announcement.id] = announcement;
      });
    },

    addAnnouncements(state, action: PayloadAction<AnnouncementLite[]>) {
      const announcements = action.payload;
      if (state.announcements === null) {
        state.announcements = [];
      }

      announcements.forEach((announcement: AnnouncementLite) => {
        state.announcements!.push(announcement);
      });
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
} = announcementsSlice.actions;

export const fetchAnnouncements = (): AppThunk => async (dispatch) => {
  dispatch(startFetchAnnouncements());

  try {
    const api = new RiserApi();

    const announcements = await api.getAnnouncements();

    dispatch(setAnnouncements(announcements));
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
    const api = new RiserApi();

    const announcement = await api.getAnnouncement(id);

    dispatch(addToAnnouncementsById([announcement]));
  } catch (e) {
    Logger.error('Error fetching announcement:', e);

    dispatch(errorFetchAnnouncements());
  } finally {
    dispatch(endFetchAnnouncements());
  }
};

export const addReactionToAnnouncement = (
  announcement: Announcement,
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
  announcement: Announcement,
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

export default announcementsSlice.reducer;
