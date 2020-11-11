import { combineReducers } from '@reduxjs/toolkit';
import AnnouncementsReducer from './slices/AnnouncementsSlice';
import MembersReducer from './slices/MembersSlice';
import UserReducer from './slices/UserSlice';
import OrganizationReducer from './slices/OrganizationsSlice';
import FileReducer from './slices/FilesSlice';

const rootReducer = combineReducers({
  user: UserReducer,
  announcements: AnnouncementsReducer,
  members: MembersReducer,
  organizations: OrganizationReducer,
  files: FileReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
