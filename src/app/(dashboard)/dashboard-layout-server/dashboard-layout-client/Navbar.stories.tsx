import type { Meta, StoryObj } from '@storybook/react';

import DashboardLayoutClient from './index';
import { session } from '@/seeds/session';

const meta = {
  component: DashboardLayoutClient,
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
} satisfies Meta<typeof DashboardLayoutClient>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedIn: Story = {
  args: {
    session,
    children: <p>Test</p>,
  },
};
