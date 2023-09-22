import type { Meta, StoryObj } from '@storybook/react';

import Select from '.';
import { seedBoards } from '@/seeds/board';
import React from 'react';
import SelectItem from '@/components/select/select-item';

const meta = {
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    placeholder: 'Placeholder',
    label: 'Select',
    disabled: false,
    value: seedBoards[0].id,
    onChange: (value) => console.log('new value: ' + value),
    children: (
      <>
        {seedBoards.map((board) => (
          <SelectItem key={board.id} value={board.id}>
            <div className="flex items-center">
              <img
                src={board.location.avatarURI}
                alt="member"
                className="flex-shrink-0 h-6 w-6 rounded-full"
              />
              <span className={'font-normal ml-3 block truncate'}>{board.name}</span>
            </div>
          </SelectItem>
        ))}
      </>
    ),
  },
};
