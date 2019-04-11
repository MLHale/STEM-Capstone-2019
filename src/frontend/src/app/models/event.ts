import { Tag } from './tag';

export class Event {
  id: number;
  name: string;
  date: string;
  event_type: string;
  organizer: number;
  attendees: number[];
  tags: Tag[];
}
