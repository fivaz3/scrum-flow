import type { Meta, StoryObj } from '@storybook/react';

import ActiveIssueTableListSkeleton from './index';

const meta = {
  component: ActiveIssueTableListSkeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof ActiveIssueTableListSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
