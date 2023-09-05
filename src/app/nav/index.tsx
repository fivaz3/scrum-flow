import { getServerSession } from 'next-auth/next';
import authOptions from '@/app/api/auth/[...nextauth]/auth-options';
import Navbar from '@/app/nav/nav-bar';

export default async function Nav() {
  const session = await getServerSession(authOptions);

  return <Navbar session={session} />;
}
