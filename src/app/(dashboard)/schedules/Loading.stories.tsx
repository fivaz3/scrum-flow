import type { Meta, StoryObj } from '@storybook/react';

import ScheduleSkeleton from '@/app/(dashboard)/schedules/loading';

const meta = {
  component: ScheduleSkeleton,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof ScheduleSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
