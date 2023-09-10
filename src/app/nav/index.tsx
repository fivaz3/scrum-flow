import { getServerSession } from 'next-auth/next';
import authOptions from '@/app/api/auth/[...nextauth]/auth-options';
import Navbar from '@/app/nav/nav-bar';
import { Suspense } from 'react';
import NavBar from '@/app/nav/nav-bar';

export default async function Nav() {
  const session = await getServerSession(authOptions);

  return (
    <Suspense fallback={<Navbar session={null} />}>
      <NavBar session={session} />
    </Suspense>
  );
}
