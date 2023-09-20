import { Sprint } from '@/lib/sprint.service';

import { isAfter, isBefore, parseISO } from 'date-fns';
import {
  getIssuesFromSprintWithChangelog,
  getIssuesWithChangelog,
  Issue,
  IssueWithChangeLog,
} from '@/lib/issue/issue.service';
import { SprintBreakThrough } from '@/app/(dashboard)/report/sprints-section/service';

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

export type SprintAccuracyChartData = Array<{ accuracy: number; sprintName: string }>;

function getSprintAccuracy(sprint: SprintBreakThrough): number {
  const estimatedEffort = getSumOfEstimations(sprint.estimatedIssues);
  const actualEffort = getSumOfEstimations(sprint.actualIssues);
  return calculateAccuracy(estimatedEffort, actualEffort);
}

export function getDataForLineChart(sprints: SprintBreakThrough[]): SprintAccuracyChartData {
  return sprints.map((sprint) => {
    return { accuracy: getSprintAccuracy(sprint), sprintName: sprint.name };
  });
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
  // get percentage of accuracy
  const accuracyPercentage = accuracy * 100;
  return parseFloat(accuracyPercentage.toFixed(2));
}
