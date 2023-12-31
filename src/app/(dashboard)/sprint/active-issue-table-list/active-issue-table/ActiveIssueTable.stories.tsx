import type { Meta, StoryObj } from '@storybook/react';

import ActiveIssueTable from './index';
import { seedDoingIssues, seedDoneIssues, seedToDoIssues } from '@/seeds/issue';

const meta = {
  component: ActiveIssueTable,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof ActiveIssueTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ToDo: Story = {
  args: {
    label: 'To Do',
    issues: seedToDoIssues,
  },
};

export const Doing: Story = {
  args: {
    label: 'Doing',
    issues: seedDoingIssues,
  },
};

export const Done: Story = {
  args: {
    label: 'Done',
    issues: seedDoneIssues,
  },
};
