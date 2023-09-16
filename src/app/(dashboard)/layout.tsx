import { ReactNode, Suspense } from 'react';
import DashboardLayoutServer from '../../components/layout/dashboard-layout-server';
import DashboardLayoutFallback from '../../components/layout/dashboard-layout-fallback';

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<DashboardLayoutFallback />}>
      <DashboardLayoutServer>{children}</DashboardLayoutServer>
    </Suspense>
  );
}
