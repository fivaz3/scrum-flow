import IssueTable from '@/app/(dashboard)/current-sprint/IssueTable';
import { getIssuesFromSprintWithChangelog } from '@/lib/issue.service';

export interface PreviousIssueListProps {
  boardId: number | string;
  sprintId: number;
}

export default async function PreviousIssueList({ boardId, sprintId }: PreviousIssueListProps) {
  const issues = await getIssuesFromSprintWithChangelog(boardId, sprintId);

  return <IssueTable label="Done" issues={issues}></IssueTable>;
}
