import type { Meta, StoryObj } from '@storybook/react';

import SelectItem from '.';
import React from 'react';
import { Story } from '@storybook/blocks';
import { seedBoards } from '@/seeds/board';
import Select from '@/components/select';

const meta = {
  component: SelectItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof SelectItem>;

export default meta;
type Story = StoryObj<typeof meta>;

function SelectItemWrapper() {
  return (
    <Select label="select" value={seedBoards[0].id} onChange={() => console.log('value changed')}>
      <SelectItem value={seedBoards[0].id}>
        <div className="flex items-center">
          <img
            src={seedBoards[0].location.avatarURI}
            alt="member"
            className="flex-shrink-0 h-6 w-6 rounded-full"
          />
          <span className={'font-normal ml-3 block truncate'}>{seedBoards[0].name}</span>
        </div>
      </SelectItem>
    </Select>
  );
}

export const Primary: Story = {
  args: {
    value: seedBoards[0].id,
    children: 'test',
  },
  render: () => <SelectItemWrapper />,
};
