import type { Meta, StoryObj } from '@storybook/react';

import NavLinks from './index';
import { navigation } from '@/components/layout/dashboard-layout-server/dashboard-layout-client/nav-bar.service';

const meta = {
  component: NavLinks,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof NavLinks>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Home: Story = {
  args: {
    pathname: navigation[0].href,
  },
};

export const Other: Story = {
  args: {
    pathname: navigation[1].href,
  },
};
