import type { Meta, StoryObj } from '@storybook/react';

import SprintAccuracyChartClient from './index';
import { sprintAccuracyData } from '@/seeds/chart';

const meta = {
  component: SprintAccuracyChartClient,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof SprintAccuracyChartClient>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    data: sprintAccuracyData,
  },
};
