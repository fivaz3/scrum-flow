import { Board } from '@/lib/board.service';
import {
  getIssuesWithChangelog,
  getStatusHistory,
  IssueWithChangeLog,
  IssueWithTimeSpent,
} from '@/lib/issue/issue.service';
import { getSchedules } from '@/app/(dashboard)/schedules/calendar/schedule.service';
import { getInProgressStatuses } from '@/lib/project.service';
import { getTimeInProgress } from '@/lib/issue/issue-time-spent.service';
import { postBackEnd } from '@/lib/backend.service';
import { parseISO } from 'date-fns';

async function getIssuesWithTimeSpent(
  board: Board,
  accessToken: string,
  cloudId: string
): Promise<IssueWithTimeSpent[]> {
  const issues = await getIssuesWithChangelog(board.id, accessToken, cloudId);

  const schedules = await getSchedules(accessToken, cloudId);

  const inProgressColumns = await getInProgressStatuses(
    board.location.projectId,
    accessToken,
    cloudId
  );

  return issues.map((issue) => ({
    ...issue,
    timeSpent: getTimeInProgress(issue, schedules, inProgressColumns),
  }));
}

export type SimpleIssue = {
  id: string;
  key: string;
  summary: string;
  estimation: number | null;
  timeSpent: number;
  completedDate: string;
};

function getCompletedDate(issue: IssueWithChangeLog): string | null {
  const statusHistory = getStatusHistory(issue.changelog.histories);

  const historiesDesc = statusHistory.sort(
    (a, b) => parseISO(b.created).valueOf() - parseISO(a.created).valueOf()
  );

  for (const history of historiesDesc) {
    for (const item of history.items) {
      if (item.toString === 'Done') {
        return history.created;
      }
    }
  }
  console.log(`the issue ${issue.key} is Done but doesn't have a changelog being moved to Done`);
  return null;
}

function simplifyIssue(issue: IssueWithTimeSpent): SimpleIssue | null {
  if (issue.fields.status.statusCategory.name !== 'Done') {
    return null;
  }
  if (!issue.estimation) {
    return null;
  }

  const completedDate = getCompletedDate(issue);
  if (!completedDate) {
    return null;
  }

  return {
    id: issue.id,
    key: issue.key,
    summary: issue.fields.summary,
    estimation: issue.estimation,
    timeSpent: issue.timeSpent,
    completedDate: completedDate,
  };
}

function convertIssuesToSimpleIssues(issues: IssueWithTimeSpent[]): SimpleIssue[] {
  const simpleIssues: SimpleIssue[] = [];

  for (const issue of issues) {
    const simpleIssue = simplifyIssue(issue);
    if (simpleIssue) {
      simpleIssues.push(simpleIssue);
    }
  }

  return simpleIssues;
}

const PATH = '/api/issues/';
export async function sendIssues(board: Board, accessToken: string, cloudId: string) {
  const issues = await getIssuesWithTimeSpent(board, accessToken, cloudId);

  console.log('first', issues[0].key);
  console.log('last', issues[issues.length - 1].key);
  console.log('issues.length', issues.length);

  const simpleIssues = convertIssuesToSimpleIssues(issues);

  console.log('simpleIssues.length', simpleIssues.length);

  const response = await postBackEnd(PATH, simpleIssues, accessToken, cloudId);

  console.log(response);
}
