import { Card, Text, Title } from '@tremor/react';
import Search from '@/components/Search';

export const dynamic = 'force-dynamic';

export default async function IndexPage() {
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
