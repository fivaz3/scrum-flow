import type { Meta, StoryObj } from '@storybook/react';

import SprintAccuracyChart2Client from './index';
import { sprintAccuracyData } from '@/seeds/chart';

const meta = {
  component: SprintAccuracyChart2Client,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof SprintAccuracyChart2Client>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    data: sprintAccuracyData,
  },
};
