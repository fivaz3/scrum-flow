import type { Meta, StoryObj } from '@storybook/react';

import ClosedIssueTableBodySkeleton from './index';

const meta = {
  component: ClosedIssueTableBodySkeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof ClosedIssueTableBodySkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

function ClosedIssueTableBodySkeletonWrapper({}: {}) {
  return (
    <table>
      <ClosedIssueTableBodySkeleton></ClosedIssueTableBodySkeleton>
    </table>
  );
}

export const Primary: Story = {
  args: {},
  render: () => <ClosedIssueTableBodySkeletonWrapper></ClosedIssueTableBodySkeletonWrapper>,
};
