'use client';
import { Card, LineChart, Title } from '@tremor/react';
import { SprintAccuracyChartData } from '@/app/(dashboard)/report/sprint-effort';

interface SprintAccuracyChartClientProps {
  data: SprintAccuracyChartData;
}

export default function SprintAccuracyChartClient({ data }: SprintAccuracyChartClientProps) {
  const dataFormatter = (number: number) => `${Intl.NumberFormat('us').format(number).toString()}%`;

  return (
    <Card>
      <Title>Évolution de la précision des estimations lors des sprints</Title>
      <LineChart
        className="mt-6"
        data={data}
        index="sprint"
        categories={['precision']}
        colors={['emerald']}
        valueFormatter={dataFormatter}
        yAxisWidth={40}></LineChart>
    </Card>
  );
}
