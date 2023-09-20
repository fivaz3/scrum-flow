import type { Meta, StoryObj } from '@storybook/react';

import ClosedSprintPanel from './index';
import { seedClosedSprintBreakThrough } from '@/seeds/sprint';

const meta = {
  component: ClosedSprintPanel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof ClosedSprintPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    sprint: seedClosedSprintBreakThrough,
  },
};
