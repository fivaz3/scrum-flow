import type { Meta, StoryObj } from '@storybook/react';

import ClosedIssueTable from './index';
import { seedClosedSprintBreakThrough } from '@/seeds/sprint';

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

export const Primary: Story = {
  args: {
    sprint: seedClosedSprintBreakThrough,
  },
};
