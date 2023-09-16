import type { Meta, StoryObj } from '@storybook/react';

import MobileMenu from './index';
import { session } from '@/seeds/session';
import { navigation } from '@/app/(dashboard)/dashboard-layout-server/dashboard-layout-client/nav-bar.service';
import { Disclosure } from '@headlessui/react';
import { Session } from 'next-auth';

const meta = {
  component: MobileMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof MobileMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

function MobileMenuWrapper({ session }: { session: Session }) {
  return (
    <Disclosure as="div">
      <MobileMenu pathname={navigation[1].href} session={session}></MobileMenu>

      <Disclosure.Panel as="ul">
        <li>HTML</li>
        <li>CSS</li>
        <li>JavaScript</li>
      </Disclosure.Panel>
    </Disclosure>
  );
}
export const LoggedIn: Story = {
  args: {
    pathname: navigation[1].href,
    session,
  },
  render: () => <MobileMenuWrapper session={session}></MobileMenuWrapper>,
};
