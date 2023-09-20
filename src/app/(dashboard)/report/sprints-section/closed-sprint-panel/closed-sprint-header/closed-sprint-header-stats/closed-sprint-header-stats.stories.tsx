import type { Meta, StoryObj } from '@storybook/react';

import ClosedSprintHeaderStats from '.';
import { seedClosedSprintBreakThrough } from '@/seeds/sprint';

const meta = {
  component: ClosedSprintHeaderStats,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof ClosedSprintHeaderStats>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    sprint: seedClosedSprintBreakThrough,
  },
};
