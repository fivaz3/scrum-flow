import ClosedSprintHeaderSkeleton from '@/app/(dashboard)/report/sprints-section/closed-sprint-panel/closed-sprint-header/closed-sprint-header-skeleton';
import ClosedIssueTableSkeleton from '@/app/(dashboard)/report/sprints-section/sprints-section-skeleton/closed-issue-table-skeleton';

interface SprintsSectionSkeletonProps {}

export default function SprintsSectionSkeleton({}: SprintsSectionSkeletonProps) {
  return (
    <>
      <div>chart</div>
      {[0, 1, 2].map((item) => (
        <div key={item}>
          <ClosedSprintHeaderSkeleton />
          <ClosedIssueTableSkeleton />
        </div>
      ))}
    </>
  );
}
