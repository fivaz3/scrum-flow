import './globals.css';

import { ReactNode, Suspense } from 'react';
import NextAuthProvider from '@/app/api/auth/[...nextauth]/context';

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className="h-full">
        <Suspense fallback={<div>Chargement...</div>}>
          <NextAuthProvider>{children}</NextAuthProvider>
        </Suspense>
      </body>
    </html>
  );
}
