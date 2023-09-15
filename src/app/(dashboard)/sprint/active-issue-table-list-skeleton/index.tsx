import ActiveIssueTableSkeleton from '@/components/active-issue-table-skeleton';

interface ActiveIssueTableSkeletonProps {}

export default function ActiveIssueTableListSkeleton({}: ActiveIssueTableSkeletonProps) {
  return (
    <div className="flex flex-col gap-6 mt-4">
      <ActiveIssueTableSkeleton label="To Do"></ActiveIssueTableSkeleton>
      <ActiveIssueTableSkeleton label="Doing"></ActiveIssueTableSkeleton>
      <ActiveIssueTableSkeleton label="Done"></ActiveIssueTableSkeleton>
    </div>
  );
}
