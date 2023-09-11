import { z } from 'zod';
import { callApi, validateData } from '@/lib/jira.service';
import { getIssuesWithChangelog, IssueWithChangelogAndFields } from '@/lib/issue.service';
import { isBefore, parseISO } from 'date-fns';

export const SprintSchema = z.object({
  id: z.number(),
  state: z.string(),
  name: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  originBoardId: z.number(),
});

export type Sprint = z.infer<typeof SprintSchema>;

export async function getActiveSprint(
  boardId: string | number,
  accessToken: string,
  cloudId: string
): Promise<Sprint | undefined> {
  const response = await callApi(
    `/rest/agile/1.0/board/${boardId}/sprint`,
    { state: 'active' },
    accessToken,
    cloudId
  );

  const JiraResponseSchema = z.object({
    maxResults: z.number(),
    startAt: z.number(),
    isLast: z.boolean(),
    values: z.array(SprintSchema),
  });

  const validatedResponse = validateData(JiraResponseSchema, response);

  return validatedResponse.values[0];
}

export async function getPreviousSprints(
  boardId: string | number,
  accessToken: string,
  cloudId: string
): Promise<Sprint[]> {
  const response = await callApi(
    `/rest/agile/1.0/board/${boardId}/sprint`,
    { state: 'closed' },
    accessToken,
    cloudId
  );

  const JiraResponseSchema = z.object({
    maxResults: z.number(),
    startAt: z.number(),
    isLast: z.boolean(),
    values: z.array(SprintSchema),
  });

  const { values: sprints } = validateData(JiraResponseSchema, response);

  const sprintsWithIssuesOrNull: Array<Sprint | null> = await Promise.all(
    sprints.map(async (sprint) => {
      if (await hasIssues(boardId, sprint.id, accessToken, cloudId)) {
        return sprint;
      }
      return null;
    })
  );

  return sprintsWithIssuesOrNull.filter((sprint): sprint is Sprint => sprint !== null);
}

export async function hasIssues(
  boardId: string | number,
  sprintId: number,
  accessToken: string,
  cloudId: string
): Promise<boolean> {
  const response = await callApi(
    `/rest/agile/1.0/board/${boardId}/sprint/${sprintId}/issue`,
    {
      maxResults: '1',
    },
    accessToken,
    cloudId
  );

  const IssueSchema = z.object({
    startAt: z.number(),
    maxResults: z.number(),
    total: z.number(),
    issues: z.array(z.unknown()),
  });

  const validatedResponse = validateData(IssueSchema, response);

  return validatedResponse.issues.length === 1;
}
//
// async function getSprintFieldId(
//   boardId: number,
//   sprint: Sprint,
//   accessToken: string,
//   cloudId: string
// ): Promise<string> {
//   const [issue] = await getIssuesFromSprintWithChangelog(boardId, sprintId, { maxResults: '1' });
//
//   if (!issue) {
//     throw 'Error this sprint has no issues yet';
//   }
//
//   let foundItem = null;
//
//   for (const history of issue.changelog.histories) {
//     const item = history.items.find((item) => item.field === 'Sprint' && item.to === `${sprintId}`);
//     if (item) {
//       foundItem = item;
//       break;
//     }
//   }
//
//   if (!foundItem) {
//     throw `There was an error, the issue of key: ${issue.key} doesn't appear in the sprint ${sprintId} in his changelog`;
//   }
//
//   const sprintUnknown = issue.fields[foundItem.fieldId];
//
//   const sprint = validateData(z.object({ id: z.number() }), sprintUnknown);
//
//   if (sprint.id !== sprintId) {
//     throw `There was an error, the issue of key: ${issue.key} isn't in the sprint ${sprintId} currently`;
//   }
//
//   return foundItem.fieldId;
// }

function getSprintHistory(histories: IssueWithChangelogAndFields['changelog']['histories']) {
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

function wasAddedBeforeSprintStart(issue: IssueWithChangelogAndFields, sprint: Sprint): boolean {
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

async function filterIssuesFromSprintStart(
  issues: IssueWithChangelogAndFields[],
  sprint: Sprint
): Promise<IssueWithChangelogAndFields[]> {
  return issues.filter((issue) => wasAddedBeforeSprintStart(issue, sprint));
}

export async function getEstimatedEffort(
  boardId: number | string,
  sprint: Sprint,
  accessToken: string,
  cloudId: string
) {
  // get all issues
  const issues = await getIssuesWithChangelog(boardId, accessToken, cloudId);
  // get issues that were in the sprint id
  const sprintIssues = await filterIssuesFromSprintStart(issues, sprint);

  // get estimation of sprints
  const sprintEstimation = sprintIssues.reduce(
    (total, issue) => total + (issue.estimation || 0),
    0
  );

  return sprintEstimation;

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
