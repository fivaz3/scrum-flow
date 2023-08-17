import { getServerSession } from 'next-auth/next';
import Navbar from '@/components/Navbar';
import authOptions from '@/app/api/auth/[...nextauth]/auth-options';

export default async function Nav() {
  const session = await getServerSession(authOptions);
  console.log(session);

  return (
    <div>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <Navbar user={session?.user} />
    </div>
  );
}
