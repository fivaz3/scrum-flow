import type { Meta, StoryObj } from '@storybook/react';

import Navbar from './index';
import { session } from '@/seeds/session';

const meta = {
  component: Navbar,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/settings',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedIn: Story = {
  args: {
    session,
    children: <p>Test</p>,
  },
};

export const LoggedOut: Story = {
  args: {
    session: null,
    children: <p>Test</p>,
  },
};
