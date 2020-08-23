import { combineReducers } from '@reduxjs/toolkit';
import AnnouncementsReducer from './slices/AnnouncementsSlice';
import MembersReducer from './slices/MembersSlice';

const rootReducer = combineReducers({
  announcements: AnnouncementsReducer,
  members: MembersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
