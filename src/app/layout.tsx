import './globals.css';

import Nav from './nav';

import { ReactNode, Suspense } from 'react';
import NextAuthProvider from '@/app/api/auth/[...nextauth]/context';

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className="h-full">
        <Suspense fallback={<div>Chargement...</div>}>
          <NextAuthProvider>
            <Nav />
            <main className="p-4 md:p-10 mx-auto max-w-7xl">{children}</main>
          </NextAuthProvider>
        </Suspense>
      </body>
    </html>
  );
}
