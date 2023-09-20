import type { Meta, StoryObj } from '@storybook/react';

import SprintAccuracyChartSkeleton from './index';

const meta = {
  component: SprintAccuracyChartSkeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof SprintAccuracyChartSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
