import { calculateAccuracy, getSumOfEstimations } from '@/app/(dashboard)/report/sprint-effort';
import { SprintBreakThrough } from '@/app/(dashboard)/report/sprints-section/service';

interface ClosedSprintHeaderStatsProps {
  sprint: SprintBreakThrough;
}

export default function ClosedSprintHeaderStats({ sprint }: ClosedSprintHeaderStatsProps) {
  const estimatedEffort = getSumOfEstimations(sprint.estimatedIssues);
  const actualEffort = getSumOfEstimations(sprint.actualIssues);

  return (
    <div className="text-right text-sm text-gray-500">
      <div>
        Story points: (réalisé / estimé){' '}
        <span className="font-bold">
          {actualEffort} / {estimatedEffort}
        </span>
      </div>
      <div>précision: {calculateAccuracy(estimatedEffort, actualEffort)} %</div>
      {/*TODO add this later*/}
      {/*<div>temps par points {getTimeByPoints(actualEffort, sprint)}</div>*/}
    </div>
  );
}
