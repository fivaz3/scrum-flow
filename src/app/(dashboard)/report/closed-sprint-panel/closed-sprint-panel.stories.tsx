import type { Meta, StoryObj } from '@storybook/react';

import ClosedSprintPanel from './index';
import { closedSprint } from '@/seeds/sprint';

const meta = {
  component: ClosedSprintPanel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof ClosedSprintPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    boardId: 1,
    sprint: closedSprint,
    accessToken: '',
    cloudId: '',
  },
};
