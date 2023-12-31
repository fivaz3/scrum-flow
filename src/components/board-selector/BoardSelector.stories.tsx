import type { Meta, StoryObj } from '@storybook/react';

import BoardSelector from './index';
import { seedBoards } from '@/seeds/board';

const meta = {
  component: BoardSelector,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof BoardSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    boards: seedBoards,
    currentBoard: seedBoards[0],
  },
};
