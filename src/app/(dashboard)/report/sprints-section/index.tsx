import ClosedSprintPanel from '@/app/(dashboard)/report/sprints-section/closed-sprint-panel';
import { getClosedSprints } from '@/lib/sprint.service';
import { getClosedSprintsBreakThrough } from '@/app/(dashboard)/report/sprints-section/service';
import SprintAccuracyChart from '@/app/(dashboard)/report/sprints-section/sprint-accuracy-chart';
import { Board } from '@/lib/board.service';

interface SprintsSectionProps {
  board: Board;
  accessToken: string;
  cloudId: string;
}

export default async function SprintsSection({ board, accessToken, cloudId }: SprintsSectionProps) {
  const sprints = await getClosedSprints(board.id, accessToken, cloudId);

  const sprintsBreakThrough = await getClosedSprintsBreakThrough(
    sprints,
    board,
    accessToken,
    cloudId
  );

  return (
    <>
      <SprintAccuracyChart sprints={sprintsBreakThrough} />

      {sprintsBreakThrough.map((sprint) => (
        <ClosedSprintPanel key={sprint.id} sprint={sprint} />
      ))}
    </>
  );
}
