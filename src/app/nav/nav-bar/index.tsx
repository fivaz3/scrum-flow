'use client';
import { usePathname } from 'next/navigation';
import { Disclosure } from '@headlessui/react';
import { Fragment, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { Session } from 'next-auth';
import Logo from '@/app/nav/nav-bar/logo';
import NavLinks from '@/app/nav/nav-bar/nav-links';
import MobileMenuButton from '@/app/nav/nav-bar/mobile-menu-button';
import MobileMenu from '@/app/nav/nav-bar/mobile-menu';
import UserInfo from '@/app/nav/nav-bar/user-info';

export interface NavbarProps {
  session: Session | null;
}
// Navbar component
export default function Navbar({ session }: NavbarProps) {
  useEffect(() => {
    if (session?.error === 'RefreshAccessTokenError') {
      // noinspection JSIgnoredPromiseFromCall
      signIn(); // Force sign in to hopefully resolve error
    }
  }, [session]);

  const pathname = usePathname();

  return (
    <Disclosure as="nav" className="bg-white shadow-sm">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <Logo />
              <NavLinks pathname={pathname} />
              <UserInfo session={session} />
              <div className="-mr-2 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2">
                  <MobileMenuButton open={open} />
                </Disclosure.Button>
              </div>
            </div>
          </div>
          <Disclosure.Panel className="sm:hidden">
            <MobileMenu pathname={pathname} session={session} />
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
