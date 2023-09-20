import { ActiveSprint, ClosedSprint } from '@/lib/sprint.service';
import { addDays } from 'date-fns';
import { SprintBreakThrough } from '@/app/(dashboard)/report/sprints-section/service';
import { seedDoingIssues, seedToDoIssues } from '@/seeds/issue';

export const seedActiveSprint: ActiveSprint = {
  id: 2,
  name: 'Sprint 2',
  startDate: new Date().toISOString(),
  endDate: addDays(new Date(), 7).toISOString(),
  state: 'active',
  originBoardId: 1,
};

export const seedClosedSprint: ClosedSprint = {
  id: 1,
  name: 'SCRUM Sprint 15',
  startDate: '2023-09-20T04:00:00.000Z',
  endDate: '2023-09-20T19:00:00.000Z',
  completeDate: '2023-09-20T19:30:27.688Z',
  state: 'closed',
  originBoardId: 2,
};

export const seedClosedSprintBreakThrough: SprintBreakThrough = {
  ...seedClosedSprint,
  estimatedIssues: seedToDoIssues,
  actualIssues: seedDoingIssues,
};

export const seedClosedSprintsBreakThrough = [
  {
    id: 18,
    state: 'closed',
    name: 'SCRUM Sprint 13',
    startDate: '2023-09-16T10:31:00.308Z',
    endDate: '2023-09-16T22:35:00.000Z',
    completeDate: '2023-09-19T15:32:19.645Z',
    originBoardId: 2,
    estimatedIssues: [
      {
        id: '10054',
        key: 'SCRUM-52',
        fields: {
          summary: 'corriger le problème du SCRUM-15',
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
          status: { id: '10004', name: 'Done', statusCategory: { id: 3, name: 'Done' } },
        },
        estimation: 2,
        changelog: {
          startAt: 0,
          maxResults: 9,
          total: 9,
          histories: [
            {
              id: '10418',
              created: '2023-09-16T12:26:00.198+0200',
              items: [
                {
                  field: 'Sprint',
                  fieldId: 'customfield_10020',
                  from: '',
                  fromString: '',
                  to: '18',
                  toString: 'SCRUM Sprint 13',
                },
              ],
            },
            {
              id: '10428',
              created: '2023-09-16T12:29:04.315+0200',
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
              id: '10429',
              created: '2023-09-16T12:29:04.350+0200',
              items: [
                {
                  field: 'Story Points',
                  fieldId: 'customfield_10034',
                  from: null,
                  fromString: null,
                  to: null,
                  toString: '2',
                },
              ],
            },
            {
              id: '10456',
              created: '2023-09-19T23:17:15.366+0200',
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
              id: '10457',
              created: '2023-09-19T23:17:17.307+0200',
              items: [
                {
                  field: 'Sprint',
                  fieldId: 'customfield_10020',
                  from: '18',
                  fromString: 'SCRUM Sprint 13',
                  to: '18, 20',
                  toString: 'SCRUM Sprint 13, SCRUM Sprint 15',
                },
              ],
            },
            {
              id: '10472',
              created: '2023-09-20T13:46:50.896+0200',
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
              id: '10473',
              created: '2023-09-20T13:46:53.171+0200',
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
              id: '10474',
              created: '2023-09-20T13:47:15.271+0200',
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
              id: '10475',
              created: '2023-09-20T16:08:01.447+0200',
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
                  from: '3',
                  fromString: 'In Progress',
                  to: '10004',
                  toString: 'Done',
                },
              ],
            },
          ],
        },
        timeSpent: 0,
      },
      {
        id: '10055',
        key: 'SCRUM-53',
        fields: {
          summary: 'séparer les tickets réalisés des non réalisées lors des sprints précedents',
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
          status: { id: '10004', name: 'Done', statusCategory: { id: 3, name: 'Done' } },
        },
        estimation: 2,
        changelog: {
          startAt: 0,
          maxResults: 8,
          total: 8,
          histories: [
            {
              id: '10425',
              created: '2023-09-16T12:28:41.174+0200',
              items: [
                {
                  field: 'Sprint',
                  fieldId: 'customfield_10020',
                  from: '',
                  fromString: '',
                  to: '18',
                  toString: 'SCRUM Sprint 13',
                },
              ],
            },
            {
              id: '10432',
              created: '2023-09-16T12:29:29.019+0200',
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
              id: '10433',
              created: '2023-09-16T12:29:35.840+0200',
              items: [
                {
                  field: 'Story Points',
                  fieldId: 'customfield_10034',
                  from: null,
                  fromString: null,
                  to: null,
                  toString: '2',
                },
              ],
            },
            {
              id: '10460',
              created: '2023-09-19T23:19:23.434+0200',
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
              id: '10461',
              created: '2023-09-19T23:19:25.654+0200',
              items: [
                {
                  field: 'Sprint',
                  fieldId: 'customfield_10020',
                  from: '18',
                  fromString: 'SCRUM Sprint 13',
                  to: '18, 20',
                  toString: 'SCRUM Sprint 13, SCRUM Sprint 15',
                },
              ],
            },
            {
              id: '10476',
              created: '2023-09-20T16:23:02.910+0200',
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
              id: '10479',
              created: '2023-09-20T17:43:10.967+0200',
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
              id: '10480',
              created: '2023-09-20T17:44:31.393+0200',
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
          ],
        },
        timeSpent: 0,
      },
      {
        id: '10041',
        key: 'SCRUM-39',
        fields: {
          summary:
            'supprimer du temps passé le temps passé par un ticket en En cours dans le sprint précédent',
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
          status: { id: '10004', name: 'Done', statusCategory: { id: 3, name: 'Done' } },
        },
        estimation: 3,
        changelog: {
          startAt: 0,
          maxResults: 19,
          total: 19,
          histories: [
            {
              id: '10344',
              created: '2023-09-14T14:20:20.612+0200',
              items: [
                {
                  field: 'summary',
                  fieldId: 'summary',
                  from: null,
                  fromString: 'test2',
                  to: null,
                  toString:
                    'remove from the time spent concerning the amount of time a ticket spent in In Progress in the previous board',
                },
              ],
            },
            {
              id: '10345',
              created: '2023-09-14T14:20:26.325+0200',
              items: [
                {
                  field: 'Story Points',
                  fieldId: 'customfield_10034',
                  from: null,
                  fromString: null,
                  to: null,
                  toString: '4',
                },
              ],
            },
            {
              id: '10348',
              created: '2023-09-14T14:21:33.755+0200',
              items: [
                {
                  field: 'summary',
                  fieldId: 'summary',
                  from: null,
                  fromString:
                    'remove from the time spent concerning the amount of time a ticket spent in In Progress in the previous board',
                  to: null,
                  toString:
                    'supprimer du temps passé concernant le temps passé par un ticket en En cours dans le tableau précédent',
                },
              ],
            },
            {
              id: '10349',
              created: '2023-09-14T14:21:46.851+0200',
              items: [
                {
                  field: 'summary',
                  fieldId: 'summary',
                  from: null,
                  fromString:
                    'supprimer du temps passé concernant le temps passé par un ticket en En cours dans le tableau précédent',
                  to: null,
                  toString:
                    'supprimer du temps passé le temps passé par un ticket en En cours dans le sprint précédent',
                },
              ],
            },
            {
              id: '10353',
              created: '2023-09-14T14:22:26.143+0200',
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
              id: '10354',
              created: '2023-09-14T14:22:26.332+0200',
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
              id: '10362',
              created: '2023-09-14T17:38:03.371+0200',
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
              id: '10419',
              created: '2023-09-16T12:26:12.939+0200',
              items: [
                {
                  field: 'Sprint',
                  fieldId: 'customfield_10020',
                  from: '16',
                  fromString: 'SCRUM Sprint 11',
                  to: '16, 18',
                  toString: 'SCRUM Sprint 11, SCRUM Sprint 13',
                },
              ],
            },
            {
              id: '10420',
              created: '2023-09-16T12:26:13.112+0200',
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
              id: '10434',
              created: '2023-09-16T12:30:41.928+0200',
              items: [
                {
                  field: 'Story Points',
                  fieldId: 'customfield_10034',
                  from: null,
                  fromString: '4',
                  to: null,
                  toString: '3',
                },
              ],
            },
            {
              id: '10462',
              created: '2023-09-19T23:19:47.945+0200',
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
              id: '10463',
              created: '2023-09-19T23:19:50.114+0200',
              items: [
                {
                  field: 'Sprint',
                  fieldId: 'customfield_10020',
                  from: '16, 18',
                  fromString: 'SCRUM Sprint 11, SCRUM Sprint 13',
                  to: '16, 18, 20',
                  toString: 'SCRUM Sprint 11, SCRUM Sprint 13, SCRUM Sprint 15',
                },
              ],
            },
            {
              id: '10481',
              created: '2023-09-20T17:45:30.578+0200',
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
              id: '10482',
              created: '2023-09-20T17:46:22.430+0200',
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
              id: '10483',
              created: '2023-09-20T17:46:26.871+0200',
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
              id: '10484',
              created: '2023-09-20T17:46:36.474+0200',
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
              id: '10488',
              created: '2023-09-20T19:39:25.731+0200',
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
              id: '10489',
              created: '2023-09-20T21:30:22.365+0200',
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
              id: '10490',
              created: '2023-09-20T21:30:23.215+0200',
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
          ],
        },
        timeSpent: 0,
      },
      {
        id: '10056',
        key: 'SCRUM-54',
        fields: {
          summary: 'supprimer tremor',
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
          status: { id: '10004', name: 'Done', statusCategory: { id: 3, name: 'Done' } },
        },
        estimation: 3,
        changelog: {
          startAt: 0,
          maxResults: 11,
          total: 11,
          histories: [
            {
              id: '10423',
              created: '2023-09-16T12:28:31.579+0200',
              items: [
                {
                  field: 'Sprint',
                  fieldId: 'customfield_10020',
                  from: '',
                  fromString: '',
                  to: '18',
                  toString: 'SCRUM Sprint 13',
                },
              ],
            },
            {
              id: '10424',
              created: '2023-09-16T12:28:31.758+0200',
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
              id: '10430',
              created: '2023-09-16T12:29:15.757+0200',
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
              id: '10431',
              created: '2023-09-16T12:29:21.379+0200',
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
              id: '10435',
              created: '2023-09-16T12:32:45.760+0200',
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
              id: '10436',
              created: '2023-09-16T18:15:20.764+0200',
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
                  from: '3',
                  fromString: 'In Progress',
                  to: '10004',
                  toString: 'Done',
                },
              ],
            },
            {
              id: '10438',
              created: '2023-09-16T18:16:09.597+0200',
              items: [
                {
                  field: 'resolution',
                  fieldId: 'resolution',
                  from: '10000',
                  fromString: 'Done',
                  to: null,
                  toString: null,
                },
                {
                  field: 'status',
                  fieldId: 'status',
                  from: '10004',
                  fromString: 'Done',
                  to: '10006',
                  toString: 'Testing',
                },
              ],
            },
            {
              id: '10440',
              created: '2023-09-16T18:16:11.353+0200',
              items: [
                {
                  field: 'status',
                  fieldId: 'status',
                  from: '10006',
                  fromString: 'Testing',
                  to: '3',
                  toString: 'In Progress',
                },
              ],
            },
            {
              id: '10441',
              created: '2023-09-16T20:44:53.298+0200',
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
                  from: '3',
                  fromString: 'In Progress',
                  to: '10004',
                  toString: 'Done',
                },
              ],
            },
            {
              id: '10442',
              created: '2023-09-16T20:44:59.724+0200',
              items: [
                {
                  field: 'summary',
                  fieldId: 'summary',
                  from: null,
                  fromString: 'chercher une autre lib pour faire des graphiques',
                  to: null,
                  toString: 'completly remove tremor',
                },
              ],
            },
            {
              id: '10443',
              created: '2023-09-16T20:45:06.618+0200',
              items: [
                {
                  field: 'summary',
                  fieldId: 'summary',
                  from: null,
                  fromString: 'completly remove tremor',
                  to: null,
                  toString: 'supprimer tremor',
                },
              ],
            },
          ],
        },
        timeSpent: 20118705,
      },
    ],
    actualIssues: [
      {
        id: '10056',
        key: 'SCRUM-54',
        fields: {
          summary: 'supprimer tremor',
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
          status: { id: '10004', name: 'Done', statusCategory: { id: 3, name: 'Done' } },
        },
        estimation: 3,
        changelog: {
          startAt: 0,
          maxResults: 11,
          total: 11,
          histories: [
            {
              id: '10443',
              created: '2023-09-16T20:45:06.618+0200',
              items: [
                {
                  field: 'summary',
                  fieldId: 'summary',
                  from: null,
                  fromString: 'completly remove tremor',
                  to: null,
                  toString: 'supprimer tremor',
                },
              ],
            },
            {
              id: '10442',
              created: '2023-09-16T20:44:59.724+0200',
              items: [
                {
                  field: 'summary',
                  fieldId: 'summary',
                  from: null,
                  fromString: 'chercher une autre lib pour faire des graphiques',
                  to: null,
                  toString: 'completly remove tremor',
                },
              ],
            },
            {
              id: '10441',
              created: '2023-09-16T20:44:53.298+0200',
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
                  from: '3',
                  fromString: 'In Progress',
                  to: '10004',
                  toString: 'Done',
                },
              ],
            },
            {
              id: '10440',
              created: '2023-09-16T18:16:11.353+0200',
              items: [
                {
                  field: 'status',
                  fieldId: 'status',
                  from: '10006',
                  fromString: 'Testing',
                  to: '3',
                  toString: 'In Progress',
                },
              ],
            },
            {
              id: '10438',
              created: '2023-09-16T18:16:09.597+0200',
              items: [
                {
                  field: 'resolution',
                  fieldId: 'resolution',
                  from: '10000',
                  fromString: 'Done',
                  to: null,
                  toString: null,
                },
                {
                  field: 'status',
                  fieldId: 'status',
                  from: '10004',
                  fromString: 'Done',
                  to: '10006',
                  toString: 'Testing',
                },
              ],
            },
            {
              id: '10436',
              created: '2023-09-16T18:15:20.764+0200',
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
                  from: '3',
                  fromString: 'In Progress',
                  to: '10004',
                  toString: 'Done',
                },
              ],
            },
            {
              id: '10435',
              created: '2023-09-16T12:32:45.760+0200',
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
              id: '10431',
              created: '2023-09-16T12:29:21.379+0200',
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
              id: '10430',
              created: '2023-09-16T12:29:15.757+0200',
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
              id: '10424',
              created: '2023-09-16T12:28:31.758+0200',
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
              id: '10423',
              created: '2023-09-16T12:28:31.579+0200',
              items: [
                {
                  field: 'Sprint',
                  fieldId: 'customfield_10020',
                  from: '',
                  fromString: '',
                  to: '18',
                  toString: 'SCRUM Sprint 13',
                },
              ],
            },
          ],
        },
        timeSpent: 20118705,
      },
    ],
  },
  {
    id: 19,
    state: 'closed',
    name: 'SCRUM Sprint 14',
    startDate: '2023-09-19T15:36:45.108Z',
    endDate: '2023-09-19T19:30:00.000Z',
    completeDate: '2023-09-19T19:27:28.288Z',
    originBoardId: 2,
    estimatedIssues: [
      {
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
          ],
        },
        timeSpent: 4329903,
      },
    ],
    actualIssues: [
      {
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
        timeSpent: 4329903,
      },
    ],
  },
  {
    id: 20,
    state: 'closed',
    name: 'SCRUM Sprint 15',
    startDate: '2023-09-20T04:00:00.000Z',
    endDate: '2023-09-20T19:00:00.000Z',
    completeDate: '2023-09-20T19:30:27.688Z',
    originBoardId: 2,
    estimatedIssues: [
      {
        id: '10054',
        key: 'SCRUM-52',
        fields: {
          summary: 'corriger le problème du SCRUM-15',
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
          status: { id: '10004', name: 'Done', statusCategory: { id: 3, name: 'Done' } },
        },
        estimation: 2,
        changelog: {
          startAt: 0,
          maxResults: 9,
          total: 9,
          histories: [
            {
              id: '10418',
              created: '2023-09-16T12:26:00.198+0200',
              items: [
                {
                  field: 'Sprint',
                  fieldId: 'customfield_10020',
                  from: '',
                  fromString: '',
                  to: '18',
                  toString: 'SCRUM Sprint 13',
                },
              ],
            },
            {
              id: '10428',
              created: '2023-09-16T12:29:04.315+0200',
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
              id: '10429',
              created: '2023-09-16T12:29:04.350+0200',
              items: [
                {
                  field: 'Story Points',
                  fieldId: 'customfield_10034',
                  from: null,
                  fromString: null,
                  to: null,
                  toString: '2',
                },
              ],
            },
            {
              id: '10456',
              created: '2023-09-19T23:17:15.366+0200',
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
              id: '10457',
              created: '2023-09-19T23:17:17.307+0200',
              items: [
                {
                  field: 'Sprint',
                  fieldId: 'customfield_10020',
                  from: '18',
                  fromString: 'SCRUM Sprint 13',
                  to: '18, 20',
                  toString: 'SCRUM Sprint 13, SCRUM Sprint 15',
                },
              ],
            },
            {
              id: '10472',
              created: '2023-09-20T13:46:50.896+0200',
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
              id: '10473',
              created: '2023-09-20T13:46:53.171+0200',
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
              id: '10474',
              created: '2023-09-20T13:47:15.271+0200',
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
              id: '10475',
              created: '2023-09-20T16:08:01.447+0200',
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
                  from: '3',
                  fromString: 'In Progress',
                  to: '10004',
                  toString: 'Done',
                },
              ],
            },
          ],
        },
        timeSpent: 4428451,
      },
      {
        id: '10055',
        key: 'SCRUM-53',
        fields: {
          summary: 'séparer les tickets réalisés des non réalisées lors des sprints précedents',
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
          status: { id: '10004', name: 'Done', statusCategory: { id: 3, name: 'Done' } },
        },
        estimation: 2,
        changelog: {
          startAt: 0,
          maxResults: 8,
          total: 8,
          histories: [
            {
              id: '10425',
              created: '2023-09-16T12:28:41.174+0200',
              items: [
                {
                  field: 'Sprint',
                  fieldId: 'customfield_10020',
                  from: '',
                  fromString: '',
                  to: '18',
                  toString: 'SCRUM Sprint 13',
                },
              ],
            },
            {
              id: '10432',
              created: '2023-09-16T12:29:29.019+0200',
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
              id: '10433',
              created: '2023-09-16T12:29:35.840+0200',
              items: [
                {
                  field: 'Story Points',
                  fieldId: 'customfield_10034',
                  from: null,
                  fromString: null,
                  to: null,
                  toString: '2',
                },
              ],
            },
            {
              id: '10460',
              created: '2023-09-19T23:19:23.434+0200',
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
              id: '10461',
              created: '2023-09-19T23:19:25.654+0200',
              items: [
                {
                  field: 'Sprint',
                  fieldId: 'customfield_10020',
                  from: '18',
                  fromString: 'SCRUM Sprint 13',
                  to: '18, 20',
                  toString: 'SCRUM Sprint 13, SCRUM Sprint 15',
                },
              ],
            },
            {
              id: '10476',
              created: '2023-09-20T16:23:02.910+0200',
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
              id: '10479',
              created: '2023-09-20T17:43:10.967+0200',
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
              id: '10480',
              created: '2023-09-20T17:44:31.393+0200',
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
          ],
        },
        timeSpent: 4888483,
      },
      {
        id: '10041',
        key: 'SCRUM-39',
        fields: {
          summary:
            'supprimer du temps passé le temps passé par un ticket en En cours dans le sprint précédent',
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
          status: { id: '10004', name: 'Done', statusCategory: { id: 3, name: 'Done' } },
        },
        estimation: 3,
        changelog: {
          startAt: 0,
          maxResults: 19,
          total: 19,
          histories: [
            {
              id: '10344',
              created: '2023-09-14T14:20:20.612+0200',
              items: [
                {
                  field: 'summary',
                  fieldId: 'summary',
                  from: null,
                  fromString: 'test2',
                  to: null,
                  toString:
                    'remove from the time spent concerning the amount of time a ticket spent in In Progress in the previous board',
                },
              ],
            },
            {
              id: '10345',
              created: '2023-09-14T14:20:26.325+0200',
              items: [
                {
                  field: 'Story Points',
                  fieldId: 'customfield_10034',
                  from: null,
                  fromString: null,
                  to: null,
                  toString: '4',
                },
              ],
            },
            {
              id: '10348',
              created: '2023-09-14T14:21:33.755+0200',
              items: [
                {
                  field: 'summary',
                  fieldId: 'summary',
                  from: null,
                  fromString:
                    'remove from the time spent concerning the amount of time a ticket spent in In Progress in the previous board',
                  to: null,
                  toString:
                    'supprimer du temps passé concernant le temps passé par un ticket en En cours dans le tableau précédent',
                },
              ],
            },
            {
              id: '10349',
              created: '2023-09-14T14:21:46.851+0200',
              items: [
                {
                  field: 'summary',
                  fieldId: 'summary',
                  from: null,
                  fromString:
                    'supprimer du temps passé concernant le temps passé par un ticket en En cours dans le tableau précédent',
                  to: null,
                  toString:
                    'supprimer du temps passé le temps passé par un ticket en En cours dans le sprint précédent',
                },
              ],
            },
            {
              id: '10353',
              created: '2023-09-14T14:22:26.143+0200',
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
              id: '10354',
              created: '2023-09-14T14:22:26.332+0200',
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
              id: '10362',
              created: '2023-09-14T17:38:03.371+0200',
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
              id: '10419',
              created: '2023-09-16T12:26:12.939+0200',
              items: [
                {
                  field: 'Sprint',
                  fieldId: 'customfield_10020',
                  from: '16',
                  fromString: 'SCRUM Sprint 11',
                  to: '16, 18',
                  toString: 'SCRUM Sprint 11, SCRUM Sprint 13',
                },
              ],
            },
            {
              id: '10420',
              created: '2023-09-16T12:26:13.112+0200',
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
              id: '10434',
              created: '2023-09-16T12:30:41.928+0200',
              items: [
                {
                  field: 'Story Points',
                  fieldId: 'customfield_10034',
                  from: null,
                  fromString: '4',
                  to: null,
                  toString: '3',
                },
              ],
            },
            {
              id: '10462',
              created: '2023-09-19T23:19:47.945+0200',
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
              id: '10463',
              created: '2023-09-19T23:19:50.114+0200',
              items: [
                {
                  field: 'Sprint',
                  fieldId: 'customfield_10020',
                  from: '16, 18',
                  fromString: 'SCRUM Sprint 11, SCRUM Sprint 13',
                  to: '16, 18, 20',
                  toString: 'SCRUM Sprint 11, SCRUM Sprint 13, SCRUM Sprint 15',
                },
              ],
            },
            {
              id: '10481',
              created: '2023-09-20T17:45:30.578+0200',
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
              id: '10482',
              created: '2023-09-20T17:46:22.430+0200',
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
              id: '10483',
              created: '2023-09-20T17:46:26.871+0200',
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
              id: '10484',
              created: '2023-09-20T17:46:36.474+0200',
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
              id: '10488',
              created: '2023-09-20T19:39:25.731+0200',
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
              id: '10489',
              created: '2023-09-20T21:30:22.365+0200',
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
              id: '10490',
              created: '2023-09-20T21:30:23.215+0200',
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
          ],
        },
        timeSpent: 6718939,
      },
      {
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
          status: { id: '10004', name: 'Done', statusCategory: { id: 3, name: 'Done' } },
        },
        estimation: 3,
        changelog: {
          startAt: 0,
          maxResults: 15,
          total: 15,
          histories: [
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
              id: '10486',
              created: '2023-09-20T19:29:52.723+0200',
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
              id: '10487',
              created: '2023-09-20T19:39:23.758+0200',
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
          ],
        },
        timeSpent: 6765450,
      },
    ],
    actualIssues: [
      {
        id: '10054',
        key: 'SCRUM-52',
        fields: {
          summary: 'corriger le problème du SCRUM-15',
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
          status: { id: '10004', name: 'Done', statusCategory: { id: 3, name: 'Done' } },
        },
        estimation: 2,
        changelog: {
          startAt: 0,
          maxResults: 9,
          total: 9,
          histories: [
            {
              id: '10475',
              created: '2023-09-20T16:08:01.447+0200',
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
                  from: '3',
                  fromString: 'In Progress',
                  to: '10004',
                  toString: 'Done',
                },
              ],
            },
            {
              id: '10474',
              created: '2023-09-20T13:47:15.271+0200',
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
              id: '10473',
              created: '2023-09-20T13:46:53.171+0200',
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
              id: '10472',
              created: '2023-09-20T13:46:50.896+0200',
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
              id: '10457',
              created: '2023-09-19T23:17:17.307+0200',
              items: [
                {
                  field: 'Sprint',
                  fieldId: 'customfield_10020',
                  from: '18',
                  fromString: 'SCRUM Sprint 13',
                  to: '18, 20',
                  toString: 'SCRUM Sprint 13, SCRUM Sprint 15',
                },
              ],
            },
            {
              id: '10456',
              created: '2023-09-19T23:17:15.366+0200',
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
              id: '10429',
              created: '2023-09-16T12:29:04.350+0200',
              items: [
                {
                  field: 'Story Points',
                  fieldId: 'customfield_10034',
                  from: null,
                  fromString: null,
                  to: null,
                  toString: '2',
                },
              ],
            },
            {
              id: '10428',
              created: '2023-09-16T12:29:04.315+0200',
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
              id: '10418',
              created: '2023-09-16T12:26:00.198+0200',
              items: [
                {
                  field: 'Sprint',
                  fieldId: 'customfield_10020',
                  from: '',
                  fromString: '',
                  to: '18',
                  toString: 'SCRUM Sprint 13',
                },
              ],
            },
          ],
        },
        timeSpent: 4428451,
      },
      {
        id: '10055',
        key: 'SCRUM-53',
        fields: {
          summary: 'séparer les tickets réalisés des non réalisées lors des sprints précedents',
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
          status: { id: '10004', name: 'Done', statusCategory: { id: 3, name: 'Done' } },
        },
        estimation: 2,
        changelog: {
          startAt: 0,
          maxResults: 8,
          total: 8,
          histories: [
            {
              id: '10480',
              created: '2023-09-20T17:44:31.393+0200',
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
              id: '10479',
              created: '2023-09-20T17:43:10.967+0200',
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
              id: '10476',
              created: '2023-09-20T16:23:02.910+0200',
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
              id: '10461',
              created: '2023-09-19T23:19:25.654+0200',
              items: [
                {
                  field: 'Sprint',
                  fieldId: 'customfield_10020',
                  from: '18',
                  fromString: 'SCRUM Sprint 13',
                  to: '18, 20',
                  toString: 'SCRUM Sprint 13, SCRUM Sprint 15',
                },
              ],
            },
            {
              id: '10460',
              created: '2023-09-19T23:19:23.434+0200',
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
              id: '10433',
              created: '2023-09-16T12:29:35.840+0200',
              items: [
                {
                  field: 'Story Points',
                  fieldId: 'customfield_10034',
                  from: null,
                  fromString: null,
                  to: null,
                  toString: '2',
                },
              ],
            },
            {
              id: '10432',
              created: '2023-09-16T12:29:29.019+0200',
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
              id: '10425',
              created: '2023-09-16T12:28:41.174+0200',
              items: [
                {
                  field: 'Sprint',
                  fieldId: 'customfield_10020',
                  from: '',
                  fromString: '',
                  to: '18',
                  toString: 'SCRUM Sprint 13',
                },
              ],
            },
          ],
        },
        timeSpent: 4888483,
      },
      {
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
          status: { id: '10004', name: 'Done', statusCategory: { id: 3, name: 'Done' } },
        },
        estimation: 3,
        changelog: {
          startAt: 0,
          maxResults: 15,
          total: 15,
          histories: [
            {
              id: '10487',
              created: '2023-09-20T19:39:23.758+0200',
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
              id: '10486',
              created: '2023-09-20T19:29:52.723+0200',
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
        timeSpent: 6765450,
      },
    ],
  },
];
