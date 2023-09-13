import type { Meta, StoryObj } from '@storybook/react';

import NavBarCore from './index';

const meta = {
  component: NavBarCore,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof NavBarCore>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    session: null,
    pathname: null,
  },
};
