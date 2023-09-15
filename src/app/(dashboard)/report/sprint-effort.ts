import { Sprint } from '@/lib/sprint.service';

import { isAfter, isBefore, parseISO } from 'date-fns';
import {
  getIssuesFromSprintWithChangelog,
  getIssuesWithChangelog,
  Issue,
  IssueWithChangeLog,
} from '@/lib/issue/issue.service';
import { getIssuesFromSprintWithTimeSpent } from '@/lib/issue/issue-time-spent.service';

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
  const historiesOfStatus = getSprintHistory(issue.changelog.histories);

  const startDate = parseISO(sprint.startDate);

  let wasNotAddedAfterStart = true;

  for (const history of historiesOfStatus) {
    for (const item of history.items) {
      if (item.to === `${sprint.id}`) {
        if (isAfter(parseISO(history.created), startDate)) {
          wasNotAddedAfterStart = false;
        }
      }
    }
  }

  return wasNotAddedAfterStart;
}

async function getIssuesWereNotAddedAfterSprintStart(
  boardId: number | string,
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
  const historiesOfStatus = getSprintHistory(issue.changelog.histories);

  // console.log('sprint', sprint);

  const startDate = parseISO(sprint.startDate);

  let wasAddedBeforeStart = false;

  for (const history of historiesOfStatus) {
    for (const item of history.items) {
      if (item.to === `${sprint.id}`) {
        if (isBefore(parseISO(history.created), startDate)) {
          // console.log(`first if - ${parseISO(history.created)} is before ${startDate}`);
          // console.log(
          //   'for issue key',
          //   issue.key,
          //   'item.to is ',
          //   item.to,
          //   ' and item.field is ',
          //   item.field
          // );
          wasAddedBeforeStart = true;
        } else {
          // console.log(`first if - ${parseISO(history.created)} is not before ${startDate}`);
        }
      }
      if (wasAddedBeforeStart && item.from === `${sprint.id}`) {
        if (isBefore(parseISO(history.created), startDate)) {
          // console.log(`second if - ${parseISO(history.created)} is before ${startDate}`);
          wasAddedBeforeStart = false;
        } else {
          // console.log(`second if - ${parseISO(history.created)} is not before ${startDate}`);
        }
      }
    }
  }

  return wasAddedBeforeStart;
}

async function filterIssuesAddedBeforeSprintStart(
  issues: IssueWithChangeLog[],
  sprint: Sprint
): Promise<IssueWithChangeLog[]> {
  return issues.filter((issue) => wasAddedBeforeSprintStart(issue, sprint));
}

async function getIssuesAddedBeforeSprintStart(
  boardId: number | string,
  sprint: Sprint,
  accessToken: string,
  cloudId: string
): Promise<IssueWithChangeLog[]> {
  const issues = await getIssuesWithChangelog(boardId, accessToken, cloudId);
  return await filterIssuesAddedBeforeSprintStart(issues, sprint);
}

export async function getIssuesFromBeforeSprintStart(
  boardId: number | string,
  sprint: Sprint,
  accessToken: string,
  cloudId: string
) {
  const [issuesWereNotAddedAfterSprintStart, issuesAddedBeforeSprintStart] = await Promise.all([
    getIssuesWereNotAddedAfterSprintStart(boardId, sprint, accessToken, cloudId),
    getIssuesAddedBeforeSprintStart(boardId, sprint, accessToken, cloudId),
  ]);

  const mergedList: IssueWithChangeLog[] = [...issuesWereNotAddedAfterSprintStart];

  issuesAddedBeforeSprintStart.forEach((item2) => {
    if (!issuesWereNotAddedAfterSprintStart.some((item1) => item1.id === item2.id)) {
      mergedList.push(item2);
    }
  });

  return mergedList;
}

export async function getEstimatedEffort(
  boardId: number | string,
  sprint: Sprint,
  accessToken: string,
  cloudId: string
): Promise<number> {
  const issues = await getIssuesFromBeforeSprintStart(boardId, sprint, accessToken, cloudId);

  // console.log(
  //   'estimated issues',
  //   issues.map((issue) => issue.key)
  // );

  return issues.reduce((total, issue) => total + (issue.estimation || 0), 0);
}

export async function getActualEffort(
  boardId: number | string,
  sprint: Sprint,
  accessToken: string,
  cloudId: string
): Promise<number> {
  const issues = await getIssuesFromSprintWithTimeSpent(boardId, sprint.id, accessToken, cloudId);

  return getSumOfEstimations(issues);
}

export function getSumOfEstimations(issues: Issue[]) {
  return issues.reduce((total, issue) => total + (issue.estimation || 0), 0);
}

export type SprintAccuracyChartData = Array<{ precision: number; sprintName: string }>;

async function getSprintAccuracy(
  boardId: number | string,
  sprint: Sprint,
  accessToken: string,
  cloudId: string
): Promise<number> {
  const estimatedEffort = await getEstimatedEffort(boardId, sprint, accessToken, cloudId);
  const actualEffort = await getActualEffort(boardId, sprint, accessToken, cloudId);
  return calculateAccuracy(estimatedEffort, actualEffort);
}

export async function getDataForLineChart(
  boardId: number | string,
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
