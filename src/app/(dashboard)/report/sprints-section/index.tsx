import ClosedSprintPanel from '@/app/(dashboard)/report/sprints-section/closed-sprint-panel';
import { getClosedSprints } from '@/lib/sprint.service';
import { getClosedSprintsBreakThrough } from '@/app/(dashboard)/report/sprints-section/service';
import SprintAccuracyChart from '@/app/(dashboard)/report/sprints-section/sprint-accuracy-chart';
import { Board } from '@/lib/board.service';

interface SprintsSectionProps {
  board: Board;
  accessToken: string;
  cloudId: string;
  maxResults: string;
}

export default async function SprintsSection({
  board,
  maxResults,
  accessToken,
  cloudId,
}: SprintsSectionProps) {
  console.log('maxResults', maxResults);
  const sprints = await getClosedSprints(board.id, accessToken, cloudId, {
    startAt: '0',
    maxResults,
  });

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
