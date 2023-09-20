import Loading from '@/components/loading';

interface SprintAccuracyChartSkeletonProps {}

export default function SprintAccuracyChartSkeleton({}: SprintAccuracyChartSkeletonProps) {
  return (
    <div className="">
      <div className="p-6 border border-gray-200 rounded-lg shadow">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Évolution de la précision des estimations lors des sprints
        </h3>
        <div className="flex justify-end items-center gap-2 p-4">
          <span className="inline-block h-3 w-3 rounded-full bg-[#0fb981]"></span>
          <span className="text-xs text-gray-500 font-medium">Précision</span>
        </div>
        <div className="relative h-[240px] w-full">
          <Loading className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          <div className="blur-sm h-full flex flex-col justify-between text-xs text-gray-600">
            <div className="flex items-center gap-1">
              <div className="w-10 text-right">100 %</div>
              <div className="border-dashed border-b-2 border-gray-300 w-full" />
            </div>
            <div className="flex items-center gap-1">
              <div className="w-10 text-right">75 %</div>
              <div className="border-dashed border-b-2 border-gray-300 w-full" />
            </div>
            <div className="flex items-center gap-1">
              <div className="w-10 text-right">50 %</div>
              <div className="border-dashed border-b-2 border-gray-300 w-full" />
            </div>
            <div className="flex items-center gap-1">
              <div className="w-10 text-right">25 %</div>
              <div className="border-dashed border-b-2 border-gray-300 w-full" />
            </div>
            <div className="flex items-center gap-1">
              <div className="w-10 text-right">0 %</div>
              <div className="border-dashed border-b-2 border-gray-300 w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
