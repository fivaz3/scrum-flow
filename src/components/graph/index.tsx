'use client';
import { Card, LineChart, Title } from '@tremor/react';
import { MaturitySprintDataSet } from '@/app/(dashboard)/sprints-report/sprint-effort';

const dataFormatter = (number: number) => `${Intl.NumberFormat('us').format(number).toString()}%`;

export interface GraphProps {
  data: MaturitySprintDataSet;
}

export default function Graph({ data }: GraphProps) {
  return (
    <Card>
      <Title>Précision des estimations lors des sprints</Title>
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
