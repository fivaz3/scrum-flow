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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="-ml-2 mr-2 flex items-center md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <MobileMenuButton open={open} />
                  </Disclosure.Button>
                </div>
                <Logo />
                <NavLinks isLogged={!!session?.user} pathname={pathname} />
              </div>
              <UserInfo session={session} />
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
