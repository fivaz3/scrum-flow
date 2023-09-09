import type { Meta, StoryObj } from '@storybook/react';

import ScheduleForm from './index';

const meta = {
  component: ScheduleForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof ScheduleForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    onSubmit: () => Promise.resolve(console.log('form submitted')),
    onDelete: () => Promise.resolve(console.log('form closed')),
    selectedSchedule: null,
    members: [
      {
        accountId: '1',
        displayName: 'Alice',
        emailAddress: 'alice@gmail.com',
        avatarUrls: {
          '48x48':
            'https://secure.gravatar.com/avatar/b849ec8b33cee3be64f5d9abee4b4845?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FSF-6.png',
          '24x24':
            'https://secure.gravatar.com/avatar/b849ec8b33cee3be64f5d9abee4b4845?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FSF-6.png',
          '16x16':
            'https://secure.gravatar.com/avatar/b849ec8b33cee3be64f5d9abee4b4845?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FSF-6.png',
          '32x32':
            'https://secure.gravatar.com/avatar/b849ec8b33cee3be64f5d9abee4b4845?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FSF-6.png',
        },
      },
      {
        accountId: '2',
        displayName: 'Bob',
        emailAddress: 'bob@gmail.com',
        avatarUrls: {
          '48x48':
            'https://secure.gravatar.com/avatar/b849ec8b33cee3be64f5d9abee4b4845?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FSF-6.png',
          '24x24':
            'https://secure.gravatar.com/avatar/b849ec8b33cee3be64f5d9abee4b4845?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FSF-6.png',
          '16x16':
            'https://secure.gravatar.com/avatar/b849ec8b33cee3be64f5d9abee4b4845?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FSF-6.png',
          '32x32':
            'https://secure.gravatar.com/avatar/b849ec8b33cee3be64f5d9abee4b4845?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FSF-6.png',
        },
      },
      {
        accountId: '3',
        displayName: 'Charlie',
        emailAddress: 'charlie@gmail.com',
        avatarUrls: {
          '48x48':
            'https://secure.gravatar.com/avatar/b849ec8b33cee3be64f5d9abee4b4845?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FSF-6.png',
          '24x24':
            'https://secure.gravatar.com/avatar/b849ec8b33cee3be64f5d9abee4b4845?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FSF-6.png',
          '16x16':
            'https://secure.gravatar.com/avatar/b849ec8b33cee3be64f5d9abee4b4845?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FSF-6.png',
          '32x32':
            'https://secure.gravatar.com/avatar/b849ec8b33cee3be64f5d9abee4b4845?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FSF-6.png',
        },
      },
    ],
  },
};
