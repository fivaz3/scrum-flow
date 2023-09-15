import type { Meta, StoryObj } from '@storybook/react';

import LayoutCore from './index';

const meta = {
  component: LayoutCore,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof LayoutCore>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    pageTitle: 'Dashboard',
    children: <div>Content</div>,
  },
};
