import { Sprint } from '@/lib/sprint.service';
import {
  addEstimationToIssuesWithChangeLog,
  getIssuesFromSprintWithChangelog,
  IssueWithChangeLog,
} from '@/components/IssueTable/issue-time-spent.service';
import { isAfter, isBefore, parseISO } from 'date-fns';
import { callApi } from '@/lib/jira.service';

export async function getIssuesWithChangelog(
  boardId: string | number,
  accessToken: string,
  cloudId: string
): Promise<IssueWithChangeLog[]> {
  const issuesPaginated = await callApi(
    `/rest/agile/1.0/board/${boardId}/issue`,
    {
      expand: 'changelog',
      jql: 'issuetype=Story',
    },
    accessToken,
    cloudId
  );

  return await addEstimationToIssuesWithChangeLog(boardId, issuesPaginated, accessToken, cloudId);
}

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
          console.log(`first if - ${parseISO(history.created)} is before ${startDate}`);
          console.log(
            'for issue key',
            issue.key,
            'item.to is ',
            item.to,
            ' and item.field is ',
            item.field
          );
          wasAddedBeforeStart = true;
        } else {
          console.log(`first if - ${parseISO(history.created)} is not before ${startDate}`);
        }
      }
      if (wasAddedBeforeStart && item.from === `${sprint.id}`) {
        if (isBefore(parseISO(history.created), startDate)) {
          console.log(`second if - ${parseISO(history.created)} is before ${startDate}`);
          wasAddedBeforeStart = false;
        } else {
          console.log(`second if - ${parseISO(history.created)} is not before ${startDate}`);
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
) {
  const issues = await getIssuesFromBeforeSprintStart(boardId, sprint, accessToken, cloudId);

  console.log(
    'issues',
    issues.map((issue) => issue.key)
  );

  // get estimation of sprints
  // const sprintEstimation = sprintIssues.reduce(
  //   (total, issue) => total + (issue.estimation || 0),
  //   0
  // );

  // return sprintEstimation;

  // const sprintFieldId = await getSprintFieldId(boardId, sprint, accessToken, cloudId);
  // get issues
  // filter issues to get only the history of sprint change
  // for each issue get if it didn't move to another sprint before the sprint start
  //   const configuration = await getBoardConfiguration(boardId);
  //
  //   const estimationKey = configuration.estimation.field.fieldId;
  //
  //   const issues = await getIssuesWithChangelog(boardId);
  // const filteredIssues = issues.map((issue) => ({
  //   ...issue,
  //   changelog: {
  //     ...issue.changelog,
  //     histories: issue.changelog.histories
  //       .map((history) => ({
  //         ...history,
  //         items: history.items.filter((item) => item.fieldId === sprintFieldId),
  //       }))
  //       .filter((history) => history.items.length > 0),
  //   },
  // }));
}
