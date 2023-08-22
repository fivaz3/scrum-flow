import { z } from 'zod';
import { callApi, validateAPIResponse } from '@/lib/jira.service';

export const IssueSchema = z.object({
  id: z.string(),
  fields: z.object({
    summary: z.string(),
    status: z.object({
      id: z.string(),
      name: z.string(),
    }),
  }),
});

export type Issue = z.infer<typeof IssueSchema>;

// TODO add pagination
// TODO these issues have too many useless attributes, I should request only those I need
export async function getIssuesFromSprint(boardId: number, sprintId: number) {
  const response = await callApi(`/rest/agile/1.0/board/${boardId}/sprint/${sprintId}/issue`);

  const validatedResponse = validateAPIResponse(
    z.object({
      startAt: z.number(),
      maxResults: z.number(),
      total: z.number(),
      issues: z.array(IssueSchema),
    }),
    response
  );

  return validatedResponse.issues;
}

async function getIssueEstimationField(boardId: number, issueId: string) {
  const response = await callApi(`/rest/agile/1.0/issue/${issueId}/estimation?boardId=${boardId}`);

  const validatedResponse = validateAPIResponse(
    z.object({
      fieldId: z.string(),
    }),
    response
  );

  return validatedResponse.fieldId;
}
