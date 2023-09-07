import type { Meta, StoryObj } from '@storybook/react';

import FullCalendarApp from '.';

const meta = {
  component: FullCalendarApp,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof FullCalendarApp>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
