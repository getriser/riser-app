import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../store';
import Logger from '../../utils/Logger';
import { OrganizationControllerApi } from '../../api';
import { OrganizationResponse } from '../../api/api';

interface OrganizationsSliceState {
  loading: boolean;
  currentOrganization?: OrganizationResponse;
  organizations: OrganizationResponse[];
}

const initialState: OrganizationsSliceState = {
  loading: false,
  currentOrganization: undefined,
  organizations: [],
};

const OrganizationsSlice = createSlice({
  name: 'organization',
  initialState,
  reducers: {
    setCurrentOrganization(state, action: PayloadAction<OrganizationResponse>) {
      state.currentOrganization = action.payload;
    },
    setOrganizations(state, action: PayloadAction<OrganizationResponse[]>) {
      state.organizations = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const getMyOrganizations = (token: string): AppThunk => async (
  dispatch,
) => {
  dispatch(setLoading(true));
  try {
    const api = new OrganizationControllerApi({
      apiKey: token,
      basePath: 'http://localhost:3000',
    });

    const response = await api.getOrganizations();
    dispatch(setOrganizations(response.data));
  } catch (e) {
    Logger.error('Error thrown while trying to fetch my organizations.');
  } finally {
    dispatch(setLoading(false));
  }
};

export const {
  setLoading,
  setCurrentOrganization,
  setOrganizations,
} = OrganizationsSlice.actions;

export default OrganizationsSlice.reducer;
