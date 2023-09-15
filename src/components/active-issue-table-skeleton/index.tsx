import { Card, Title } from '@tremor/react';

interface ActiveIssueTableSkeletonProps {
  label: string;
}

export default function ActiveIssueTableSkeleton({ label }: ActiveIssueTableSkeletonProps) {
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
                      Estimation (s. points)
                    </th>
                    <th scope="col" className="px-6 py-3 text-right">
                      Temps passé
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 whitespace-nowrap text-sm font-medium">
                  {[0, 1, 2].map((index) => (
                    <tr key={index}>
                      <td className="max-w-0 px-6 py-4 text-gray-900 capitalize truncate">
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-[100px] mb-2.5" />
                      </td>
                      <td className="w-2/12 px-6 py-4 text-gray-500 text-center">
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-[100px] mb-2.5" />
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-[100px] mb-2.5" />
                      </td>
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
