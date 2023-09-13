import { getServerSession } from 'next-auth/next';
import authOptions from '@/app/api/auth/[...nextauth]/auth-options';
import NavBar from '@/app/nav-server/nav-bar';
import { ReactNode } from 'react';
import { redirect } from 'next/navigation';

export default async function NavBarServer({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session?.access_token) {
    console.error("Unauthorized access detected, you don't have an access token");
    redirect('/api/auth/signin');
  }

  return <NavBar session={session}>{children}</NavBar>;
}
