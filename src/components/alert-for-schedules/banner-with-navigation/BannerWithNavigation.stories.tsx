import type { Meta, StoryObj } from '@storybook/react';

import Banner from './index';
import { navigation } from '@/components/layout/dashboard-layout-server/dashboard-layout-client/nav-bar.service';

const meta = {
  component: Banner,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Banner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    path: navigation[3].href,
    linkMessage: 'Go to Settings',
    children: <p>Test</p>,
  },
};
