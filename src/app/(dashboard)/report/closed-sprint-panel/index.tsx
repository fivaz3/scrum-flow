import ClosedSprintHeader from '@/app/(dashboard)/report/closed-sprint-panel/closed-sprint-header';
import ClosedIssueTable from '@/app/(dashboard)/report/closed-sprint-panel/closed-issue-table';
import { ClosedSprint } from '@/lib/sprint.service';

interface ClosedSprintPanelProps {
  sprint: ClosedSprint;
  boardId: number | string;
  accessToken: string;
  cloudId: string;
}

export default function ClosedSprintPanel({
  boardId,
  sprint,
  accessToken,
  cloudId,
}: ClosedSprintPanelProps) {
  return (
    <>
      <ClosedSprintHeader
        boardId={boardId}
        sprint={sprint}
        accessToken={accessToken}
        cloudId={cloudId}
      />

      <ClosedIssueTable
        boardId={boardId}
        sprint={sprint}
        accessToken={accessToken}
        cloudId={cloudId}
      />
    </>
  );
}
