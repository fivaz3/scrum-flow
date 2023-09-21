import { SprintBreakThrough } from '@/app/(dashboard)/report/sprints-section/service';
import ClosedIssueTable from './closed-issue-table';
import ClosedSprintHeader from '@/app/(dashboard)/report/sprints-section/closed-sprint-panel/closed-sprint-header';

interface ClosedSprintPanelProps {
  sprint: SprintBreakThrough;
}

export default function ClosedSprintPanel({ sprint }: ClosedSprintPanelProps) {
  return (
    <div>
      <ClosedSprintHeader sprint={sprint} />

      <ClosedIssueTable sprint={sprint} />
    </div>
  );
}
