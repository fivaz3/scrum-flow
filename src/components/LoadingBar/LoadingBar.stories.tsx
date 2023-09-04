import type { Meta, StoryObj } from '@storybook/react';

import LoadingBar from '.';

const meta = {
  component: LoadingBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  decorators: [
    (Story) => (
      <div className="w-96 h-96 flex justify-center items-center">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof LoadingBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
