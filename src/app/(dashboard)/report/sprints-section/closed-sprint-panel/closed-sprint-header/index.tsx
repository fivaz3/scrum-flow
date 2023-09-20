import { parseISO, format } from 'date-fns';
import { formatSprintDuration } from '@/app/(dashboard)/report/sprints-section/closed-sprint-panel/closed-sprint-header/closed-sprint-header-stats/service';
import ClosedSprintHeaderStats from '@/app/(dashboard)/report/sprints-section/closed-sprint-panel/closed-sprint-header/closed-sprint-header-stats';
import { SprintBreakThrough } from '@/app/(dashboard)/report/sprints-section/service';

interface ClosedSprintHeaderProps {
  sprint: SprintBreakThrough;
}

// TODO tell how much a point represent for each sprint and right now

export default async function ClosedSprintHeader({ sprint }: ClosedSprintHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-5">
      <div>
        <h3 className="text-lg leading-6 font-medium text-gray-700 mb-2">Sprint: {sprint.name}</h3>
        <div className="text-sm text-gray-500">
          <div>Début : {format(parseISO(sprint.startDate), 'dd/MM/yyyy à HH:mm')}</div>
          <div>Fin :{format(parseISO(sprint.endDate), 'dd/MM/yyyy à HH:mm')}</div>
          <div>Duration: {formatSprintDuration(sprint)}</div>
        </div>
      </div>
      <ClosedSprintHeaderStats sprint={sprint} />
    </div>
  );
}
