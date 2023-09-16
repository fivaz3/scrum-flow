import {
  calculateAccuracy,
  getActualEffort,
  getEstimatedEffort,
} from '@/app/(dashboard)/report/sprint-effort';
import { ClosedSprint } from '@/lib/sprint.service';
import { getTimeByPoints } from '@/app/(dashboard)/report/closed-sprint-panel/closed-sprint-header/closed-sprint-header-stats/service';

interface ClosedSprintHeaderStatsProps {
  sprint: ClosedSprint;
  boardId: number;
  accessToken: string;
  cloudId: string;
}

export default async function ClosedSprintHeaderStats({
  boardId,
  sprint,
  accessToken,
  cloudId,
}: ClosedSprintHeaderStatsProps) {
  const estimatedEffort = await getEstimatedEffort(boardId, sprint, accessToken, cloudId);
  const actualEffort = await getActualEffort(boardId, sprint, accessToken, cloudId);

  return (
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
  );
}
