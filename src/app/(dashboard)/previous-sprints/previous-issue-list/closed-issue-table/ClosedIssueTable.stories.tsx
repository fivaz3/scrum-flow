import type { Meta, StoryObj } from '@storybook/react';

import ClosedIssueTable from './index';

const meta = {
  component: ClosedIssueTable,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof ClosedIssueTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ToDo: Story = {
  args: {
    label: 'To Do',
    issues: [
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
        timeSpent: 5000,
      },
    ],
  },
};

export const Doing: Story = {
  args: {
    label: 'Doing',
    issues: [
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
        timeSpent: 5000,
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
        timeSpent: 5000,
      },
    ],
  },
};

export const Done: Story = {
  args: {
    label: 'Done',
    issues: [
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
        timeSpent: 5000,
      },
    ],
  },
};
