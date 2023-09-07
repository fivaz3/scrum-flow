import type { Meta, StoryObj } from '@storybook/react';

import DevList from '.';

const meta = {
  component: DevList,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof DevList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    employees: [],
    addScheduleEvent: (employeeId) => console.log('opening schedule form for user: ' + employeeId),
  },
};
