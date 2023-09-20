import type { Meta, StoryObj } from '@storybook/react';

import SprintsSectionSkeleton from './index';
import { Story } from '@storybook/blocks';

const meta = {
  component: SprintsSectionSkeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  decorators: [
    (Story) => (
      <div className="flex flex-col gap-5">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SprintsSectionSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
