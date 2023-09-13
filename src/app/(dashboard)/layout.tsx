import { ReactNode, Suspense } from 'react';
import NavBarServer from '../nav-server';
import NavBarFallback from '@/app/nav-server/nav-bar-fallback';

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<NavBarFallback />}>
      <NavBarServer>{children}</NavBarServer>
    </Suspense>
  );
}
