import { getServerSession } from 'next-auth/next';
import Navbar from '@/components/Navbar';
import authOptions from '@/app/api/auth/[...nextauth]/auth-options';

export default async function Nav() {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <Navbar session={session} />
    </div>
  );
}
