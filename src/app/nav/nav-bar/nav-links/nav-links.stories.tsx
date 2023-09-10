import type { Meta, StoryObj } from '@storybook/react';

import NavLinks from './index';
import { navigation } from '@/app/nav/nav-bar/nav-bar.service';

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

export const IsLogged: Story = {
  args: {
    isLogged: true,
    pathname: navigation[0].href,
  },
};

export const Other: Story = {
  args: {
    isLogged: true,
    pathname: navigation[1].href,
  },
};
