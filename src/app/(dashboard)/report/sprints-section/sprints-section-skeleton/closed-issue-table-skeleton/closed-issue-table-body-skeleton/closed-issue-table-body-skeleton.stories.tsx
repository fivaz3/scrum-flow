import type { Meta, StoryObj } from '@storybook/react';

import ClosedIssueTableBodySkeleton from './index';

const meta = {
  component: ClosedIssueTableBodySkeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  decorators: [
    (Story) => (
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-3 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <Story />
              </table>
            </div>
          </div>
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof ClosedIssueTableBodySkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
