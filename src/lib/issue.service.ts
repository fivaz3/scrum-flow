import { z } from 'zod';
import { callApi, validateData } from '@/lib/jira.service';

const IssueSchema = z.object({
  id: z.string(),
  fields: z.object({
    summary: z.string(),
    estimation: z.number().nullable(),
    status: z.object({
      id: z.string(),
      name: z.string(),
    }),
  }),
});

export type Issue = z.infer<typeof IssueSchema>;

async function getBoardConfiguration(boardId: number) {
  const response = await callApi(`/rest/agile/1.0/board/${boardId}/configuration`);

  return validateData(
    z.object({
      estimation: z.object({
        type: z.string(),
        field: z.object({
          fieldId: z.string(),
          displayName: z.string(),
        }),
      }),
    }),
    response
  );
}

async function transformIssues(boardId: number, response: unknown) {
  const configuration = await getBoardConfiguration(boardId);

  const IssueSchemaTransformation = z.object({
    startAt: z.number(),
    maxResults: z.number(),
    total: z.number(),
    issues: z.array(
      z
        .object({
          id: z.string(),
          fields: z
            .object({
              [configuration.estimation.field.fieldId]: z.number().nullable(),
            })
            .passthrough(),
        })
        .passthrough()
    ),
  });

  const { issues } = validateData(IssueSchemaTransformation, response);

  const formattedIssues = issues.map((issue) => ({
    ...issue,
    fields: {
      ...issue.fields,
      estimation: issue.fields[configuration.estimation.field.fieldId],
    },
  }));

  return validateData(z.array(IssueSchema), formattedIssues);
}

// TODO add pagination
// TODO these issues have too many useless attributes, I should request only those I need
export async function getIssuesFromSprint(boardId: number, sprintId: number): Promise<Issue[]> {
  const response = await callApi(`/rest/agile/1.0/board/${boardId}/sprint/${sprintId}/issue`);

  return await transformIssues(boardId, response);
}
