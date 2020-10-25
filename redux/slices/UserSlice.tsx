import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserSliceState {
  token: string | undefined;
}

const initialState: UserSliceState = {
  token: undefined,
};

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
  },
});

export const { setToken } = UserSlice.actions;

export default UserSlice.reducer;
