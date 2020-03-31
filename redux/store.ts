import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import rootReducer, { RootState } from './rootReducer';

const store = configureStore({
  reducer: rootReducer,
});

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export type AppDispatch = typeof store.dispatch;

export default store;
