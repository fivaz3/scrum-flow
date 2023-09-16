import Main from '../main';
import NavBarSkeleton from '@/components/layout/dashboard-layout-fallback/nav-bar-skeleton';
import Loading from '@/components/loading';

interface DashBoardLayoutFallbackProps {}

export default function DashboardLayoutFallback({}: DashBoardLayoutFallbackProps) {
  return (
    <div className="min-h-full">
      <div className="bg-gray-800">
        <NavBarSkeleton></NavBarSkeleton>
      </div>
      <Main pageTitle="Dashboard">
        <Loading className="h-96" />
      </Main>
    </div>
  );
}
