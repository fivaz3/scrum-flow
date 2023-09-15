'use client';
import { usePathname } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { Session } from 'next-auth';
import Main from '../../../../components/layout/main';
import { getPrivateLinks } from '@/app/(dashboard)/dashboard-layout-server/dashboard-layout-client/nav-bar.service';
import NavBar from '@/app/(dashboard)/dashboard-layout-server/dashboard-layout-client/nav-bar';

interface DashboardLayoutClientProps {
  session: Session;
  children: ReactNode;
}
// Navbar component
export default function DashboardLayoutClient({ session, children }: DashboardLayoutClientProps) {
  useEffect(() => {
    if (session?.error === 'RefreshAccessTokenError') {
      // noinspection JSIgnoredPromiseFromCall
      signIn(); // Force sign in to hopefully resolve error
    }
  }, [session]);

  const pathname = usePathname();

  const pageTitle = getPrivateLinks().find((path) => path.href == pathname)?.name || 'Dashboard';

  return (
    <div className="min-h-full">
      <div className="bg-gray-800">
        <NavBar session={session} pathname={pathname} />
      </div>
      <Main pageTitle={pageTitle}>{children}</Main>
    </div>
  );
}
