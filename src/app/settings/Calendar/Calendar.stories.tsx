import type { Meta, StoryObj } from '@storybook/react';

import Calendar from './index';

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
      { accountId: '1', displayName: 'Alice', emailAddress: 'alice@gmail.com' },
      { accountId: '2', displayName: 'Bob', emailAddress: 'bob@gmail.com' },
      { accountId: '3', displayName: 'Charlie', emailAddress: 'charlie@gmail.com' },
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
