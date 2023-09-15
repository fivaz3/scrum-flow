import { ReactNode, Suspense } from 'react';
import DashboardLayoutServer from './dashboard-layout-server';
import DashboardLayoutFallback from '@/app/(dashboard)/dashboard-layout-fallback';

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<DashboardLayoutFallback />}>
      <DashboardLayoutServer>{children}</DashboardLayoutServer>
    </Suspense>
  );
}
