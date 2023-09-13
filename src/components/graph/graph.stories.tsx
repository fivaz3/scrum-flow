import type { Meta, StoryObj } from '@storybook/react';

import Graph from '.';
import { sprintAccuracyData } from '@/seeds/chart';

const meta = {
  component: Graph,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Graph>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    data: sprintAccuracyData,
  },
};
