import IssueTable from '../../../../components/IssueTable';
import { getIssuesFromSprintWithChangelog } from '@/lib/issue.service';

export interface PreviousIssueListProps {
  boardId: number | string;
  sprintId: number;
  accessToken: string;
  cloudId: string;
}

export default async function PreviousIssueList({
  boardId,
  sprintId,
  accessToken,
  cloudId,
}: PreviousIssueListProps) {
  const issues = await getIssuesFromSprintWithChangelog(boardId, sprintId, accessToken, cloudId);

  return <IssueTable label="Done" issues={issues}></IssueTable>;
}
