import {
  convertToDuration,
  getIssuesFromSprintWithTimeSpent,
} from '@/lib/issue/issue-time-spent.service';
import { Sprint } from '@/lib/sprint.service';
import {
  getEstimationInTimeFormatted,
  getIssueAccuracy,
} from '@/app/(dashboard)/report/closed-sprint-panel/closed-issue-table/service';

interface IssueTableProps {
  boardId: number | string;
  sprint: Sprint;
  accessToken: string;
  cloudId: string;
}

export default async function ClosedIssueTable({
  boardId,
  sprint,
  accessToken,
  cloudId,
}: IssueTableProps) {
  const issues = await getIssuesFromSprintWithTimeSpent(boardId, sprint.id, accessToken, cloudId);

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 font-medium text-xs text-gray-500 uppercase tracking-wider">
                <tr>
                  <th scope="col" className="w-5/12 px-6 py-3 text-left">
                    Name
                  </th>
                  <th scope="col" className="w-1/12 px-6 py-3 text-center">
                    Estimation (s. points)
                  </th>
                  <th scope="col" className="w-2/12 px-6 py-3 text-center">
                    Estimation (temps)
                  </th>
                  <th scope="col" className="w-2/12 px-6 py-3 text-center">
                    Temps passé
                  </th>
                  <th scope="col" className="w-2/12 px-6 py-3 text-right">
                    Précision individuel
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 whitespace-nowrap text-sm font-medium">
                {issues.map((issue) => (
                  <tr key={issue.id}>
                    <td className="w-5/12 max-w-0 px-6 py-4 text-gray-900 capitalize truncate">
                      {issue.key} - {issue.fields.summary}
                    </td>
                    <td className="w-1/12 px-6 py-4 text-gray-500 text-center">
                      {issue.estimation || <span className={'text-red-500'}>sans estimation</span>}
                    </td>
                    <td className="w-2/12 px-6 py-4 text-gray-500 text-center">
                      {getEstimationInTimeFormatted(issues, issue.estimation, sprint)}
                    </td>
                    <td className="w-2/12 px-6 py-4 text-center">
                      {issue.key === 'SCRUM-15' && `-${issue.timeSpent}-`}
                      {convertToDuration(issue.timeSpent, issue.key === 'SCRUM-15')}
                    </td>
                    <td className="w-2/12 px-6 py-4 text-right">
                      {getIssueAccuracy(issues, issue, sprint)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
