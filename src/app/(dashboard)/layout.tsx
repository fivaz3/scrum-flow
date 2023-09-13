import { ReactNode, Suspense } from 'react';
import Nav from '../nav';
import { ArrowPathIcon } from '@heroicons/react/24/solid';

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  // TODO make a empty Nav as a fallback
  return (
    <Suspense
      fallback={
        <div className="h-full grid justify-center items-center">
          <div className="flex justify-center items-center gap-3">
            <ArrowPathIcon className="animate-spin h-5 w-5" />
            <div className="">Chargement...</div>
          </div>
        </div>
      }>
      <Nav>{children}</Nav>
    </Suspense>
  );
}
