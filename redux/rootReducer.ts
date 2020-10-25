import { combineReducers } from '@reduxjs/toolkit';
import AnnouncementsReducer from './slices/AnnouncementsSlice';
import MembersReducer from './slices/MembersSlice';
import UserReducer from './slices/UserSlice';

const rootReducer = combineReducers({
  user: UserReducer,
  announcements: AnnouncementsReducer,
  members: MembersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
