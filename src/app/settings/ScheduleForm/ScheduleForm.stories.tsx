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
      { id: '1', name: 'Alice' },
      { id: '2', name: 'Bob' },
      { id: '3', name: 'Charlie' },
    ],
  },
};
