import type { Meta, StoryObj } from '@storybook/react';

import MembersList from './index';
import { members } from '@/seeds/members';

const meta = {
  component: MembersList,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof MembersList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    members,
    selectedMemberIds: [],
    handleMemberSelect: () => console.log('member was selected'),
    openForm: () => console.log('opening schedule form'),
  },
};
