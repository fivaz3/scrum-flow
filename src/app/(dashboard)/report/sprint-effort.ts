import { Sprint } from '@/lib/sprint.service';

import { isAfter, isBefore, parseISO } from 'date-fns';
import {
  getIssuesFromSprintWithChangelog,
  getIssuesWithChangelog,
  getStatusHistory,
  Issue,
  IssueWithChangeLog,
} from '@/lib/issue/issue.service';

function getSprintHistory(histories: IssueWithChangeLog['changelog']['histories']) {
  // sort histories by date
  histories.sort((a, b) => parseISO(a.created).valueOf() - parseISO(b.created).valueOf());

  // remove history that isn't about status
  const remainingHistories = histories.map((history) => {
    return {
      ...history,
      items: history.items.filter((item) => item.field === 'Sprint'),
    };
  });

  return remainingHistories.filter((history) => history.items.length > 0);
}

function wasNotAddedAfterSprintStart(issue: IssueWithChangeLog, sprint: Sprint): boolean {
  const historiesOfSprint = getSprintHistory(issue.changelog.histories);

  const sprintStart = parseISO(sprint.startDate);

  let wasNotAddedAfterStart = true;

  for (const history of historiesOfSprint) {
    for (const item of history.items) {
      if (item.to === `${sprint.id}`) {
        const issueAddedToSprint = parseISO(history.created);
        if (isAfter(issueAddedToSprint, sprintStart)) {
          wasNotAddedAfterStart = false;
        }
      }
    }
  }

  return wasNotAddedAfterStart;
}

async function getIssuesWereNotAddedAfterSprintStart(
  boardId: number,
  sprint: Sprint,
  accessToken: string,
  cloudId: string
) {
  const issuesCurrentlyInSprint = await getIssuesFromSprintWithChangelog(
    boardId,
    sprint.id,
    accessToken,
    cloudId
  );

  return issuesCurrentlyInSprint.filter((issue) => wasNotAddedAfterSprintStart(issue, sprint));
}

function wasAddedBeforeSprintStart(issue: IssueWithChangeLog, sprint: Sprint): boolean {
  const historiesOfSprint = getSprintHistory(issue.changelog.histories);

  const sprintStart = parseISO(sprint.startDate);

  let wasAddedBeforeStart = false;

  for (const history of historiesOfSprint) {
    for (const item of history.items) {
      if (item.to === `${sprint.id}`) {
        const issueAddedToSprint = parseISO(history.created);
        if (isBefore(issueAddedToSprint, sprintStart)) {
          wasAddedBeforeStart = true;
        }
      }
      if (wasAddedBeforeStart && item.from === `${sprint.id}`) {
        const issueLeftSprint = parseISO(history.created);
        if (isBefore(issueLeftSprint, sprintStart)) {
          wasAddedBeforeStart = false;
        }
      }
    }
  }

  return wasAddedBeforeStart;
}

async function getIssuesAddedBeforeSprintStart(
  boardId: number,
  sprint: Sprint,
  accessToken: string,
  cloudId: string
): Promise<IssueWithChangeLog[]> {
  const issues = await getIssuesWithChangelog(boardId, accessToken, cloudId);
  return issues.filter((issue) => wasAddedBeforeSprintStart(issue, sprint));
}

export async function getIssuesFromBeforeSprintStart(
  boardId: number,
  sprint: Sprint,
  accessToken: string,
  cloudId: string
) {
  const [issuesWereNotAddedAfterSprintStart, issuesAddedBeforeSprintStart] = await Promise.all([
    getIssuesWereNotAddedAfterSprintStart(boardId, sprint, accessToken, cloudId),
    getIssuesAddedBeforeSprintStart(boardId, sprint, accessToken, cloudId),
  ]);

  const mergedList: IssueWithChangeLog[] = [...issuesWereNotAddedAfterSprintStart];

  issuesAddedBeforeSprintStart.forEach((issueAddedBefore) => {
    if (
      !issuesWereNotAddedAfterSprintStart.some(
        (issueNotAddedAfter) => issueNotAddedAfter.id === issueAddedBefore.id
      )
    ) {
      mergedList.push(issueAddedBefore);
    }
  });

  return mergedList;
}

export function getSumOfEstimations(issues: Issue[]) {
  return issues.reduce((total, issue) => total + (issue.estimation || 0), 0);
}

export async function getEstimatedEffort(
  boardId: number,
  sprint: Sprint,
  accessToken: string,
  cloudId: string
): Promise<number> {
  const issues = await getIssuesFromBeforeSprintStart(boardId, sprint, accessToken, cloudId);

  return getSumOfEstimations(issues);
}

function wasIssueDoneBeforeSprintEnd(sprint: Sprint, issue: IssueWithChangeLog): boolean {
  if (issue.fields.status.statusCategory.name !== 'Done') {
    return false;
  }

  const historiesOfStatus = getStatusHistory(issue.changelog.histories);

  const historiesDesc = historiesOfStatus.sort(
    (a, b) => parseISO(b.created).valueOf() - parseISO(a.created).valueOf()
  );

  const sprintEnd = parseISO(sprint.endDate);

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

export async function getActualEffort(
  boardId: number,
  sprint: Sprint,
  accessToken: string,
  cloudId: string
): Promise<number> {
  const issues = await getIssuesFromSprintWithChangelog(boardId, sprint.id, accessToken, cloudId);

  const issuesDone = issues.filter((issue) => wasIssueDoneBeforeSprintEnd(sprint, issue));

  return getSumOfEstimations(issuesDone);
}

export type SprintAccuracyChartData = Array<{ precision: number; sprintName: string }>;

async function getSprintAccuracy(
  boardId: number,
  sprint: Sprint,
  accessToken: string,
  cloudId: string
): Promise<number> {
  const estimatedEffort = await getEstimatedEffort(boardId, sprint, accessToken, cloudId);
  const actualEffort = await getActualEffort(boardId, sprint, accessToken, cloudId);
  return calculateAccuracy(estimatedEffort, actualEffort);
}

export async function getDataForLineChart(
  boardId: number,
  sprints: Sprint[],
  accessToken: string,
  cloudId: string
): Promise<SprintAccuracyChartData> {
  const accuracyPromises = sprints.map(async (sprint) => {
    const precision = await getSprintAccuracy(boardId, sprint, accessToken, cloudId);
    return { precision: precision, sprintName: sprint.name };
  });

  return Promise.all(accuracyPromises);
}

// A function that takes the estimated effort and the actual effort as parameters and returns the percentage of accuracy
export function calculateAccuracy(estimated: number, actual: number): number {
  // Check if the parameters are valid numbers
  if (actual === 0 || estimated === 0) {
    return 0;
    // Throw an error if not
    // throw new Error('Invalid input');
  }
  const difference = Math.abs(estimated - actual);
  const accuracy = 1 - difference / Math.max(estimated, actual);
  const formattedAccuracy = parseFloat(accuracy.toFixed(2));
  // Return the percentage of accuracy
  return formattedAccuracy * 100;
}
