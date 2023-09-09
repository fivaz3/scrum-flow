import type { Meta, StoryObj } from '@storybook/react';

import Calendar from '.';

const meta = {
  component: Calendar,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    members: [
      { id: '1', name: 'Alice' },
      { id: '2', name: 'Bob' },
      { id: '3', name: 'Charlie' },
    ],
    currentSchedules: [
      {
        id: '3',
        memberId: '1',
        startDate: '2023-09-08',
        endDate: '2023-09-08',
        startTime: '14:00',
        endTime: '17:00',
        isRecurring: false,
        daysOfWeek: [],
      },
    ],
  },
};
