import type { Meta, StoryObj } from '@storybook/react';

import Modal from '.';
import ScheduleForm from '@/app/(dashboard)/schedules/schedule-form';
import { seedMembers } from '@/seeds/member';

const meta = {
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    isOpen: true,
    setOpen: () => console.log('modal closed'),
    children: (
      <ScheduleForm
        members={seedMembers}
        onSubmit={(data) => {
          console.log('data', data);
          return Promise.resolve(console.log('form submitted'));
        }}
        onDelete={() => Promise.resolve(console.log('schedule deleted'))}
        selectedSchedule={null}
        isLoading={null}
      />
    ),
  },
};
