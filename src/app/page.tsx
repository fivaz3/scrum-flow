import { Card, Title } from '@tremor/react';
import Search from '@/components/Search';

export const dynamic = 'force-dynamic';

export default async function IndexPage() {
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Sprint Actuel</Title>
      <Search />
      <Card className="mt-6">{/*<IssueTable issues={issues} />*/}</Card>
    </main>
  );
}
