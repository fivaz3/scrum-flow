import type { Meta, StoryObj } from '@storybook/react';

import Banner from '.';

const meta = {
  component: Banner,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Banner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    path: '/settings',
    linkMessage: 'Go to Settings',
    children: <p>Test</p>,
  },
};
