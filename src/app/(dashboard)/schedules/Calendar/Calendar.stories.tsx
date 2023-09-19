import type { Meta, StoryObj } from '@storybook/react';

import Calendar from './index';
import { seedMembers } from '@/seeds/member';
import { seedSchedules } from '@/seeds/schedule';

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
    members: seedMembers,
    currentSchedules: seedSchedules,
    accessToken: '',
    cloudId: '',
  },
};
