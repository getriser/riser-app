export type AnnouncementsParams = {
  AnnouncementsIndex: undefined;
  AnnouncementsDetail: { id: number };
};

export interface IRiserApi {
  getAnnouncements(): Promise<Announcement[]>;
}

export interface Announcement {
  id: number;
  title: string;
  content: string;
  isRead: boolean;
  numberOfComments: number;
  createdAt: string;
  imageUrl: string;
}

export interface IdMapping<T> {
  [key: number]: T;
}
