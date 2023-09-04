import type { Meta, StoryObj } from '@storybook/react';

import SprintPanelLoading from './index';

const meta = {
  component: SprintPanelLoading,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof SprintPanelLoading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
