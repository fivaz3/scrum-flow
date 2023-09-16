import { getServerSession } from 'next-auth/next';
import authOptions from '@/app/api/auth/[...nextauth]/auth-options';
import GoToDashboardButton from '@/app/start-button/go-to-dashboard';
import LoginButton from '@/app/start-button/login-button';

interface StartButtonProps {}

export default async function StartButton({}: StartButtonProps) {
  const session = await getServerSession(authOptions);

  return session ? <GoToDashboardButton /> : <LoginButton />;
}
