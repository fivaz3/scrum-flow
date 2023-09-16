import type { Meta, StoryObj } from '@storybook/react';

import StartButton from './index';

const meta = {
  component: StartButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof StartButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
