import './globals.css';

import Nav from './nav';

import { ReactNode, Suspense } from 'react';

export const metadata = {
  title: 'Next.js 13 + PlanetScale + NextAuth + Tailwind CSS',
  description:
    'A user admin dashboard configured with Next.js, PlanetScale, NextAuth, Tailwind CSS, TypeScript, ESLint, and Prettier.',
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className="h-full">
        <Suspense>
          <Nav />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
