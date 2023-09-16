import { Board } from '@/lib/board.service';

export const boards: Board[] = [
  {
    id: 2,
    name: 'SCRUM board',
    location: {
      projectId: 10001,
      avatarURI:
        'https://api.atlassian.com/ex/jira/02f2c8a2-aa9d-44b5-b655-00ac25b37f56/rest/api/2/universal_avatar/view/type/project/avatar/10401?size=small',
      name: 'Scrum (SCRUM)',
    },
  },
  {
    id: 3,
    name: 'TES board',
    location: {
      projectId: 10002,
      avatarURI:
        'https://api.atlassian.com/ex/jira/02f2c8a2-aa9d-44b5-b655-00ac25b37f56/rest/api/2/universal_avatar/view/type/project/avatar/10425?size=small',
      name: 'Test2 (TES)',
    },
  },
  {
    id: 4,
    name: 'S1 board',
    location: {
      projectId: 10003,
      avatarURI:
        'https://api.atlassian.com/ex/jira/02f2c8a2-aa9d-44b5-b655-00ac25b37f56/rest/api/2/universal_avatar/view/type/project/avatar/10414?size=small',
      name: 'Scrum 1 (S1)',
    },
  },
];
