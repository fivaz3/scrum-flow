import { Title } from '@tremor/react';
import {
  parseISO,
  intervalToDuration,
  formatDuration,
  format,
  differenceInMilliseconds,
} from 'date-fns';
import { Sprint } from '@/lib/sprint.service';
import {
  calculateAccuracy,
  getActualEffort,
  getEstimatedEffort,
} from '@/app/(dashboard)/report/sprint-effort';
import { fr } from 'date-fns/locale';

function formatSprintDuration(sprint: Sprint): string {
  const duration = intervalToDuration({
    start: parseISO(sprint.startDate),
    end: parseISO(sprint.endDate),
  });

  if (duration.hours === 23 && duration.minutes === 59) {
    duration.days = (duration.days || 0) + 1;
    duration.hours = undefined;
    duration.minutes = undefined;
  }

  return formatDuration(duration, { format: ['days', 'hours', 'minutes'], locale: fr });
}

function getTimeByPoints(points: number, sprint: Sprint): string {
  const sprintDurationInMilliseconds = differenceInMilliseconds(
    parseISO(sprint.endDate),
    parseISO(sprint.startDate)
  );

  const pointDurationInMilliseconds = sprintDurationInMilliseconds / points;

  const pointDuration = intervalToDuration({ start: 0, end: pointDurationInMilliseconds });

  return formatDuration(pointDuration, { format: ['days', 'hours', 'minutes'], locale: fr });
}

interface PreviousSprintHeaderProps {
  sprint: Sprint;
  boardId: number | string;
  accessToken: string;
  cloudId: string;
}

export default async function PreviousSprintHeader({
  boardId,
  sprint,
  accessToken,
  cloudId,
}: PreviousSprintHeaderProps) {
  const estimatedEffort = await getEstimatedEffort(boardId, sprint, accessToken, cloudId);
  const actualEffort = await getActualEffort(boardId, sprint, accessToken, cloudId);

  return (
    <div className="flex justify-between items-center">
      <div>
        <Title className="text-2xl">Sprint: {sprint.name}</Title>
        <div className="text-sm text-gray-500">
          <div>Début : {format(parseISO(sprint.startDate), 'dd/MM/yyyy à HH:mm')}</div>
          <div>Fin :{format(parseISO(sprint.endDate), 'dd/MM/yyyy à HH:mm')}</div>
          <div>Duration: {formatSprintDuration(sprint)}</div>
        </div>
      </div>
      <div className="text-right text-sm text-gray-500">
        <div>
          Story points: (réalisé / estimé){' '}
          <span className="font-bold">
            {actualEffort} / {estimatedEffort}
          </span>
        </div>
        <div>précision: {calculateAccuracy(estimatedEffort, actualEffort)} %</div>
        <div>temps par points {getTimeByPoints(actualEffort, sprint)}</div>
      </div>
    </div>
  );
}
