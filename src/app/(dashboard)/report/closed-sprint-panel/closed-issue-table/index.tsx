import { Sprint } from '@/lib/sprint.service';
import ClosedIssueTableBody from '@/app/(dashboard)/report/closed-sprint-panel/closed-issue-table/closed-issue-table-body';
import { Suspense } from 'react';
import ClosedIssueTableBodySkeleton from '@/app/(dashboard)/report/closed-sprint-panel/closed-issue-table/closed-issue-table-body-skeleton';

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
              <Suspense fallback={<ClosedIssueTableBodySkeleton />}>
                <ClosedIssueTableBody
                  boardId={boardId}
                  sprint={sprint}
                  accessToken={accessToken}
                  cloudId={cloudId}
                />
              </Suspense>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
