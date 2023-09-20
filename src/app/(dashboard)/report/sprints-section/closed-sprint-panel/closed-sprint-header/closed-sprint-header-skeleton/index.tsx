interface ClosedSprintHeaderSkeletonProps {}

export default function ClosedSprintHeaderSkeleton({}: ClosedSprintHeaderSkeletonProps) {
  return (
    <div className="flex justify-between items-center mb-5">
      <div>
        <h3 className="flex gap-2 items-center text-lg leading-6 font-medium text-gray-700 mb-2">
          <span>Sprint :</span>
          <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-[230px]" />
        </h3>
        <div className="text-sm text-gray-500">
          <div className="flex gap-2 items-center">
            <span>Début :</span>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-[150px]" />
          </div>
          <div className="flex gap-2 items-center">
            <span>Fin :</span>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-[150px]" />
          </div>
          <div className="flex gap-2 items-center">
            <span>Duration :</span>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-[150px]" />
          </div>
        </div>
      </div>
      <div role="status" className="max-w-sm animate-pulse w-48 flex flex-col items-end">
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-[230px] mb-2.5" />
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-[200px] mb-2.5" />
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-[250px]" />
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
