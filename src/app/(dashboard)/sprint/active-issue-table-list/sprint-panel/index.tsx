import { format, parseISO } from 'date-fns';
import { ActiveSprint } from '@/lib/sprint.service';
import React from 'react';

interface SprintPanelProps {
  sprint: ActiveSprint;
}

export default function SprintPanel({ sprint }: SprintPanelProps) {
  return (
    <div>
      <h3 className="text-lg leading-6 font-medium text-gray-700 mb-2">Sprint: {sprint.name}</h3>
      <div className="text-sm text-gray-500">
        <div>Début : {format(parseISO(sprint.startDate), 'dd/MM/yyyy à HH:mm')}</div>
        <div>Fin :{format(parseISO(sprint.endDate), 'dd/MM/yyyy à HH:mm')}</div>
      </div>
    </div>
  );
}
