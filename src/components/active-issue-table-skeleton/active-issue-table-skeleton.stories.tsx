import type { Meta, StoryObj } from '@storybook/react';

import ActiveIssueTableSkeleton from '.';

const meta = {
  component: ActiveIssueTableSkeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof ActiveIssueTableSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: 'To Do',
  },
};
