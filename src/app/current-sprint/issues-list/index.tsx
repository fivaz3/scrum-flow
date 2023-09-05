import { Grid } from '@tremor/react';
import IssueTable from '@/app/current-sprint/IssueTable';
import { getIssuesFromSprintWithChangelog } from '@/lib/issue.service';

export interface IssuesListProps {
  boardId: number | string;
  currentSprintId: number;
}

export default async function IssuesList({ boardId, currentSprintId }: IssuesListProps) {
  const { toDoIssues, doingIssues, doneIssues } = await getIssuesFromSprintWithChangelog(
    boardId,
    currentSprintId
  );

  return (
    <Grid className="gap-6 mt-4">
      <IssueTable label="To Do" issues={toDoIssues}></IssueTable>
      <IssueTable label="Doing" issues={doingIssues}></IssueTable>
      <IssueTable label="Done" issues={doneIssues}></IssueTable>
    </Grid>
  );
}
