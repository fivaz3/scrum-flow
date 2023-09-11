import IssueTable from '../../../../components/IssueTable';
import { getIssuesFromSprintWithTimeSpent } from '@/lib/issue/issue-time-spent.service';

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
  const issues = await getIssuesFromSprintWithTimeSpent(boardId, sprintId, accessToken, cloudId);

  return <IssueTable label="Done" issues={issues}></IssueTable>;
}
