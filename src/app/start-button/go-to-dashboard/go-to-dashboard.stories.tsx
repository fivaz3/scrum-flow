import type { Meta, StoryObj } from '@storybook/react';

import GoToDashboardButton from './index';

const meta = {
  component: GoToDashboardButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof GoToDashboardButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
