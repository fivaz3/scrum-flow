'use client';
import { SprintAccuracyChartData } from '@/app/(dashboard)/report/sprint-effort';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  CategoryScale,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip);

interface SprintAccuracyChartClientProps {
  data: SprintAccuracyChartData;
}

export default function SprintAccuracyChartClient({ data }: SprintAccuracyChartClientProps) {
  const chartData = {
    labels: data.map((item) => item.sprintName),
    datasets: [
      {
        label: 'Précision',
        data: data.map((item) => item.precision),
        fill: false,
        backgroundColor: '#0fb981',
        borderColor: '#0fb981',
        pointBackgroundColor: '#0fb981',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#0fb981',
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      y: {
        grid: {
          lineWidth: 2,
        },
        border: {
          dash: [3, 3],
        },
        ticks: {
          showLabelBackdrop: true,
          callback: function (value: unknown) {
            return `${value} %`;
          },
          max: 100,
          min: 0,
          stepSize: 25,
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#fff',
        borderColor: '#949ba7',
        borderWidth: 1,
        titleColor: '#6B7280FF',
        bodyColor: '#6B7280FF',
        callbacks: {
          label: (context: unknown) => {
            interface ExpectedContextType {
              dataset: {
                label?: string;
              };
              parsed: {
                y: number | null;
              };
            }

            // Type guard
            const isExpectedContextType = (obj: any): obj is ExpectedContextType => {
              return (
                obj &&
                typeof obj === 'object' &&
                obj.dataset &&
                (typeof obj.dataset.label === 'string' || obj.dataset.label === undefined) &&
                obj.parsed &&
                (typeof obj.parsed.y === 'number' || obj.parsed.y === null)
              );
            };

            let label = '';

            if (isExpectedContextType(context)) {
              label += context.dataset.label ? context.dataset.label + ': ' : '';
              label += context.parsed.y !== null ? context.parsed.y + '%' : '';
            }

            return label;
          },
        },
      },
    },
  };

  return (
    <div className="p-6 border border-gray-200 rounded-lg shadow">
      <h3 className="text-lg leading-6 font-medium text-gray-900">
        Évolution de la précision des estimations lors des sprints
      </h3>
      <div className="flex justify-end items-center gap-2 p-4">
        <span className="inline-block h-3 w-3 rounded-full bg-[#0fb981]"></span>
        <span className="text-xs text-gray-500 font-medium">Précision</span>
      </div>
      <div className="h-[240px] w-full">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}
