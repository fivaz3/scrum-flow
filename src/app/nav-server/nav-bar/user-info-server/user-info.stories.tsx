import type { Meta, StoryObj } from '@storybook/react';

import UserInfoServer from './index';
import { session } from '@/seeds/session';

const meta = {
  component: UserInfoServer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof UserInfoServer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedIn: Story = {
  args: {
    session,
  },
};
