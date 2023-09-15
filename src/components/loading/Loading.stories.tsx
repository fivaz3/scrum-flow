import type { Meta, StoryObj } from '@storybook/react';

import LoadingBar from '.';

const meta = {
  component: LoadingBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof LoadingBar>;

export default meta;
type Story1 = StoryObj<typeof meta>;

export const Primary: Story1 = {
  args: {},
};
