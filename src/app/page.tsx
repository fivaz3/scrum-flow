import { Card, Title, Text } from '@tremor/react';
import Search from './search';
import UsersTable from './table';

export const dynamic = 'force-dynamic';

export default async function IndexPage() {
  const users = [
    {
      id: 1,
      name: '',
      username: '',
      email: '',
    },
  ];

  const start_at = new Date().toLocaleString('fr-FR');
  const date_end = new Date();
  date_end.setDate(date_end.getDate() + 14);
  const end_at = date_end.toLocaleString('fr-FR');

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Sprint Actuel</Title>
      <Text>Commence le {start_at}</Text>
      <Text>Fini le {end_at}</Text>
      <Search />
      <Card className="mt-6">
        <UsersTable users={users} />
      </Card>
    </main>
  );
}
