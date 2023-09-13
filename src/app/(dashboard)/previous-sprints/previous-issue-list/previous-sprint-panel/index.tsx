import { Text, Title } from '@tremor/react';
import { format, parseISO } from 'date-fns';
import { Sprint } from '@/lib/sprint.service';
import {
  calculateAccuracy,
  getActualEffort,
  getEstimatedEffort,
} from '@/app/(dashboard)/report/sprint-effort';

export interface PreviousSprintPanelProps {
  sprint: Sprint;
  boardId: number | string;
  accessToken: string;
  cloudId: string;
}

export default async function PreviousSprintPanel({
  boardId,
  sprint,
  accessToken,
  cloudId,
}: PreviousSprintPanelProps) {
  const estimatedEffort = await getEstimatedEffort(boardId, sprint, accessToken, cloudId);
  const actualEffort = await getActualEffort(boardId, sprint, accessToken, cloudId);
  const accuracy = calculateAccuracy(estimatedEffort, actualEffort);

  return (
    <div className="flex justify-between items-center">
      <div>
        <Title className="text-2xl">Sprint: {sprint.name}</Title>
        <Text>Début : {format(parseISO(sprint.startDate), 'dd/MM/yyyy à HH:mm')}</Text>
        <Text>Fin :{format(parseISO(sprint.endDate), 'dd/MM/yyyy à HH:mm')}</Text>
      </div>
      <div className="text-right">
        <div>
          Story points: (réalisé / estimé){' '}
          <span className="font-bold">
            {actualEffort} / {estimatedEffort}
          </span>
        </div>
        <div>précision: {accuracy} %</div>
      </div>
    </div>
  );
}
