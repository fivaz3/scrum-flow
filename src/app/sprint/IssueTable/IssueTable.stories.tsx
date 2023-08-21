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
        name: 'issue1',
      },
      {
        id: '2',
        name: 'issue2',
      },
    ],
  },
};
