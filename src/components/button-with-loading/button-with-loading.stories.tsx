import type { Meta, StoryObj } from '@storybook/react';

import ButtonWithLoading from '.';

const meta = {
  component: ButtonWithLoading,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof ButtonWithLoading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Red: Story = {
  args: {
    color: 'red',
    children: 'Example',
  },
};

export const Indigo: Story = {
  args: {
    color: 'indigo',
    children: 'Example',
  },
};

export const RedLoading: Story = {
  args: {
    color: 'red',
    isLoading: true,
    children: 'Example',
  },
};
export const IndigoLoading: Story = {
  args: {
    color: 'indigo',
    isLoading: true,
    children: 'Example',
  },
};

export const RedDisabled: Story = {
  args: {
    color: 'red',
    disabled: true,
    children: 'Example',
  },
};

export const IndigoDisabled: Story = {
  args: {
    color: 'indigo',
    disabled: true,
    children: 'Example',
  },
};
