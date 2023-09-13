import { Grid } from '@tremor/react';
import IssueTable from './IssueTable';
import { getIssuesFromSprintWithTimeSpent } from '@/lib/issue/issue-time-spent.service';

export interface CurrentIssueListProps {
  boardId: number | string;
  sprintId: number;
  accessToken: string;
  cloudId: string;
}

export default async function CurrentIssueList({
  boardId,
  sprintId,
  accessToken,
  cloudId,
}: CurrentIssueListProps) {
  const issues = await getIssuesFromSprintWithTimeSpent(boardId, sprintId, accessToken, cloudId);

  const toDoIssues = issues.filter((issue) => issue.fields.status.statusCategory.name === 'To Do');

  const doingIssues = issues.filter(
    (issue) => issue.fields.status.statusCategory.name === 'In Progress'
  );

  const doneIssues = issues.filter((issue) => issue.fields.status.statusCategory.name === 'Done');

  return (
    <Grid className="gap-6 mt-4">
      <IssueTable label="To Do" issues={toDoIssues}></IssueTable>
      <IssueTable label="Doing" issues={doingIssues}></IssueTable>
      <IssueTable label="Done" issues={doneIssues}></IssueTable>
    </Grid>
  );
}
