'use client'; // Error components must be Client Components

import { Card, Title, Text } from '@tremor/react';

export default function Error({ error }: { error: Error & { digest?: string } }) {
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Card>
        <Title className="text-2xl">Il y a eu un problème</Title>
        <Text>{error.message}</Text>
      </Card>
    </main>
  );
}
