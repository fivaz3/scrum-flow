import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import authOptions from '@/app/api/auth/[...nextauth]/auth-options';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized access detected' }, { status: 401 });
  }

  const res = await fetch('https://api.atlassian.com/oauth/token/accessible-resources', {
    cache: 'no-store',
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + session.access_token,
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json();

  return NextResponse.json({ data });
}
