import type { Meta, StoryObj } from '@storybook/react';

import PredictionClient from './index';
import { seedBoards } from '@/seeds/board';

const meta = {
  component: PredictionClient,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof PredictionClient>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    board: seedBoards[0],
    accessToken: '',
    cloudId: '',
  },
};
