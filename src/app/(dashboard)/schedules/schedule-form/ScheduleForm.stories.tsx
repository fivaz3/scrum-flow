import type { Meta, StoryObj } from '@storybook/react';

import ScheduleForm from './index';
import { members } from '@/seeds/member';

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

export const Primary: Story = {
  args: {
    onSubmit: (data) => {
      console.log('data', data);
      const startDateTime = new Date(`${data.startDate}T${data.startTime}`);
      const endDateTime = new Date(`${data.endDate}T${data.endTime}`);
      console.log('startDateTime', startDateTime.toISOString());
      console.log('endDateTime', endDateTime.toISOString());
      return Promise.resolve(console.log('form submitted'));
    },
    onDelete: () => Promise.resolve(console.log('form closed')),
    selectedSchedule: null,
    members: members,
  },
};
