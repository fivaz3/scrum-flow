import { getServerSession } from 'next-auth/next';
import authOptions from '@/app/api/auth/[...nextauth]/auth-options';
import NavBar from '@/app/(dashboard)/nav/nav-bar';
import { ReactNode } from 'react';

export default async function Nav({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    // <Suspense fallback={<Navbar session={null} />}>
    <NavBar session={session}>{children}</NavBar>
    // </Suspense>
  );
}
