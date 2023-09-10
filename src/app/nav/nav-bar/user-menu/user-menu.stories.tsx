import type { Meta, StoryObj } from '@storybook/react';

import UserMenu from './index';
import { session } from '@/seeds/session';

const meta = {
  component: UserMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof UserMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedIn: Story = {
  args: {
    session,
  },
};

export const LoggedOut: Story = {
  args: {
    session: null,
  },
};
