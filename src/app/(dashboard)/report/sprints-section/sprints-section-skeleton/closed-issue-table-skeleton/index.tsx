import ClosedIssueTableBodySkeleton from '@/app/(dashboard)/report/sprints-section/closed-sprint-panel/closed-issue-table/closed-issue-table-body-skeleton';

interface ClosedIssueTableSkeletonProps {}

export default function ClosedIssueTableSkeleton({}: ClosedIssueTableSkeletonProps) {
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 uppercase text-gray-500">
                <tr>
                  <th
                    scope="col"
                    className="w-1/12 px-6 py-3 font-medium text-xs tracking-wider text-left"></th>
                  <th
                    scope="col"
                    className="w-1/12 px-6 py-3 font-medium text-xs tracking-wider text-left"></th>
                  <th
                    scope="col"
                    className="w-4/12 px-6 py-3 font-medium text-xs tracking-wider text-left">
                    Name
                  </th>
                  <th
                    scope="col"
                    className="w-2/12 px-6 py-3 font-medium text-xs tracking-wider text-center">
                    Estimation (s. points)
                  </th>
                  <th
                    scope="col"
                    className="w-2/12 px-6 py-3 font-medium text-xs tracking-wider text-center">
                    Estimation (temps)
                  </th>
                  <th
                    scope="col"
                    className="w-2/12 px-6 py-3 font-medium text-xs tracking-wider text-center">
                    Temps passé
                  </th>
                  <th
                    scope="col"
                    className="w-1/12 px-6 py-3 font-medium text-xs tracking-wider text-right">
                    Précision individuel
                  </th>
                </tr>
              </thead>

              <ClosedIssueTableBodySkeleton />
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
