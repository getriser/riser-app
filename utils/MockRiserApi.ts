import { Announcement, AnnouncementLite, IRiserApi } from '../types';
import GetAnnouncements from '../fixtures/get-announcements.json';
import GetAnnouncement from '../fixtures/get-announcement.json';

export default class MockRiserApi implements IRiserApi {
  getAnnouncements(): Promise<AnnouncementLite[]> {
    return this.mockResponse<AnnouncementLite[]>(GetAnnouncements);
  }

  getAnnouncement(id: number): Promise<Announcement> {
    return this.mockResponse<Announcement>({ ...GetAnnouncement, ...{ id } });
  }

  private mockResponse<T>(mock: T, timeout = 1000): Promise<T> {
    return new Promise<T>((resolve) => {
      setTimeout(() => resolve(mock), timeout);
    });
  }
}
