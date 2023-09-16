import type { Meta, StoryObj } from '@storybook/react';

import DashboardLayoutClient from './index';
import { session } from '@/seeds/session';
import { navigation } from '@/app/(dashboard)/dashboard-layout-server/dashboard-layout-client/nav-bar.service';

const meta = {
  component: DashboardLayoutClient,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: navigation[3].href,
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
