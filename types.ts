export type AnnouncementsParams = {
  AnnouncementsIndex: undefined;
  AnnouncementsDetail: { id: number };
};

export type MembersParams = {
  MembersIndex: undefined;
  AddMember: undefined;
  MembersDetail: { id: number };
};

export interface IRiserApi {
  getMembers(): Promise<Member[]>;

  getAnnouncements(): Promise<AnnouncementLite[]>;
  getAnnouncement(id: number): Promise<Announcement>;

  addReactionToAnnouncement(
    announcement: Announcement,
    reaction: Reaction,
  ): Promise<Reaction>;

  removeReactionFromAnnouncement(
    announcement: Announcement,
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

export interface Member {
  id: number;
  name: string;
  username: string;
  email: string;
  phoneNumber?: string;
  birthDayMonth?: number;
  birthDayDay?: number;
  pronouns?: string;
  avatarUrl: string;
}

export interface DefaultFormFields {
  apiError: string;
}
