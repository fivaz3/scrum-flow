// replace 'your-file' with the actual file name where calculateMinutes is defined

import { test, expect } from 'vitest';
// Example usage
import { Schedule } from '@/app/(dashboard)/schedules/calendar/schedule.service';
import { seedMembers } from '@/seeds/member';
import {
  expandRecurringEvents,
  calculateTotalMinutesInEvents,
  doEventsOverlap,
} from '@/lib/issue/test2';

test('calculates total minutes spent on events between two dates', () => {
  const events: Schedule[] = [
    {
      id: '1',
      memberId: seedMembers[0].accountId,
      start: '2023-09-19T11:00:00.000Z',
      end: '2023-09-19T12:00:00.000Z',
      duration: null,
      rrule: null,
    },
    {
      id: '2',
      memberId: seedMembers[0].accountId,
      start: null,
      end: null,
      duration: '01:00',
      rrule: {
        freq: 'weekly',
        byweekday: ['mo', 'tu', 'we', 'th', 'fr'],
        dtstart: '2023-09-05T10:00:00.000Z',
        until: '2023-09-30',
      },
    },
    // Add more events to the list, including recurring events
  ];

  const startDate = '2023-09-19T09:00:00.000Z';
  const endDate = '2023-09-19T11:30:00.000Z';

  const expandedEvents = expandRecurringEvents(events);

  console.log(expandedEvents);

  const totalMinutesSpent = calculateTotalMinutesInEvents(expandedEvents, startDate, endDate);
  console.log(`Total minutes spent: ${totalMinutesSpent}`);

  expect(totalMinutesSpent).toBe(90);
});

test('doEventsOverlap', () => {
  const schedule = {
    id: '1',
    memberId: seedMembers[0].accountId,
    start: '2023-09-19T11:30:00.000Z',
    end: '2023-09-19T11:45:00.000Z',
    duration: null,
    rrule: null,
  };

  const startDate = '2023-09-19T11:00:00.000Z';
  const endDate = '2023-09-19T11:40:00.000Z';

  const result = doEventsOverlap(schedule, startDate, endDate);

  expect(result).toBe(true);
});

// test('calculates total minutes spent on events between two dates', () => {
//   const events: Schedule[] = [
//     {
//       id: '1',
//       memberId: seedMembers[0].accountId,
//       start: '2023-09-17T10:00:00.000Z',
//       end: '2023-09-17T11:00:00.000Z',
//       duration: null,
//       rrule: null,
//     },
//
//     // {
//     //   id: '2',
//     //   memberId: seedMembers[0].accountId,
//     //   start: null,
//     //   end: null,
//     //   duration: '60',
//     //   rrule: {
//     //     freq: 'weekly',
//     //     byweekday: ['mo', 'tu', 'we', 'th', 'fr'],
//     //     dtstart: '2023-09-05T10:00:00.000Z',
//     //     until: '2023-09-30',
//     //   },
//     // },
//   ];
//
//   const startAt = parseISO('2023-09-17T10:15:00.000Z');
//   const date = parseISO('2023-09-17T10:30:00.000Z');
//   const result = calculateTimeInMilliseconds(events, startAt, date);
//   expect(result).toBe(15); // 15 minutes from the single event and 15 minutes from the recurring event
// });

// test('calculates total minutes spent on events between two dates', () => {
//   const events: Event[] = [
//     {
//       id: '1',
//       title: 'Event 1',
//       start: '2023-09-19T10:00:00',
//       end: '2023-09-19T12:00:00',
//     },
//     // Add more events to the list
//   ];
//
//   const schedule = {
//     id: '2',
//     title: seedMembers[0].accountId,
//     start: null,
//     end: null,
//     duration: '60',
//     rrule: {
//       freq: 'weekly',
//       byweekday: ['mo', 'tu', 'we', 'th', 'fr'],
//       dtstart: '2023-09-05T10:00:00.000Z',
//       until: '2023-09-30',
//     },
//   };
//
//   // const a = new RRule({
//   //   freq: 2,
//   //   byweekday: revent.rrule.byweekday.map((item) => item.toUpperCase()),
//   //   dtstart: revent.rrule.dtstart,
//   //   until: revent.rrule.until,
//   // });
//
//   const a = new RRule({
//     freq: RRule.WEEKLY,
//     byweekday: [RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR],
//     // dtstart: datetime(2023, 9, 5, 10, 0),
//     dtstart: parseISO(schedule.rrule.dtstart),
//     // until: datetime(2023, 9, 30),
//     until: parseISO(schedule.rrule.until),
//   });
//
//   console.log(a.toString());
//
//   const b = new RRule({
//     freq: RRule.WEEKLY,
//     byweekday: [0, 1, 2, 3, 4],
//     // dtstart: datetime(2023, 9, 5, 10, 0),
//     dtstart: parseISO(schedule.rrule.dtstart),
//     // until: datetime(2023, 9, 30),
//     until: parseISO(schedule.rrule.until),
//   });
//
//   console.log(b.toString());
//
//   // console.log('x', datetime(2012, 2, 1, 10, 30).toISOString());
//
//   // console.log('a', rule.toString());
//
//   const startDate = '2023-09-19T09:00:00';
//   const endDate = '2023-09-19T11:30:00';
//
//   // const totalMinutesSpent = calculateTotalMinutesInEvents(events, startDate, endDate);
//   // console.log(`Total minutes spent: ${totalMinutesSpent}`);
//
//   expect(1).toBe(1); // 15 minutes from the single event and 15 minutes from the recurring event
// });
