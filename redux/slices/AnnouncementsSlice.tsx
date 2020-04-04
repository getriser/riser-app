import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Announcement, AnnouncementLite, IdMapping } from '../../types';
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

const announcementsSlice = createSlice({
  name: 'announcements',
  initialState,
  reducers: {
    startFetchAnnouncements(state, action: PayloadAction) {
      state.fetchAnnouncementsError = undefined;
      state.isLoading = true;
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

export default announcementsSlice.reducer;
