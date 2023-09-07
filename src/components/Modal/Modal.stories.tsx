import type { Meta, StoryObj } from '@storybook/react';

import Modal from '.';

const meta = {
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    isOpen: true,
    setOpen: () => console.log('modal closed'),
    children: <p>Modal</p>,
  },
};
