import { getServerSession } from 'next-auth/next';
import Navbar from '@/components/Navbar';

export default async function Nav() {
  const session = await getServerSession();

  return (
    <div>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <Navbar user={session?.user} />
    </div>
  );
}
