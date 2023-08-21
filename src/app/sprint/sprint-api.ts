import { z } from 'zod';
import { validateJiraResponse } from '@/app/sprint/jira-api';

export const SprintSchema = z.object({
  id: z.number(),
  state: z.string(),
  name: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  originBoardId: z.number(),
});

export type SprintApi = z.infer<typeof SprintSchema>;

function validateSprint(data: unknown): SprintApi | void {
  const jiraResponse = validateJiraResponse(data);

  if (jiraResponse.values.length === 0) {
    return;
  }

  const result = SprintSchema.safeParse(jiraResponse.values[0]);

  if (!result.success) {
    console.error(result.error.errors);
    throw Error("This sprint doesn't match its type");
  }

  return result.data;
}

// const url = `https://api.atlassian.com/ex/jira/${cloudId}/rest/api/3/project`;
export async function getActiveSprint(accessToken: string, cloudId: string) {
  const url = `https://api.atlassian.com/ex/jira/${cloudId}/rest/agile/1.0/board/2/sprint?state=active`;

  const res = await fetch(url, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    console.error('failed fetch active sprint', await res.text());
    throw Error(`Failed to fetch active sprint`);
  }

  const response = await res.json();

  return validateSprint(response);
}
