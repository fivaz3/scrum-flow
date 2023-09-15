import type { Meta, StoryObj } from '@storybook/react';

import DashBoardLayoutFallback from './index';

const meta = {
  component: DashBoardLayoutFallback,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof DashBoardLayoutFallback>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: <div>Content</div>,
  },
};
