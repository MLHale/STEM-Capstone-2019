import { Event } from './event';

export const EVENTS: Event[] = [
  { id: 1, name: 'Office Party', date: '2019-07-11', event_type: 'Community', organizer: 2, tags:[], attendees: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16] },
  { id: 2, name: 'Fundraiser', date: '2019-05-30', event_type: 'Community', organizer: 9, tags:[], attendees: [3, 6, 7, 8, 13, 16] },
  { id: 3, name: 'Fun Run', date: '2019-07-25', event_type: 'Community', organizer: 2, tags:[], attendees: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16] },
  { id: 4, name: 'Paper Airplane Design', date: '2019-08-30', event_type: 'Camp', organizer: 5, tags:[], attendees: [2, 3, 4, 6, 7, 8, 10, 13, 16] },
  { id: 5, name: 'Pam\'s Painting', date: '2019-12-11', event_type: 'Camp', organizer: 3, tags:[], attendees: [2, 6, 7, 13] },
  { id: 6, name: 'Pretzel Day', date: '2019-09-10', event_type: 'Camp', organizer: 10, tags:[], attendees: [2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16] },
];
