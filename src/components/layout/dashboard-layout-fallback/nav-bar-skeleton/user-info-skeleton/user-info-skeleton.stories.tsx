import type { Meta, StoryObj } from '@storybook/react';

import UserInfoSkeleton from './index';
import { seedSession } from '@/seeds/session';

const meta = {
  component: UserInfoSkeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof UserInfoSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedIn: Story = {
  args: {
    session: seedSession,
  },
};
