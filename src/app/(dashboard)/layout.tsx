import { ReactNode, Suspense } from 'react';
import Nav from '../nav';

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <Nav>{children}</Nav>
    </Suspense>
  );
}
