import { test, expect } from 'vitest';
import { getTimeInProgress } from '@/lib/issue/issue-time-spent.service';

import { Schedule } from '@/app/(dashboard)/schedules/calendar/schedule.service';
import { seedMembers } from '@/seeds/member';
import { calculateTotalMinutes, doEventsOverlap, expandRecurringEvents } from '@/lib/issue/test2';

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

  const totalMinutesSpent = calculateTotalMinutes(expandedEvents, startDate, endDate);

  expect(totalMinutesSpent).toBe(90 * 60 * 1000);
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

test('getTimeInProgress', async () => {
  const issue = {
    id: '10057',
    key: 'SCRUM-55',
    fields: {
      summary: 'corriger la fonction calculateTimeInMilliseconds et créer un test unitaire',
      assignee: null,
      status: { id: '10004', name: 'Done', statusCategory: { id: 3, name: 'Done' } },
    },
    estimation: 3,
    changelog: {
      startAt: 0,
      maxResults: 6,
      total: 6,
      histories: [
        {
          id: '10454',
          created: '2023-09-19T21:13:26.607+0200',
          items: [
            {
              field: 'resolution',
              fieldId: 'resolution',
              from: null,
              fromString: null,
              to: '10000',
              toString: 'Done',
            },
            {
              field: 'status',
              fieldId: 'status',
              from: '10006',
              fromString: 'Testing',
              to: '10004',
              toString: 'Done',
            },
          ],
        },
        {
          id: '10453',
          created: '2023-09-19T21:03:28.121+0200',
          items: [
            {
              field: 'status',
              fieldId: 'status',
              from: '3',
              fromString: 'In Progress',
              to: '10006',
              toString: 'Testing',
            },
          ],
        },
        {
          id: '10451',
          created: '2023-09-19T17:36:50.097+0200',
          items: [
            {
              field: 'status',
              fieldId: 'status',
              from: '10003',
              fromString: 'To Do',
              to: '3',
              toString: 'In Progress',
            },
          ],
        },
        {
          id: '10450',
          created: '2023-09-19T17:35:49.701+0200',
          items: [
            {
              field: 'Sprint',
              fieldId: 'customfield_10020',
              from: '',
              fromString: '',
              to: '19',
              toString: 'SCRUM Sprint 14',
            },
          ],
        },
        {
          id: '10449',
          created: '2023-09-19T17:35:45.939+0200',
          items: [
            {
              field: 'summary',
              fieldId: 'summary',
              from: null,
              fromString: 'créer le test pour la fonction calculateTimeInMilliseconds',
              to: null,
              toString:
                'corriger la fonction calculateTimeInMilliseconds et créer un test unitaire',
            },
          ],
        },
        {
          id: '10448',
          created: '2023-09-19T17:35:28.803+0200',
          items: [
            {
              field: 'Story Points',
              fieldId: 'customfield_10034',
              from: null,
              fromString: null,
              to: null,
              toString: '3',
            },
          ],
        },
      ],
    },
  };

  const schedules = [
    {
      id: '38',
      memberId: '712020:48ca8fc9-3d65-4956-9051-acf82cd28f26',
      start: '2023-09-18T09:00:00Z',
      end: '2023-09-18T12:00:00Z',
      duration: null,
      rrule: null,
    },
    {
      id: '39',
      memberId: '712020:48ca8fc9-3d65-4956-9051-acf82cd28f26',
      start: '2023-09-18T13:23:00.699Z',
      end: '2023-09-18T16:30:00.699Z',
      duration: null,
      rrule: null,
    },
    {
      id: '41',
      memberId: '712020:48ca8fc9-3d65-4956-9051-acf82cd28f26',
      start: '2023-09-18T18:18:00.699Z',
      end: '2023-09-18T20:00:00.699Z',
      duration: null,
      rrule: null,
    },
    {
      id: '43',
      memberId: '712020:48ca8fc9-3d65-4956-9051-acf82cd28f26',
      start: '2023-09-19T10:07:55.811Z',
      end: '2023-09-19T12:30:55.811Z',
      duration: null,
      rrule: null,
    },
    {
      id: '48',
      memberId: '712020:48ca8fc9-3d65-4956-9051-acf82cd28f26',
      start: null,
      end: null,
      duration: '03:00:00',
      rrule: {
        freq: 'weekly',
        byweekday: ['su', 'mo', 'tu', 'we', 'th', 'fr', 'sa'],
        dtstart: '2023-08-15T07:00:00Z',
        until: '2023-09-15',
      },
    },
    {
      id: '44',
      memberId: '712020:48ca8fc9-3d65-4956-9051-acf82cd28f26',
      start: '2023-09-19T13:15:00Z',
      end: '2023-09-19T15:37:00Z',
      duration: null,
      rrule: null,
    },
    {
      id: '49',
      memberId: '712020:48ca8fc9-3d65-4956-9051-acf82cd28f26',
      start: '2023-09-19T17:03:00Z',
      end: '2023-09-19T17:30:00Z',
      duration: null,
      rrule: null,
    },
    {
      id: '50',
      memberId: '712020:48ca8fc9-3d65-4956-9051-acf82cd28f26',
      start: '2023-09-19T17:45:00Z',
      end: '2023-09-19T18:30:00Z',
      duration: null,
      rrule: null,
    },
  ];

  const inProgressColumns = ['Testing', 'In Progress'];

  const result = getTimeInProgress(issue, schedules, inProgressColumns);

  expect(result).toBe(4329903);
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
