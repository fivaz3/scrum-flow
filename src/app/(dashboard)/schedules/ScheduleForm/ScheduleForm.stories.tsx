import type { Meta, StoryObj } from '@storybook/react';

import ScheduleForm from './index';
import { members } from '@/seeds/members';

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
    onSubmit: () => Promise.resolve(console.log('form submitted')),
    onDelete: () => Promise.resolve(console.log('form closed')),
    selectedSchedule: null,
    members,
  },
};
