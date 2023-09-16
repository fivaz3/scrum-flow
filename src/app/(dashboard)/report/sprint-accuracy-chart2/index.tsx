import { getDataForLineChart } from '@/app/(dashboard)/report/sprint-effort';
import SprintAccuracyChart2Client from '@/app/(dashboard)/report/sprint-accuracy-chart2/sprint-accuracy-chart2-client';
import { Sprint } from '@/lib/sprint.service';

interface SprintAccuracyChart2Props {
  boardId: string | number;
  sprints: Sprint[];
  accessToken: string;
  cloudId: string;
}

export default async function SprintAccuracyChart2({
  boardId,
  sprints,
  accessToken,
  cloudId,
}: SprintAccuracyChart2Props) {
  const data = await getDataForLineChart(boardId, sprints, accessToken, cloudId);

  return <SprintAccuracyChart2Client data={data}></SprintAccuracyChart2Client>;
}
