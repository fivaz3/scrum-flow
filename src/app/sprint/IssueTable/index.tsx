'use client';

import { Grid } from '@tremor/react';

export interface IssueTableProps {
  // boardId: number;
  // sprintId: number;
}

export default function IssueTable({} // boardId, sprintId
: IssueTableProps) {
  return (
    <Grid className="gap-6">
      {/*<ToDoIssues issues={toDoIssues}></ToDoIssues>*/}
      {/*<DoingIssues issues={doingIssues}></DoingIssues>*/}
    </Grid>
  );
}
