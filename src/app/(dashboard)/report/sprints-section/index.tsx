import ClosedSprintPanel from '@/app/(dashboard)/report/sprints-section/closed-sprint-panel';
import { ClosedSprint } from '@/lib/sprint.service';
import { getClosedSprintsBreakThrough } from '@/app/(dashboard)/report/sprints-section/service';
import SprintAccuracyChart from '@/app/(dashboard)/report/sprints-section/sprint-accuracy-chart';

interface SprintsSectionProps {
  sprints: ClosedSprint[];
  boardId: number;
  accessToken: string;
  cloudId: string;
}

export default async function SprintsSection({
  boardId,
  sprints,
  accessToken,
  cloudId,
}: SprintsSectionProps) {
  const sprintsBreakThrough = await getClosedSprintsBreakThrough(
    sprints,
    boardId,
    accessToken,
    cloudId
  );

  // console.log('-------------------');
  // console.log(JSON.stringify(sprintsBreakThrough));
  // console.log('-------------------');

  return (
    <>
      <SprintAccuracyChart sprints={sprintsBreakThrough} />

      {sprintsBreakThrough.map((sprint) => (
        <ClosedSprintPanel key={sprint.id} sprint={sprint} />
      ))}
    </>
  );
}
