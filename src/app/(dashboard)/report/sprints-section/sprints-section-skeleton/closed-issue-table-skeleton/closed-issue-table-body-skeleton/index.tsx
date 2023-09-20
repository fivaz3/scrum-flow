interface ClosedIssueTableBodySkeletonProps {}

export default function ClosedIssueTableBodySkeleton({}: ClosedIssueTableBodySkeletonProps) {
  return (
    <tbody className="max-w-sm bg-white divide-y divide-gray-200 whitespace-nowrap text-sm font-medium animate-pulse">
      {[0, 1, 2, 3, 4].map((index) => (
        <tr key={index}>
          <td className="w-[5%] px-6 py-4 text-gray-900 capitalize truncate">
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
          </td>
          <td className="w-[5%] px-6 py-4 text-gray-500 text-center">
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
          </td>
          <td className="w-[45%] px-6 py-4 text-gray-500 text-center">
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
          </td>
          <td className="w-[10%] px-6 py-4 text-center">
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
          </td>
          <td className="w-[15%] px-6 py-4 text-center">
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
          </td>
          <td className="w-[15%] px-6 py-4 text-center">
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
          </td>
          <td className="w-[5%] px-6 py-4 text-right">
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
          </td>
        </tr>
      ))}
    </tbody>
  );
}
