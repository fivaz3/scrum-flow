'use client';
import { usePathname } from 'next/navigation';
import { Disclosure } from '@headlessui/react';
import { Fragment, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { Session } from 'next-auth';
import Logo from '@/app/nav/nav-bar/logo';
import NavLinks from '@/app/nav/nav-bar/nav-links';
import UserMenu from '@/app/nav/nav-bar/user-menu';
import MobileMenuButton from '@/app/nav/nav-bar/mobile-menu-button';
import MobileMenu from '@/app/nav/nav-bar/mobile-menu';

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
              <UserMenu session={session} />
              <MobileMenuButton open={open} />
            </div>
          </div>
          <MobileMenu pathname={pathname} session={session} />
        </>
      )}
    </Disclosure>
  );
}
