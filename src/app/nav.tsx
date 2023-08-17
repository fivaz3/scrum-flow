import Navbar from './navbar';
import { getServerSession } from 'next-auth/next';

export default async function Nav() {
  const session = await getServerSession();

  return (
    <div>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <Navbar user={session?.user} />
    </div>
  );
}
