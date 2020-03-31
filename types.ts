export type AnnouncementsParams = {
  AnnouncementsIndex: undefined;
  AnnouncementsShow: { id: number };
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
