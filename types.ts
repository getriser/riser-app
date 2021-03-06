import { AnnouncementResponse } from './api';

export type FilesParams = {
  FilesIndex: undefined;
  FolderDetail: { id: number };
  CreateFolder: { id: number };
  UpdateFolder: { id: number };
  UpdateFile: { id: number };
};

export type AnnouncementsParams = {
  AnnouncementsIndex: undefined;
  AnnouncementsDetail: { id: number };
  CreateAnnouncement: undefined;
};

export type MembersParams = {
  MembersIndex: undefined;
  AddMember: undefined;
  MembersDetail: { id: number };
};

export interface IRiserApi {
  getAnnouncement(id: number): Promise<Announcement>;

  addReactionToAnnouncement(
    announcement: AnnouncementResponse,
    reaction: Reaction,
  ): Promise<Reaction>;

  removeReactionFromAnnouncement(
    announcement: AnnouncementResponse,
    reaction: Reaction,
  ): Promise<SuccessMessage>;
}

export interface SuccessMessage {
  message: string;
}

export interface AnnouncementLite {
  id: number;
  title: string;
  content: string;
  isRead: boolean;
  numberOfComments: number;
  createdAt: string;
  author: Author;
}

export interface Announcement extends AnnouncementLite {
  reactions: Reaction[];
  comments: Comment[];
}

export interface Reaction {
  emoji: string;
  count: number;
  isChecked: boolean;
}

export interface Comment {
  text: string;
  createdAt: string;
  author: Author;
}

export interface Author {
  name: string;
  avatarUrl: string;
}

export interface IdMapping<T> {
  [key: number]: T;
}

export interface DefaultFormFields {
  apiError: string;
}

export enum ButtonType {
  DEFAULT,
  PRIMARY,
  DANGER,
}

export interface UploadProgressEvent {
  isTrusted: boolean;
  lengthComputable: boolean;
  loaded: number;
  total: number;
}
