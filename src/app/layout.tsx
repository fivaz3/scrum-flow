import './globals.css';

import { ReactNode } from 'react';

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className="h-full">
        {/*<Suspense fallback={<div>Root Layout Chargement...</div>}>*/}
        {/*  <NextAuthProvider>*/}
        {children}
        {/*</NextAuthProvider>*/}
        {/*</Suspense>*/}
      </body>
    </html>
  );
}
