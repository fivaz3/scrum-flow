import { IssueWithTimeSpent } from '@/lib/issue/issue.service';

export const seedToDoIssues: IssueWithTimeSpent[] = [
  {
    id: '2',
    key: 'SCRUM-1',
    fields: {
      summary: 'issue 2',
      assignee: null,
      status: {
        id: '1',
        name: 'To Do',
        statusCategory: {
          id: 1,
          name: 'To Do',
        },
      },
    },
    estimation: 3,
    timeSpent: 500000,
  },
  {
    id: '2',
    key: 'SCRUM-1',
    fields: {
      summary: 'issue 2',
      assignee: null,
      status: {
        id: '1',
        name: 'To Do',
        statusCategory: {
          id: 1,
          name: 'To Do',
        },
      },
    },
    estimation: 3,
    timeSpent: 500000,
  },
  {
    id: '2',
    key: 'SCRUM-1',
    fields: {
      summary: 'issue 2',
      assignee: null,
      status: {
        id: '1',
        name: 'To Do',
        statusCategory: {
          id: 1,
          name: 'To Do',
        },
      },
    },
    estimation: 3,
    timeSpent: 500000,
  },
];

export const seedDoingIssues: IssueWithTimeSpent[] = [
  {
    id: '3',
    key: 'SCRUM-1',
    fields: {
      summary: 'issue 3',
      assignee: null,
      status: {
        id: '1',
        name: 'In Progress',
        statusCategory: {
          id: 1,
          name: 'In Progress',
        },
      },
    },
    estimation: 8,
    timeSpent: 500000,
  },
  {
    id: '1',
    key: 'SCRUM-1',
    fields: {
      summary: 'issue 1',
      assignee: null,
      status: {
        id: '1',
        name: 'Done',
        statusCategory: {
          id: 1,
          name: 'Done',
        },
      },
    },
    estimation: 5,
    timeSpent: 500000,
  },

  {
    id: '1',
    key: 'SCRUM-1',
    fields: {
      summary: 'issue 1',
      assignee: null,
      status: {
        id: '1',
        name: 'Done',
        statusCategory: {
          id: 1,
          name: 'Done',
        },
      },
    },
    estimation: 5,
    timeSpent: 500000,
  },
];

export const seedDoneIssues: IssueWithTimeSpent[] = [
  {
    id: '4',
    key: 'SCRUM-1',
    fields: {
      summary: 'issue 4',
      assignee: null,
      status: {
        id: '4',
        name: 'Done',
        statusCategory: {
          id: 3,
          name: 'Done',
        },
      },
    },
    estimation: 8,
    timeSpent: 500000,
  },
  {
    id: '4',
    key: 'SCRUM-1',
    fields: {
      summary: 'issue 4',
      assignee: null,
      status: {
        id: '4',
        name: 'Done',
        statusCategory: {
          id: 3,
          name: 'Done',
        },
      },
    },
    estimation: 8,
    timeSpent: 500000,
  },
  {
    id: '4',
    key: 'SCRUM-1',
    fields: {
      summary: 'issue 4',
      assignee: null,
      status: {
        id: '4',
        name: 'Done',
        statusCategory: {
          id: 3,
          name: 'Done',
        },
      },
    },
    estimation: 8,
    timeSpent: 500000,
  },
];

export const seedIssues = [...seedToDoIssues, ...seedDoingIssues, ...seedDoneIssues];
