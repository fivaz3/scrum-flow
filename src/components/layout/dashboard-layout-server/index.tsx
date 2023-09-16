import { getServerSession } from 'next-auth/next';
import authOptions from '@/app/api/auth/[...nextauth]/auth-options';
import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import DashboardLayoutClient from '@/components/layout/dashboard-layout-server/dashboard-layout-client';

interface DashboardLayoutServerProps {
  children: ReactNode;
}

export default async function DashboardLayoutServer({ children }: DashboardLayoutServerProps) {
  const session = await getServerSession(authOptions);

  if (!session?.access_token) {
    console.error("Unauthorized access detected, you don't have an access token");
    redirect('/api/auth/signin');
  }

  return <DashboardLayoutClient session={session}>{children}</DashboardLayoutClient>;
}
