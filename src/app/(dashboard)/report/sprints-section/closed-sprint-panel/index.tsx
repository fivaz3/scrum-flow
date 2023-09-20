import { SprintBreakThrough } from '@/app/(dashboard)/report/sprints-section/service';
import ClosedIssueTable from '@/app/(dashboard)/report/sprints-section/closed-sprint-panel/closed-issue-table';
import ClosedSprintHeader from '@/app/(dashboard)/report/sprints-section/closed-sprint-panel/closed-sprint-header';

interface ClosedSprintPanelProps {
  sprint: SprintBreakThrough;
}

export default function ClosedSprintPanel({ sprint }: ClosedSprintPanelProps) {
  // if (sprint.id === 20) {
  //   console.log('-------------------------------------------------------------');
  //   console.log('\n');
  //   console.log('\n');
  //   console.log('\n');
  //   console.log(JSON.stringify(sprint));
  //   console.log('\n');
  //   console.log('\n');
  //   console.log('\n');
  //   console.log('\n');
  //   console.log('-------------------------------------------------------------');
  // }
  return (
    <div>
      <ClosedSprintHeader sprint={sprint} />

      <ClosedIssueTable sprint={sprint} />
    </div>
  );
}
