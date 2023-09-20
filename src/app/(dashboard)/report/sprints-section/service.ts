import { ClosedSprint } from '@/lib/sprint.service';
import {
  getIssuesFromSprintWithChangelog,
  getStatusHistory,
  IssueWithChangeLog,
  IssueWithTimeSpent,
} from '@/lib/issue/issue.service';
import { getIssuesFromBeforeSprintStart } from '@/app/(dashboard)/report/sprint-effort';
import { isBefore, parseISO } from 'date-fns';
import { addTimeSpentToIssues } from '@/lib/issue/issue-time-spent.service';

export type SprintBreakThrough = ClosedSprint & {
  estimatedIssues: IssueWithTimeSpent[];
  actualIssues: IssueWithTimeSpent[];
};

function wasIssueDoneBeforeSprintEnd(sprint: ClosedSprint, issue: IssueWithChangeLog): boolean {
  if (issue.fields.status.statusCategory.name !== 'Done') {
    return false;
  }

  const historiesOfStatus = getStatusHistory(issue.changelog.histories);

  const historiesDesc = historiesOfStatus.sort(
    (a, b) => parseISO(b.created).valueOf() - parseISO(a.created).valueOf()
  );

  const sprintEnd = parseISO(sprint.completeDate);

  for (const history of historiesDesc) {
    for (const item of history.items) {
      if (item.toString === 'Done') {
        const issueWasComplete = parseISO(history.created);
        return isBefore(issueWasComplete, sprintEnd);
      }
    }
  }

  // fallback, the code shouldn't ever need to come here
  return true;
}

async function getActualIssuesFromClosedSprint(
  boardId: number,
  sprint: ClosedSprint,
  accessToken: string,
  cloudId: string
) {
  const issues = await getIssuesFromSprintWithChangelog(boardId, sprint.id, accessToken, cloudId);

  return issues.filter((issue) => wasIssueDoneBeforeSprintEnd(sprint, issue));
}

async function getClosedSprintBreakThrough(
  sprint: ClosedSprint,
  boardId: number,
  accessToken: string,
  cloudId: string
): Promise<SprintBreakThrough> {
  const estimatedIssues = await getIssuesFromBeforeSprintStart(
    boardId,
    sprint,
    accessToken,
    cloudId
  );

  const estimatedIssuesWithTimeSpent = await addTimeSpentToIssues(
    boardId,
    sprint,
    estimatedIssues,
    accessToken,
    cloudId
  );

  const actualIssues = await getActualIssuesFromClosedSprint(boardId, sprint, accessToken, cloudId);

  const actualIssuesWithTimeSpent = await addTimeSpentToIssues(
    boardId,
    sprint,
    actualIssues,
    accessToken,
    cloudId
  );

  return {
    ...sprint,
    estimatedIssues: estimatedIssuesWithTimeSpent,
    actualIssues: actualIssuesWithTimeSpent,
  };
}

export async function getClosedSprintsBreakThrough(
  sprints: ClosedSprint[],
  boardId: number,
  accessToken: string,
  cloudId: string
): Promise<SprintBreakThrough[]> {
  return Promise.all(
    sprints.map((sprint) => getClosedSprintBreakThrough(sprint, boardId, accessToken, cloudId))
  );
}
