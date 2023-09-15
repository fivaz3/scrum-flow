import type { Meta, StoryObj } from '@storybook/react';

import EmptyState from '.';

const meta = {
  component: EmptyState,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: 'No Project',
    description: "You haven't created a project yet",
  },
};
