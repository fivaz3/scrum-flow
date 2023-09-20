import type { Meta, StoryObj } from '@storybook/react';

import ClosedIssueTableSkeleton from './index';

const meta = {
  component: ClosedIssueTableSkeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof ClosedIssueTableSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
