import type { Meta, StoryObj } from '@storybook/react';

import SprintAccuracyChart from '.';
import { seedClosedSprintsBreakThrough } from '@/seeds/sprint';

const meta = {
  component: SprintAccuracyChart,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof SprintAccuracyChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    sprints: seedClosedSprintsBreakThrough,
  },
};
