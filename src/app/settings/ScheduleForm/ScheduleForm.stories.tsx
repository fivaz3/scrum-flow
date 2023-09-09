import type { Meta, StoryObj } from '@storybook/react';

import ScheduleForm from './index';

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
    members: [
      { accountId: '1', displayName: 'Alice', emailAddress: 'alice@gmail.com' },
      { accountId: '2', displayName: 'Bob', emailAddress: 'bob@gmail.com' },
      { accountId: '3', displayName: 'Charlie', emailAddress: 'charlie@gmail.com' },
    ],
  },
};
