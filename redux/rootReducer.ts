import { combineReducers } from '@reduxjs/toolkit';
import AnnouncementsReducer from './slices/AnnouncementsSlice';
import MembersReducer from './slices/MembersSlice';
import UserReducer from './slices/UserSlice';
import OrganizationReducer from './slices/OrganizationsSlice';

const rootReducer = combineReducers({
  user: UserReducer,
  announcements: AnnouncementsReducer,
  members: MembersReducer,
  organizations: OrganizationReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
