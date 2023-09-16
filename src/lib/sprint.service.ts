import { z } from 'zod';
import { callApi, validateData } from '@/lib/jira.service';

export const SprintSchema = z.object({
  id: z.number(),
  state: z.string(),
  name: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  completeDate: z.string().optional(),
  originBoardId: z.number(),
});

export type Sprint = z.infer<typeof SprintSchema>;

const ActiveSprintSchema = SprintSchema.omit({ completeDate: true });

export type ActiveSprint = z.infer<typeof ActiveSprintSchema>;

const ClosedSprintSchema = SprintSchema.merge(z.object({ completeDate: z.string() }));

export type ClosedSprint = z.infer<typeof ClosedSprintSchema>;

export async function getActiveSprint(
  boardId: number,
  accessToken: string,
  cloudId: string
): Promise<ActiveSprint | undefined> {
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
    values: z.array(ActiveSprintSchema),
  });

  const validatedResponse = validateData(JiraResponseSchema, response);

  return validatedResponse.values[0];
}

export async function getClosedSprints(
  boardId: number,
  accessToken: string,
  cloudId: string
): Promise<ClosedSprint[]> {
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
    values: z.array(ClosedSprintSchema),
  });

  const { values: sprints } = validateData(JiraResponseSchema, response);

  const sprintsWithIssuesOrNull: Array<ClosedSprint | null> = await Promise.all(
    sprints.map(async (sprint) => {
      if (await hasIssues(boardId, sprint.id, accessToken, cloudId)) {
        return sprint;
      }
      return null;
    })
  );

  return sprintsWithIssuesOrNull.filter((sprint): sprint is ClosedSprint => sprint !== null);
}

export async function hasIssues(
  boardId: number,
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
