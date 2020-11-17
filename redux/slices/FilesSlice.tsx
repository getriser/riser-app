import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IdMapping } from '../../types';
import {
  CreateFolderBody,
  FileFolderType,
  FileResponse,
  FolderControllerApi,
  OrganizationControllerApi,
  OrganizationResponse,
} from '../../api';
import { AppThunk } from '../store';
import { getConfiguration } from '../../utils/ApiUtils';
import Logger from '../../utils/Logger';

interface OrganizationFileResponse {
  organization: OrganizationResponse;
  parentFolderId: number;
}

interface ParentFolderToFiles {
  parentId: number;
  files: FileResponse[];
}

interface FilesSliceState {
  loading: boolean;
  organizationIdToRootFolderId: IdMapping<number>;
  folderToChildren: IdMapping<FileResponse[]>;
  filesById: IdMapping<FileResponse>;
  foldersById: IdMapping<FileResponse>;
}

const initialState: FilesSliceState = {
  loading: false,
  organizationIdToRootFolderId: {},
  folderToChildren: {},
  filesById: {},
  foldersById: {},
};

const FilesSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setRootFolderIdForOrganization(
      state,
      action: PayloadAction<OrganizationFileResponse>,
    ) {
      state.organizationIdToRootFolderId[action.payload.organization.id] =
        action.payload.parentFolderId;
    },
    setChildrenFiles(state, action: PayloadAction<ParentFolderToFiles>) {
      state.folderToChildren[action.payload.parentId] = action.payload.files;

      action.payload.files.forEach((fileOrFolder) => {
        if (fileOrFolder.type === FileFolderType.FILE) {
          state.filesById[fileOrFolder.id] = fileOrFolder;
        } else if (fileOrFolder.type === FileFolderType.FOLDER) {
          state.foldersById[fileOrFolder.id] = fileOrFolder;
        }
      });
    },
    appendToFolder(state, action: PayloadAction<ParentFolderToFiles>) {
      const existingFiles =
        state.folderToChildren[action.payload.parentId] || [];

      state.folderToChildren[action.payload.parentId] = [
        ...action.payload.files,
        ...existingFiles,
      ];

      action.payload.files.forEach((fileOrFolder) => {
        if (fileOrFolder.type === FileFolderType.FILE) {
          state.filesById[fileOrFolder.id] = fileOrFolder;
        } else if (fileOrFolder.type === FileFolderType.FOLDER) {
          state.foldersById[fileOrFolder.id] = fileOrFolder;
        }
      });
    },
  },
});

export const {
  setRootFolderIdForOrganization,
  setChildrenFiles,
  appendToFolder,
  setLoading,
} = FilesSlice.actions;

export const getRootFolderForOrganization = (
  organization: OrganizationResponse,
): AppThunk => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    const api = new OrganizationControllerApi(getConfiguration());
    const response = await api.getFiles(organization.id);

    const { parentFolderId, files } = response.data;

    dispatch(
      setRootFolderIdForOrganization({
        organization,
        parentFolderId,
      }),
    );

    dispatch(
      setChildrenFiles({
        parentId: parentFolderId,
        files,
      }),
    );
  } catch (e) {
    Logger.error('Error thrown while trying to fetch root files.');
  } finally {
    dispatch(setLoading(false));
  }
};

export const getFilesForFolder = (folderId: number): AppThunk => async (
  dispatch,
) => {
  dispatch(setLoading(true));

  try {
    const api = new FolderControllerApi(getConfiguration());
    const response = await api.getFilesFromFolder(folderId);

    dispatch(setChildrenFiles({ parentId: folderId, files: response.data }));
  } catch (e) {
    Logger.error('Error thrown while trying to fetch root files.');
  } finally {
    dispatch(setLoading(false));
  }
};

export const createFolder = (data: CreateFolderBody): AppThunk => async (
  dispatch,
) => {
  dispatch(setLoading(true));

  try {
    const api = new FolderControllerApi(getConfiguration());
    const response = await api.createFolder(data);

    dispatch(
      appendToFolder({ parentId: data.parentId, files: [response.data] }),
    );
  } catch (e) {
    Logger.error('Error thrown while trying to fetch root files.');
  } finally {
    dispatch(setLoading(false));
  }
};

export default FilesSlice.reducer;
