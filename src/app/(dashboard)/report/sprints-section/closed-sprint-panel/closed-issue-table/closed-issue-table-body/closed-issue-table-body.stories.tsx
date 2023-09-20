import type { Meta, StoryObj } from '@storybook/react';

import ClosedIssueTableBody from '.';
import { seedClosedSprint } from '@/seeds/sprint';
import { seedDoingIssues, seedDoneIssues } from '@/seeds/issue';

const meta = {
  component: ClosedIssueTableBody,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof ClosedIssueTableBody>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    sprint: { ...seedClosedSprint, estimatedIssues: seedDoingIssues, actualIssues: seedDoneIssues },
  },
};
