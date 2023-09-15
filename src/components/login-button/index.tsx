'use client';
import { signIn } from 'next-auth/react';
import Image from 'next/image';

interface LoginButtonProps {}

export default function LoginButton({}: LoginButtonProps) {
  return (
    <button
      onClick={() => signIn('atlassian', { callbackUrl: '/current-sprint' })}
      className="gap-3 w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
      <Image src="mark-gradient-white-atlassian.svg" alt="atlassian logo" width={32} height={32} />
      Se connecter avec Jira
    </button>
  );
}
