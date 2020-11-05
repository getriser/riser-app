import {
  Announcement,
  IRiserApi,
  Reaction,
  SuccessMessage,
} from '../types';
import GetAnnouncement from '../fixtures/get-announcement.json';
import AddReaction from '../fixtures/add-reaction.json';
import SuccessMessageResponse from '../fixtures/success-message.json';

export default class MockRiserApi implements IRiserApi {
  getAnnouncement(id: number): Promise<Announcement> {
    return this.mockResponse<Announcement>({...GetAnnouncement, ...{id}});
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
}
