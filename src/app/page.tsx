import { Card, Title, Text } from '@tremor/react';
import Search from '@/components/Search';
import { getServerSession } from 'next-auth/next';
import authOptions from '@/app/api/auth/[...nextauth]/auth-options';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

async function getData() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized access detected' }, { status: 401 });
  }

  const res = await fetch('https://api.atlassian.com/oauth/token/accessible-resources', {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + session.accessToken,
      'Content-Type': 'application/json',
    },
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function IndexPage() {
  // const issues = await GET();
  // // console.log(issues.json());
  const data = await getData();
  console.log(data);

  const start_at = new Date().toLocaleString('fr-FR');
  const date_end = new Date();
  date_end.setDate(date_end.getDate() + 14);
  const end_at = date_end.toLocaleString('fr-FR');

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      {/*<pre>{JSON.stringify(issues, null, 2)}</pre>*/}
      <Title>Sprint Actuel</Title>
      <Text>Commence le {start_at}</Text>
      <Text>Fini le {end_at}</Text>
      <Search />
      <Card className="mt-6">{/*<IssueTable issues={issues} />*/}</Card>
    </main>
  );
}
