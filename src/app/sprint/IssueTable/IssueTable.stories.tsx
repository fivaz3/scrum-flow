import type { Meta, StoryObj } from '@storybook/react';

import IssueTable from '.';

const meta = {
  component: IssueTable,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof IssueTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    issues: [
      {
        id: '1',
        fields: {
          summary: 'issue 1',
          estimation: 5,
          status: {
            id: '1',
            name: 'Done',
          },
        },
      },
      {
        id: '2',
        fields: {
          summary: 'issue 2',
          estimation: 3,
          status: {
            id: '1',
            name: 'To Do',
          },
        },
      },
      {
        id: '3',
        fields: {
          summary: 'issue 3',
          estimation: 8,
          status: {
            id: '1',
            name: 'To Doing',
          },
        },
      },
    ],
  },
};
