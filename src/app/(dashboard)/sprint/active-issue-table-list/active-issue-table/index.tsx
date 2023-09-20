import { IssueWithTimeSpent } from '@/lib/issue/issue.service';
import { formatMilliseconds } from '@/lib/issue/issue-time-spent.service';
import React from 'react';

interface IssueTableProps {
  label: string;
  issues: IssueWithTimeSpent[];
}

export default function ActiveIssueTable({ issues, label }: IssueTableProps) {
  return (
    <div className="p-6 border border-gray-200 rounded-lg shadow bg-gray-100">
      <h3 className="text-lg leading-6 font-medium text-gray-900 mb-2">{label}</h3>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 uppercase text-gray-500">
                  <tr>
                    <th
                      scope="col"
                      className="w-6/12 px-6 py-3 font-medium text-xs tracking-wider text-left">
                      Name
                    </th>
                    <th
                      scope="col"
                      className="w-3/12 px-6 py-3 font-medium text-xs tracking-wider text-center">
                      Estimation (s. points)
                    </th>
                    <th
                      scope="col"
                      className="w-3/12 px-6 py-3 font-medium text-xs tracking-wider text-right">
                      Temps passé
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {issues.map((issue) => (
                    <tr key={issue.id}>
                      <td className="max-w-0 w-6/12 px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 capitalize truncate text-left">
                        {issue.key} - {issue.fields.summary}
                      </td>
                      <td className="w-3/12 px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                        {issue.estimation || <span className={'text-red-500'}>non estimé</span>}
                      </td>
                      <td className="w-3/12 px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                        {formatMilliseconds(issue.timeSpent)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
