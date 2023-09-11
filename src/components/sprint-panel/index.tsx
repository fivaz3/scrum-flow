'use client';

import { Text, Title } from '@tremor/react';
import { format, parseISO } from 'date-fns';
import { Sprint } from '@/lib/sprint.service';

export interface SprintPanelProps {
  sprint: Sprint;
}

export default function SprintPanel({ sprint }: SprintPanelProps) {
  return (
    <div>
      <Title className="text-2xl">Sprint Actuel: {sprint.name}</Title>
      <Text>Commence le : {format(parseISO(sprint.startDate), 'dd/MM/yyyy à HH:mm')}</Text>
      <Text>Fini le :{format(parseISO(sprint.endDate), 'dd/MM/yyyy à HH:mm')}</Text>
    </div>
  );
}
