import { z } from 'zod';
import { callApi, validateData } from '@/lib/jira.service';

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
