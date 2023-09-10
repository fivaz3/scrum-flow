import type { Meta, StoryObj } from '@storybook/react';

import MobileMenu from './index';
import { session } from '@/seeds/session';
import { navigation } from '@/app/nav/nav-bar/nav-bar.service';
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

function MobileMenuWrapper({ session }: { session: Session | null }) {
  return (
    /* Render a `div` for the root `Disclosure` component */
    <Disclosure as="div">
      {/* Render a `Fragment` for the `Disclosure.Button` component */}
      <MobileMenu pathname={navigation[1].href} session={session}></MobileMenu>

      {/* Render a `ul` for the `Disclosure.Panel` component */}
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

export const LoggedOut: Story = {
  args: {
    pathname: navigation[0].href,
    session: null,
  },
  render: () => <MobileMenuWrapper session={null}></MobileMenuWrapper>,
};
