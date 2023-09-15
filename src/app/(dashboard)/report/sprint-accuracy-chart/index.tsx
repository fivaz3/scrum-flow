import { getDataForLineChart } from '@/app/(dashboard)/report/sprint-effort';
import { Sprint } from '@/lib/sprint.service';
import SprintAccuracyChartClient from '@/app/(dashboard)/report/sprint-accuracy-chart/sprint-accuracy-chart-client';

interface GraphProps {
  boardId: string | number;
  sprints: Sprint[];
  accessToken: string;
  cloudId: string;
}

export default async function SprintAccuracyChart({
  boardId,
  sprints,
  accessToken,
  cloudId,
}: GraphProps) {
  const data = await getDataForLineChart(boardId, sprints, accessToken, cloudId);

  return <SprintAccuracyChartClient data={data} />;
}
