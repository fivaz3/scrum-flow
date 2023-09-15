import type { Meta, StoryObj } from '@storybook/react';

import NavBar from './index';

const meta = {
  component: NavBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof NavBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    session: null,
    pathname: null,
  },
};
