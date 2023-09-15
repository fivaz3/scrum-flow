import { Title } from '@tremor/react';
import { parseISO, format } from 'date-fns';
import { ClosedSprint } from '@/lib/sprint.service';
import { formatSprintDuration } from '@/app/(dashboard)/report/closed-sprint-panel/closed-sprint-header/closed-sprint-header-stats/service';
import ClosedSprintHeaderStats from '@/app/(dashboard)/report/closed-sprint-panel/closed-sprint-header/closed-sprint-header-stats';
import { Suspense } from 'react';
import ClosedSprintHeaderSkeleton from '@/app/(dashboard)/report/closed-sprint-panel/closed-sprint-header/closed-sprint-header-skeleton';

interface ClosedSprintHeaderProps {
  sprint: ClosedSprint;
  boardId: number | string;
  accessToken: string;
  cloudId: string;
}

// TODO tell how much a point represent for each sprint and right now

export default async function ClosedSprintHeader({
  boardId,
  sprint,
  accessToken,
  cloudId,
}: ClosedSprintHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-5">
      <div>
        <Title className="text-2xl">Sprint: {sprint.name}</Title>
        <div className="text-sm text-gray-500">
          <div>Début : {format(parseISO(sprint.startDate), 'dd/MM/yyyy à HH:mm')}</div>
          <div>Fin :{format(parseISO(sprint.endDate), 'dd/MM/yyyy à HH:mm')}</div>
          <div>Duration: {formatSprintDuration(sprint)}</div>
        </div>
      </div>
      <Suspense fallback={<ClosedSprintHeaderSkeleton />}>
        <ClosedSprintHeaderStats
          sprint={sprint}
          boardId={boardId}
          accessToken={accessToken}
          cloudId={cloudId}
        />
      </Suspense>
    </div>
  );
}
