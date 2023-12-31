import type { Meta, StoryObj } from '@storybook/react';

import NavBarLogo from './index';

const meta = {
  component: NavBarLogo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof NavBarLogo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
