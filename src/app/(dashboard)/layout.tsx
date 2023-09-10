import { ReactNode, Suspense } from 'react';
import Nav from '@/app/(dashboard)/nav';

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <Nav>{children}</Nav>
    </Suspense>
  );
}
