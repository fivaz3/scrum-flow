import {
  convertToDuration,
  getIssuesFromSprintWithTimeSpent,
} from '@/lib/issue/issue-time-spent.service';
import {
  getEstimationInTimeFormatted,
  getIssueAccuracy,
} from '@/app/(dashboard)/report/closed-sprint-panel/closed-issue-table/service';
import { Sprint } from '@/lib/sprint.service';

interface ClosedIssueTableBodyProps {
  boardId: number;
  sprint: Sprint;
  accessToken: string;
  cloudId: string;
}

export default async function ClosedIssueTableBody({
  boardId,
  sprint,
  accessToken,
  cloudId,
}: ClosedIssueTableBodyProps) {
  const issues = await getIssuesFromSprintWithTimeSpent(boardId, sprint.id, accessToken, cloudId);

  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {issues.map((issue) => (
        <tr key={issue.id}>
          <td className="w-5/12 max-w-0 px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 capitalize truncate">
            {issue.key} - {issue.fields.summary}
          </td>
          <td className="w-1/12 px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
            {issue.estimation || <span className={'text-red-500'}>sans estimation</span>}
          </td>
          <td className="w-3/12 px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
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
