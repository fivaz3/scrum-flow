import type { Meta, StoryObj } from '@storybook/react';

import SprintsSectionSkeleton from './index';

const meta = {
  component: SprintsSectionSkeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof SprintsSectionSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
