import type { Meta, StoryObj } from '@storybook/react';

import ClosedSprintHeaderSkeleton from './index';

const meta = {
  component: ClosedSprintHeaderSkeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof ClosedSprintHeaderSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
