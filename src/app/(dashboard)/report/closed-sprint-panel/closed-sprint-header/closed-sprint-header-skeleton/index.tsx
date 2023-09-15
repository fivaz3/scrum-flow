interface ClosedSprintHeaderSkeletonProps {}

export default function ClosedSprintHeaderSkeleton({}: ClosedSprintHeaderSkeletonProps) {
  return (
    <div role="status" className="max-w-sm animate-pulse w-48 flex flex-col items-end">
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-[230px] mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-[200px] mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-[250px]"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
