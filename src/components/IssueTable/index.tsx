'use client';

import { formatDuration } from 'date-fns';
import { Card, Title } from '@tremor/react';
import { fr } from 'date-fns/locale';
import { IssueWithTimeSpent } from '@/lib/issue/issue.service';

function convertMinutes(minutes: number): string {
  if (minutes < 1) {
    return '0 minutes';
  }

  const duration = {
    hours: Math.floor(minutes / 60),
    minutes: minutes % 60,
  };

  return formatDuration(duration, { format: ['hours', 'minutes'], locale: fr });
}

export interface IssueTableProps {
  label: string;
  issues: IssueWithTimeSpent[];
}

export default function IssueTable({ issues, label }: IssueTableProps) {
  return (
    <Card>
      <Title className="mb-2">{label}</Title>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 font-medium text-xs text-gray-500 uppercase tracking-wider">
                  <tr>
                    <th scope="col" className="w-6/12 px-6 py-3">
                      Name
                    </th>
                    <th scope="col" className="w-2/12 px-6 py-3 text-center">
                      Estimation
                    </th>
                    <th scope="col" className="px-6 py-3 text-right">
                      Temps passé
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 whitespace-nowrap text-sm font-medium">
                  {issues.map((issue) => (
                    <tr key={issue.id}>
                      <td className="max-w-0 px-6 py-4 text-gray-900 capitalize truncate">
                        {issue.key} - {issue.fields.summary}
                      </td>
                      <td className="w-2/12 px-6 py-4 text-gray-500 text-center">
                        {issue.estimation || (
                          <span className={'text-red-500'}>sans estimation</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">{convertMinutes(issue.timeSpent)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
