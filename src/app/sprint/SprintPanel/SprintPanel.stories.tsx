import type { Meta, StoryObj } from '@storybook/react';

import SprintPanel from './index';

const meta = {
  component: SprintPanel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof SprintPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    currentSprint: {
      id: 1,
      state: 'active',
      name: 'Scrum 1',
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      originBoardId: 2,
    },
  },
};
