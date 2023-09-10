import type { Meta, StoryObj } from '@storybook/react';

import LogoMark from '.';

const meta = {
  component: LogoMark,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof LogoMark>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
