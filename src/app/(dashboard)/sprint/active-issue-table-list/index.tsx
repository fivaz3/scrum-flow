import ActiveIssueTable from './active-issue-table';
import { getIssuesFromSprintWithTimeSpent } from '@/lib/issue/issue-time-spent.service';
import { Sprint } from '@/lib/sprint.service';
import { Board } from '@/lib/board.service';

interface CurrentIssueListProps {
  board: Board;
  sprint: Sprint;
  accessToken: string;
  cloudId: string;
}

export default async function ActiveIssueTableList({
  board,
  sprint,
  accessToken,
  cloudId,
}: CurrentIssueListProps) {
  // TODO remove from the time spent concerning the amount of time a ticket spent in In Progress in the previous board
  const issues = await getIssuesFromSprintWithTimeSpent(board, sprint, accessToken, cloudId);

  const toDoIssues = issues.filter((issue) => issue.fields.status.statusCategory.name === 'To Do');

  const doingIssues = issues.filter(
    (issue) => issue.fields.status.statusCategory.name === 'In Progress'
  );

  const doneIssues = issues.filter((issue) => issue.fields.status.statusCategory.name === 'Done');

  return (
    <div className="flex flex-col gap-6 mt-4">
      <ActiveIssueTable label="To Do" issues={toDoIssues}></ActiveIssueTable>
      <ActiveIssueTable label="Doing" issues={doingIssues}></ActiveIssueTable>
      <ActiveIssueTable label="Done" issues={doneIssues}></ActiveIssueTable>
    </div>
  );
}
