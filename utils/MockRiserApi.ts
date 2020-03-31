import { Announcement, IRiserApi } from '../types';
import GetAnnouncements from '../fixtures/get-announcements.json';

export default class MockRiserApi implements IRiserApi {
  getAnnouncements(): Promise<Announcement[]> {
    return new Promise<Announcement[]>((resolve) => {
      setTimeout(() => resolve(GetAnnouncements as Announcement[]), 1000);
    });
  }
}
