import { Card, Title } from '@tremor/react';

export const dynamic = 'force-dynamic';

export default async function IndexPage() {
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Dashboard de votre projet</Title>
      <Card className="mt-6"></Card>
    </main>
  );
}
