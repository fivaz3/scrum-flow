import { getIssuesFromSprintWithTimeSpent } from '@/lib/issue/issue-time-spent.service';
import ClosedIssueTable from '@/app/(dashboard)/report/previous-sprint-panel/previous-issue-list/closed-issue-table';
import { Sprint } from '@/lib/sprint.service';

interface PreviousIssueListProps {
  boardId: number | string;
  sprint: Sprint;
  accessToken: string;
  cloudId: string;
}

export default async function PreviousIssueList({
  boardId,
  sprint,
  accessToken,
  cloudId,
}: PreviousIssueListProps) {
  const issues = await getIssuesFromSprintWithTimeSpent(boardId, sprint.id, accessToken, cloudId);

  return <ClosedIssueTable label="Done" issues={issues} sprint={sprint}></ClosedIssueTable>;
}
