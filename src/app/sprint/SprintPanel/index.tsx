'use client';

import { Text, Title } from '@tremor/react';
import { format, parseISO } from 'date-fns';
import { Sprint } from '@/lib/sprint.service';

export interface SprintPanelProps {
  currentSprint: Sprint;
}

export default function SprintPanel({ currentSprint }: SprintPanelProps) {
  return (
    <div>
      <Title className="text-2xl">Sprint Actuel: {currentSprint.name}</Title>
      <Text>Commence le : {format(parseISO(currentSprint.startDate), 'dd/MM/yyyy à HH:mm')}</Text>
      <Text>Fini le :{format(parseISO(currentSprint.endDate), 'dd/MM/yyyy à HH:mm')}</Text>
    </div>
  );
}
