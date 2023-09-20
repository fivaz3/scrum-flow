import { test, expect } from 'vitest';
import {
  calculateTotalMinutes,
  doEventsOverlap,
  getTimeInProgress,
  getTimeInProgressInSprint,
} from '@/lib/issue/issue-time-spent.service';

import {
  expandRecurringEvents,
  Schedule,
} from '@/app/(dashboard)/schedules/calendar/schedule.service';
import { seedMembers } from '@/seeds/member';
import { formatDuration, intervalToDuration, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

test('getTimeInProgressInSprint', () => {
  const issue38 = {
    id: '10040',
    key: 'SCRUM-38',
    fields: {
      summary: 'Faire la comparaison entre S. P et temps',
      assignee: {
        accountId: '712020:48ca8fc9-3d65-4956-9051-acf82cd28f26',
        displayName: 'Stefane Fivaz',
        emailAddress: 'stefan.fivaz@gmail.com',
        avatarUrls: {
          '48x48':
            'https://secure.gravatar.com/avatar/b849ec8b33cee3be64f5d9abee4b4845?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FSF-6.png',
          '24x24':
            'https://secure.gravatar.com/avatar/b849ec8b33cee3be64f5d9abee4b4845?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FSF-6.png',
          '16x16':
            'https://secure.gravatar.com/avatar/b849ec8b33cee3be64f5d9abee4b4845?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FSF-6.png',
          '32x32':
            'https://secure.gravatar.com/avatar/b849ec8b33cee3be64f5d9abee4b4845?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FSF-6.png',
        },
      },
      status: { id: '3', name: 'In Progress', statusCategory: { id: 4, name: 'In Progress' } },
    },
    estimation: 3,
    changelog: {
      startAt: 0,
      maxResults: 13,
      total: 13,
      histories: [
        {
          id: '10485',
          created: '2023-09-20T17:46:38.308+0200',
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
          id: '10465',
          created: '2023-09-19T23:19:56.690+0200',
          items: [
            {
              field: 'Rank',
              fieldId: 'customfield_10019',
              from: '',
              fromString: '',
              to: '',
              toString: 'Ranked higher',
            },
          ],
        },
        {
          id: '10464',
          created: '2023-09-19T23:19:56.527+0200',
          items: [
            {
              field: 'Sprint',
              fieldId: 'customfield_10020',
              from: '16',
              fromString: 'SCRUM Sprint 11',
              to: '16, 20',
              toString: 'SCRUM Sprint 11, SCRUM Sprint 15',
            },
          ],
        },
        {
          id: '10364',
          created: '2023-09-14T18:12:57.578+0200',
          items: [
            {
              field: 'status',
              fieldId: 'status',
              from: '3',
              fromString: 'In Progress',
              to: '10003',
              toString: 'To Do',
            },
          ],
        },
        {
          id: '10360',
          created: '2023-09-14T17:37:57.053+0200',
          items: [
            {
              field: 'assignee',
              fieldId: 'assignee',
              from: null,
              fromString: null,
              to: '712020:48ca8fc9-3d65-4956-9051-acf82cd28f26',
              toString: 'Stefane Fivaz',
            },
          ],
        },
        {
          id: '10359',
          created: '2023-09-14T17:01:38.370+0200',
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
          id: '10356',
          created: '2023-09-14T14:22:27.349+0200',
          items: [
            {
              field: 'Rank',
              fieldId: 'customfield_10019',
              from: '',
              fromString: '',
              to: '',
              toString: 'Ranked higher',
            },
          ],
        },
        {
          id: '10355',
          created: '2023-09-14T14:22:27.171+0200',
          items: [
            {
              field: 'Sprint',
              fieldId: 'customfield_10020',
              from: '',
              fromString: '',
              to: '16',
              toString: 'SCRUM Sprint 11',
            },
          ],
        },
        {
          id: '10351',
          created: '2023-09-14T14:22:16.768+0200',
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
        {
          id: '10350',
          created: '2023-09-14T14:22:12.493+0200',
          items: [
            {
              field: 'summary',
              fieldId: 'summary',
              from: null,
              fromString: 'Test',
              to: null,
              toString: 'Faire la comparaison entre S. P et temps',
            },
          ],
        },
        {
          id: '10313',
          created: '2023-09-13T11:10:15.614+0200',
          items: [
            {
              field: 'Rank',
              fieldId: 'customfield_10019',
              from: '',
              fromString: '',
              to: '',
              toString: 'Ranked lower',
            },
          ],
        },
        {
          id: '10312',
          created: '2023-09-13T11:10:15.378+0200',
          items: [
            {
              field: 'Sprint',
              fieldId: 'customfield_10020',
              from: '13',
              fromString: 'SCRUM Sprint 9',
              to: '',
              toString: '',
            },
          ],
        },
        {
          id: '10310',
          created: '2023-09-10T22:28:56.280+0200',
          items: [
            {
              field: 'Sprint',
              fieldId: 'customfield_10020',
              from: '',
              fromString: '',
              to: '13',
              toString: 'SCRUM Sprint 9',
            },
          ],
        },
      ],
    },
  };

  const schedules = [
    {
      id: '61',
      memberId: '712020:48ca8fc9-3d65-4956-9051-acf82cd28f26',
      start: '2023-09-20T11:00:00Z',
      end: '2023-09-20T13:00:00Z',
      duration: null,
      rrule: null,
    },
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
      id: '62',
      memberId: '712020:48ca8fc9-3d65-4956-9051-acf82cd28f26',
      start: null,
      end: null,
      duration: '05:00:00',
      rrule: {
        freq: 'weekly',
        byweekday: ['su', 'mo', 'tu', 'we', 'th', 'fr', 'sa'],
        dtstart: '2023-08-15T11:00:00Z',
        until: '2023-09-15',
      },
    },
    {
      id: '63',
      memberId: '712020:48ca8fc9-3d65-4956-9051-acf82cd28f26',
      start: null,
      end: null,
      duration: '02:00:00',
      rrule: {
        freq: 'weekly',
        byweekday: ['su', 'mo', 'tu', 'we', 'th', 'fr', 'sa'],
        dtstart: '2023-08-15T17:30:00Z',
        until: '2023-09-15',
      },
    },
    {
      id: '64',
      memberId: '712020:48ca8fc9-3d65-4956-9051-acf82cd28f26',
      start: '2023-09-20T14:07:00Z',
      end: '2023-09-20T16:30:00Z',
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
    {
      id: '52',
      memberId: '712020:48ca8fc9-3d65-4956-9051-acf82cd28f26',
      start: '2023-09-15T18:00:00Z',
      end: '2023-09-15T21:50:00Z',
      duration: null,
      rrule: null,
    },
    {
      id: '53',
      memberId: '712020:48ca8fc9-3d65-4956-9051-acf82cd28f26',
      start: '2023-09-15T22:15:00Z',
      end: '2023-09-16T00:50:00Z',
      duration: null,
      rrule: null,
    },
    {
      id: '54',
      memberId: '712020:48ca8fc9-3d65-4956-9051-acf82cd28f26',
      start: '2023-09-16T10:30:00Z',
      end: '2023-09-16T13:38:00Z',
      duration: null,
      rrule: null,
    },
    {
      id: '55',
      memberId: '712020:48ca8fc9-3d65-4956-9051-acf82cd28f26',
      start: '2023-09-16T16:14:00Z',
      end: '2023-09-16T18:45:00Z',
      duration: null,
      rrule: null,
    },
    {
      id: '56',
      memberId: '712020:48ca8fc9-3d65-4956-9051-acf82cd28f26',
      start: '2023-09-16T21:43:00Z',
      end: '2023-09-16T21:59:00Z',
      duration: null,
      rrule: null,
    },
    {
      id: '57',
      memberId: '712020:48ca8fc9-3d65-4956-9051-acf82cd28f26',
      start: '2023-09-16T22:00:00Z',
      end: '2023-09-16T22:45:00Z',
      duration: null,
      rrule: null,
    },
    {
      id: '58',
      memberId: '712020:48ca8fc9-3d65-4956-9051-acf82cd28f26',
      start: '2023-09-17T09:00:00Z',
      end: '2023-09-17T10:30:00Z',
      duration: null,
      rrule: null,
    },
  ];

  const inProgressColumns = ['Testing', 'In Progress'];

  const sprint = {
    id: 18,
    self: 'https://api.atlassian.com/ex/jira/02f2c8a2-aa9d-44b5-b655-00ac25b37f56/rest/agile/1.0/sprint/18',
    state: 'closed',
    name: 'SCRUM Sprint 13',
    startDate: '2023-09-16T10:31:00.308Z',
    endDate: '2023-09-16T22:35:00.000Z',
    completeDate: '2023-09-19T15:32:19.645Z',
    originBoardId: 2,
    goal: '',
  };

  const duration = intervalToDuration({ start: 0, end: 4663529 });

  console.log(formatDuration(duration, { format: ['hours', 'minutes'], locale: fr }));

  const result = getTimeInProgressInSprint(sprint, issue38, schedules, inProgressColumns);

  expect(result).toBeLessThan(60 * 60 * 1000);
});

test('calculateTotalMinutes', () => {
  const schedules: Schedule[] = [
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
  ];

  const startDate = '2023-09-19T09:00:00.000Z';
  const endDate = '2023-09-19T11:30:00.000Z';

  const expandedEvents = expandRecurringEvents(schedules);

  const totalMinutesSpent = calculateTotalMinutes(
    expandedEvents,
    parseISO(startDate),
    parseISO(endDate)
  );

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

  const result = doEventsOverlap(schedule, parseISO(startDate), parseISO(endDate));

  expect(result).toBe(true);
});

test('getTimeInProgress', () => {
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
