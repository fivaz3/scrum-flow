import type { Meta, StoryObj } from '@storybook/react';

import ScheduleLoading from '@/app/(dashboard)/schedules/loading';

const meta = {
  component: ScheduleLoading,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof ScheduleLoading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
