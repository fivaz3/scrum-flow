import type { Meta, StoryObj } from '@storybook/react';

import BoardSelector from './index';

const meta = {
  component: BoardSelector,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof BoardSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    boards: [
      {
        id: 1,
        name: 'board 1',
        location: { name: 'board 1', projectId: 1, avatarURI: '1' },
      },
    ],
    boardId: '1',
  },
};
