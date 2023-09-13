import { Text, Title } from '@tremor/react';
import { format, parseISO } from 'date-fns';
import { Sprint } from '@/lib/sprint.service';

export interface SprintPanelProps {
  sprint: Sprint;
}

export default function SprintPanel({ sprint }: SprintPanelProps) {
  return (
    <div>
      <Title className="text-2xl">Sprint: {sprint.name}</Title>
      <Text>Début : {format(parseISO(sprint.startDate), 'dd/MM/yyyy à HH:mm')}</Text>
      <Text>Fin :{format(parseISO(sprint.endDate), 'dd/MM/yyyy à HH:mm')}</Text>
    </div>
  );
}
