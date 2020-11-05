import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IdMapping } from '../../types';
import { AppThunk } from '../store';
import Logger from '../../utils/Logger';
import { Member, OrganizationControllerApi } from '../../api';
import { getConfiguration } from '../../utils/ApiUtils';

interface MembersSliceState {
  members: Member[] | null;
  membersById: IdMapping<Member>;
  loading: boolean;
  error: string;
}

const initialState: MembersSliceState = {
  members: null,
  membersById: {},
  loading: false,
  error: '',
};

const MembersSlice = createSlice({
  name: 'members',
  initialState,
  reducers: {
    startFetch(state, action: PayloadAction) {
      state.loading = true;
      state.error = '';
    },

    errorFetch(state, action: PayloadAction) {
      state.error =
        'Hmm, something went wrong. Please try again in a few moments.';
    },

    endFetch(state, action: PayloadAction) {
      state.loading = false;
    },

    addMembers(state, action: PayloadAction<Member[]>) {
      state.members = action.payload;
      const membersById: IdMapping<Member> = {};

      action.payload.forEach((member) => {
        membersById[member.id] = member;
      });

      state.membersById = membersById;
    },
  },
});

export const {
  startFetch,
  endFetch,
  errorFetch,
  addMembers,
} = MembersSlice.actions;

export const fetchMembers = (organizationId: number): AppThunk => async (
  dispatch,
) => {
  dispatch(startFetch());

  try {
    const api = new OrganizationControllerApi(getConfiguration());
    const response = await api.getMembers(organizationId);

    dispatch(addMembers(response.data));
  } catch (e) {
    dispatch(errorFetch());
    Logger.error('Error thrown while trying fetch members.');
  } finally {
    dispatch(endFetch());
  }
};

export default MembersSlice.reducer;
