import { Grid } from '@tremor/react';
import IssueTable from '@/app/current-sprint/IssueTable';
import { getIssuesFromSprintWithChangelog } from '@/lib/issue.service';
import { Suspense } from 'react';

export interface IssuesListProps {
  boardId: number | string;
  sprintId: number;
}

export default async function IssuesList({ boardId, sprintId }: IssuesListProps) {
  const { toDoIssues, doingIssues, doneIssues } = await getIssuesFromSprintWithChangelog(
    boardId,
    sprintId
  );

  return (
    <Grid className="gap-6 mt-4">
      <Suspense fallback={<></>}>
        <IssueTable label="To Do" issues={toDoIssues}></IssueTable>
        <IssueTable label="Doing" issues={doingIssues}></IssueTable>
        <IssueTable label="Done" issues={doneIssues}></IssueTable>
      </Suspense>
    </Grid>
  );
}
