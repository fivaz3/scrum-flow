import type { Meta, StoryObj } from '@storybook/react';

import MobileMenu from './index';

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

export const Open: Story = {
  args: {
    open: true,
  },
};

export const Close: Story = {
  args: {
    open: false,
  },
};
