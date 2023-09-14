import { Issue, IssueWithTimeSpent } from '@/lib/issue/issue.service';
import { convertToDuration } from '@/lib/issue/issue-time-spent.service';
import { Sprint } from '@/lib/sprint.service';
import { getSumOfEstimations } from '@/app/(dashboard)/sprints-report/sprint-effort';
import { differenceInMilliseconds, formatDuration, intervalToDuration, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

function getEstimationInTime(
  issues: Issue[],
  estimationInPoints: number | null,
  sprint: Sprint
): string {
  if (!estimationInPoints) {
    return 'sans estimation';
  }

  const points = getSumOfEstimations(issues);

  const sprintDurationInMilliseconds = differenceInMilliseconds(
    parseISO(sprint.endDate),
    parseISO(sprint.startDate)
  );

  const pointDurationInMilliseconds = sprintDurationInMilliseconds / points;

  const issueEstimationInMilliseconds = estimationInPoints * pointDurationInMilliseconds;

  const pointDuration = intervalToDuration({ start: 0, end: issueEstimationInMilliseconds });

  return formatDuration(pointDuration, { format: ['days', 'hours', 'minutes'], locale: fr });
}

export interface IssueTableProps {
  label: string;
  issues: IssueWithTimeSpent[];
  sprint: Sprint;
}

export default function ClosedIssueTable({ issues, sprint }: IssueTableProps) {
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
                  <th scope="col" className="w-2/12 px-6 py-3 text-center">
                    Estimation (s. points)
                  </th>
                  <th scope="col" className="w-2/12 px-6 py-3 text-center">
                    Estimation (temps)
                  </th>
                  <th scope="col" className="w-3/12 px-6 py-3 text-right">
                    Temps passé
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 whitespace-nowrap text-sm font-medium">
                {issues.map((issue) => (
                  <tr key={issue.id}>
                    <td className="w-5/12 max-w-0 px-6 py-4 text-gray-900 capitalize truncate">
                      {issue.key} - {issue.fields.summary}
                    </td>
                    <td className="w-2/12 px-6 py-4 text-gray-500 text-center">
                      {issue.estimation || <span className={'text-red-500'}>sans estimation</span>}
                    </td>
                    <td className="w-2/12 px-6 py-4 text-gray-500 text-center">
                      {getEstimationInTime(issues, issue.estimation, sprint)}
                    </td>
                    <td className="w-3/12 px-6 py-4 text-right">
                      {issue.key === 'SCRUM-15' && `-${issue.timeSpent}-`}
                      {convertToDuration(issue.timeSpent, issue.key === 'SCRUM-15')}
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
