import type { Meta, StoryObj } from '@storybook/react';

import MobileMenu from './index';
import { session } from '@/seeds/session';
import { navigation } from '@/app/nav/nav-bar/nav-bar.service';

const meta = {
  component: MobileMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof MobileMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedIn: Story = {
  args: {
    pathname: navigation[1].href,
    session,
  },
};

export const LoggedOut: Story = {
  args: {
    pathname: navigation[0].href,
    session: null,
  },
};
