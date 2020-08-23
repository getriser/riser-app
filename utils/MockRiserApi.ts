import {
  Announcement,
  AnnouncementLite,
  IRiserApi,
  Member,
  Reaction,
  SuccessMessage,
} from '../types';
import GetMembers from '../fixtures/get-members.json';
import GetAnnouncements from '../fixtures/get-announcements.json';
import GetAnnouncement from '../fixtures/get-announcement.json';
import AddReaction from '../fixtures/add-reaction.json';
import SuccessMessageResponse from '../fixtures/success-message.json';

export default class MockRiserApi implements IRiserApi {
  getAnnouncements(): Promise<AnnouncementLite[]> {
    return this.mockResponse<AnnouncementLite[]>(GetAnnouncements);
  }

  getAnnouncement(id: number): Promise<Announcement> {
    return this.mockResponse<Announcement>({ ...GetAnnouncement, ...{ id } });
  }

  addReactionToAnnouncement(
    announcement: Announcement,
    reaction: Reaction,
  ): Promise<Reaction> {
    return this.mockResponse<Reaction>(AddReaction);
  }

  removeReactionFromAnnouncement(
    announcement: Announcement,
    reaction: Reaction,
  ): Promise<SuccessMessage> {
    return this.mockResponse<SuccessMessage>(SuccessMessageResponse);
  }

  private mockResponse<T>(mock: T, timeout = 1000): Promise<T> {
    return new Promise<T>((resolve) => {
      setTimeout(() => resolve(mock), timeout);
    });
  }

  getMembers(): Promise<Member[]> {
    return this.mockResponse<Member[]>(GetMembers);
  }
}
