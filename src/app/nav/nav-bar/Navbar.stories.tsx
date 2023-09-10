import type { Meta, StoryObj } from '@storybook/react';

import Navbar from '.';

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
    session: {
      user: {
        name: 'Stefane Fivaz',
        email: 'stefan@fivaz.com',
        image:
          'https://secure.gravatar.com/avatar/b849ec8b33cee3be64f5d9abee4b4845?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FSF-6.png',
      },
      expires: '1693244366871',
    },
  },
};

export const LoggedOut: Story = {
  args: {
    session: null,
  },
};
