import type { Meta, StoryObj } from '@storybook/react';

import NavBarSkeleton from './index';

const meta = {
  component: NavBarSkeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof NavBarSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
