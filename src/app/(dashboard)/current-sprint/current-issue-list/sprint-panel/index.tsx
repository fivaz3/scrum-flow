import { Title } from '@tremor/react';
import { format, parseISO } from 'date-fns';
import { Sprint } from '@/lib/sprint.service';

export interface SprintPanelProps {
  sprint: Sprint;
}

export default function SprintPanel({ sprint }: SprintPanelProps) {
  return (
    <div>
      <Title className="text-2xl">Sprint: {sprint.name}</Title>
      <div className="text-sm text-gray-500">
        Début : {format(parseISO(sprint.startDate), 'dd/MM/yyyy à HH:mm')}
      </div>
      <div className="text-sm text-gray-500">
        Fin :{format(parseISO(sprint.endDate), 'dd/MM/yyyy à HH:mm')}
      </div>
    </div>
  );
}
