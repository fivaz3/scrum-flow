import { convertToDuration } from '@/lib/issue/issue-time-spent.service';
import {
  getEstimationInTimeFormatted,
  getIssueAccuracy,
} from '@/app/(dashboard)/report/sprints-section/closed-sprint-panel/closed-issue-table/service';
import { SprintBreakThrough } from '@/app/(dashboard)/report/sprints-section/service';
import { CalendarIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { CheckIcon } from '@heroicons/react/24/solid';

type IssueBreakThrough = SprintBreakThrough['actualIssues'][number] & {
  isEstimated: boolean;
  isActual: boolean;
};

function mixIssues(
  estimatedIssues: SprintBreakThrough['estimatedIssues'],
  actualIssues: SprintBreakThrough['actualIssues']
): IssueBreakThrough[] {
  const map = new Map<string, IssueBreakThrough>();

  estimatedIssues.forEach((obj) => {
    map.set(obj.id, { ...obj, isEstimated: true, isActual: false });
  });

  actualIssues.forEach((obj) => {
    if (map.has(obj.id)) {
      const element = map.get(obj.id);
      if (element) {
        element.isActual = true;
      }
    } else {
      map.set(obj.id, { ...obj, isEstimated: false, isActual: true });
    }
  });

  return Array.from(map.values());
}

interface ClosedIssueTableBodyProps {
  sprint: SprintBreakThrough;
}

export default function ClosedIssueTableBody({ sprint }: ClosedIssueTableBodyProps) {
  const issues = mixIssues(sprint.estimatedIssues, sprint.actualIssues);

  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {issues.map((issue) => (
        <tr key={issue.id}>
          <td className="w-1/12 px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
            <div
              className={classNames(
                issue.isEstimated ? 'bg-indigo-500' : 'bg-gray-500',
                'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white'
              )}>
              <CalendarIcon className="text-white h-5 w-5" />
            </div>
          </td>
          <td className="w-1/12 px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
            <div
              className={classNames(
                issue.isActual ? 'bg-indigo-500' : 'bg-gray-500',
                'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white'
              )}>
              <CheckIcon className="text-white h-5 w-5" />
            </div>
          </td>
          <td className="w-4/12 max-w-0 px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 capitalize truncate">
            {issue.key} - {issue.fields.summary}
          </td>
          <td className="w-2/12 px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
            {issue.estimation || <span className={'text-red-500'}>non estimé</span>}
          </td>
          <td className="w-2/12 px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
            {getEstimationInTimeFormatted(issues, issue.estimation, sprint)}
          </td>
          <td className="w-2/12 px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
            {convertToDuration(issue.timeSpent)}
          </td>
          <td className="w-1/12 px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
            {getIssueAccuracy(issues, issue, sprint)}
          </td>
        </tr>
      ))}
    </tbody>
  );
}
