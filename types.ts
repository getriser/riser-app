export type AnnouncementsParams = {
  AnnouncementsIndex: undefined;
  AnnouncementsDetail: { id: number };
};

export interface IRiserApi {
  getAnnouncements(): Promise<AnnouncementLite[]>;
  getAnnouncement(id: number): Promise<Announcement>;
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
