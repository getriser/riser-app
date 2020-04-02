import { combineReducers } from '@reduxjs/toolkit';
import AnnouncementsReducer from './slices/AnnouncementsSlice';

const rootReducer = combineReducers({
  announcements: AnnouncementsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
