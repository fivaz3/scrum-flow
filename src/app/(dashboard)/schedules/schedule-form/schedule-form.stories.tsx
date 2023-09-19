import type { Meta, StoryObj } from '@storybook/react';

import ScheduleForm from './index';
import { seedMembers } from '@/seeds/member';
import { seedSchedules } from '@/seeds/schedule';

const meta = {
  component: ScheduleForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof ScheduleForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Add: Story = {
  args: {
    members: seedMembers,
    onSubmit: (data) => {
      console.log('data', data);
      return Promise.resolve(console.log('form submitted'));
    },
    onDelete: () => Promise.resolve(console.log('schedule deleted')),
    selectedSchedule: null,
  },
};

export const Edit: Story = {
  args: {
    members: seedMembers,
    onSubmit: (data) => {
      console.log('data', data);
      return Promise.resolve(console.log('form submitted'));
    },
    onDelete: () => Promise.resolve(console.log('schedule deleted')),
    selectedSchedule: seedSchedules[0],
  },
};
