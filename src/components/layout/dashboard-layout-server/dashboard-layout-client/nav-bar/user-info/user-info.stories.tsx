import type { Meta, StoryObj } from '@storybook/react';

import UserInfo from './index';
import { seedSession } from '@/seeds/session';

const meta = {
  component: UserInfo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof UserInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedIn: Story = {
  args: {
    session: seedSession,
  },
};
