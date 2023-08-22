import { z } from 'zod';
import { callApi, validateAPIResponse } from '@/lib/jira.service';

export const SprintSchema = z.object({
  id: z.number(),
  state: z.string(),
  name: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  originBoardId: z.number(),
});

export type Sprint = z.infer<typeof SprintSchema>;

export async function getActiveSprint(boardId: number) {
  const response = await callApi(`/rest/agile/1.0/board/${boardId}/sprint?state=active`);

  const JiraResponseSchema = z.object({
    maxResults: z.number(),
    startAt: z.number(),
    isLast: z.boolean(),
    values: z.array(SprintSchema),
  });

  const validatedResponse = validateAPIResponse(JiraResponseSchema, response);

  return validatedResponse.values[0];
}
