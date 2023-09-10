'use client';
import { usePathname } from 'next/navigation';
import { Disclosure } from '@headlessui/react';
import { Fragment, ReactNode, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { Session } from 'next-auth';
import Logo from '@/app/(dashboard)/nav/nav-bar/logo';
import NavLinks from '@/app/(dashboard)/nav/nav-bar/nav-links';
import MobileMenuButton from '@/app/(dashboard)/nav/nav-bar/mobile-menu-button';
import MobileMenu from '@/app/(dashboard)/nav/nav-bar/mobile-menu';
import UserInfo from '@/app/(dashboard)/nav/nav-bar/user-info';
import { navigation } from '@/app/(dashboard)/nav/nav-bar/nav-bar.service';

export interface NavbarProps {
  session: Session | null;
  children: ReactNode;
}
// Navbar component
export default function Navbar({ session, children }: NavbarProps) {
  useEffect(() => {
    if (session?.error === 'RefreshAccessTokenError') {
      // noinspection JSIgnoredPromiseFromCall
      signIn(); // Force sign in to hopefully resolve error
    }
  }, [session]);

  const pathname = usePathname();

  return (
    <div className="min-h-full">
      <div className="bg-gray-800 pb-32">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="border-b border-gray-700">
                  <div className="flex items-center justify-between h-16 px-4 sm:px-0">
                    <div className="flex items-center">
                      <Logo />
                      <NavLinks isLogged={!!session?.user} pathname={pathname} />
                    </div>
                    <UserInfo session={session} />
                    {/* Mobile menu button */}
                    <div className="-mr-2 flex md:hidden">
                      <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                        <MobileMenuButton open={open} />
                      </Disclosure.Button>
                    </div>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="border-b border-gray-700 md:hidden">
                <MobileMenu pathname={pathname} session={session} />
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <header className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-white">
              {navigation.find((path) => path.href == pathname)?.name || 'Dashboard'}
            </h1>
          </div>
        </header>
      </div>

      <main className="-mt-32">
        <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
          {/* Replace with your content */}
          <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
            {children}
            {/*<div className="border-4 border-dashed border-gray-200 rounded-lg h-96" />*/}
          </div>
          {/* /End replace */}
        </div>
      </main>
    </div>
  );
}
