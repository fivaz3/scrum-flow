'use client';
import { usePathname } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { Session } from 'next-auth';
import NavBarCore from '@/app/nav-server/nav-bar/nav-bar-core';
import { getPrivateLinks } from '@/app/nav-server/nav-bar/nav-bar.service';

export interface NavbarProps {
  session: Session;
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
        <NavBarCore session={session} pathname={pathname} />
        <header className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-white">
              {getPrivateLinks().find((path) => path.href == pathname)?.name || 'Dashboard'}
            </h1>
          </div>
        </header>
      </div>

      <main className="-mt-32">
        <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">{children}</div>
        </div>
      </main>
    </div>
  );
}
