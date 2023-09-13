import { Sprint } from '@/lib/sprint.service';

import { isAfter, isBefore, parseISO } from 'date-fns';
import {
  getIssuesFromSprintWithChangelog,
  getIssuesWithChangelog,
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

  console.log(
    'estimated issues',
    issues.map((issue) => issue.key)
  );

  return issues.reduce((total, issue) => total + (issue.estimation || 0), 0);
}

export async function getActualEffort(
  boardId: number | string,
  sprint: Sprint,
  accessToken: string,
  cloudId: string
): Promise<number> {
  const issues = await getIssuesFromSprintWithTimeSpent(boardId, sprint.id, accessToken, cloudId);

  console.log(
    'actual issues',
    issues.map((issue) => issue.key)
  );

  return issues.reduce((total, issue) => total + (issue.estimation || 0), 0);
}

export type MaturitySprintDataSet = Array<{ precision: number; sprint: string }>;

export async function getDataForLineChart(
  boardId: number | string,
  sprints: Sprint[],
  accessToken: string,
  cloudId: string
): Promise<MaturitySprintDataSet> {
  const chartData: MaturitySprintDataSet = [];
  for (const sprint of sprints) {
    const estimatedEffort = await getEstimatedEffort(boardId, sprint, accessToken, cloudId);
    const actualEffort = await getActualEffort(boardId, sprint, accessToken, cloudId);
    const accuracy = calculateAccuracy(estimatedEffort, actualEffort);
    chartData.push({ precision: accuracy, sprint: sprint.name });
    console.log('estimated effort: ', estimatedEffort, 'actual effort: ', actualEffort);
  }
  return chartData;
}

// A function that takes the estimated effort and the actual effort as parameters and returns the percentage of accuracy
function calculateAccuracy(estimatedEffort: number, actualEffort: number): number {
  // Check if the parameters are valid numbers
  if (isNaN(estimatedEffort) || isNaN(actualEffort) || actualEffort === 0) {
    // Throw an error if not
    throw new Error('Invalid input');
  }
  // Calculate the relative error
  const relativeError = (estimatedEffort - actualEffort) / actualEffort;
  // Take the absolute value of the relative error
  const absoluteError = Math.abs(relativeError);
  // Calculate the accuracy
  const accuracy = 1 - absoluteError;
  // Convert the accuracy to percentage
  // Return the percentage of accuracy
  return accuracy * 100;
}
