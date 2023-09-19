import type { Meta, StoryObj } from '@storybook/react';

import CalendarCore from './index';
import { seedSchedules } from '@/seeds/schedule';
import { seedMembers } from '@/seeds/member';

const meta = {
  component: CalendarCore,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof CalendarCore>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    members: seedMembers,
    schedules: seedSchedules,
    setShowDialog: () => console.log('setShowDialog'),
    setSelectedSchedule: () => console.log('setShowDialog'),
    selectedMemberIds: seedMembers.map((member) => member.accountId),
  },
};
