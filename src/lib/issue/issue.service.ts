import { z } from 'zod';
import { MemberSchema } from '@/app/(dashboard)/schedules/Calendar/member.service';
import { callApi, validateData } from '@/lib/jira.service';
import { getBoardConfiguration } from '@/lib/board.service';

// TODO add a eslint plugin that will fix my imports merging them possible
// // TODO add  pagination
// // TODO these issues have too many useless attributes, I should request only those I need

export const IssueSchema = z.object({
  id: z.string(),
  key: z.string(),
  fields: z.object({
    summary: z.string(),
    assignee: MemberSchema.nullable(),
    status: z.object({
      id: z.string(),
      name: z.string(),
      statusCategory: z.object({
        id: z.number(),
        name: z.string(),
      }),
    }),
  }),
  estimation: z.number().nullable(),
});

export type Issue = z.infer<typeof IssueSchema>;

export type IssueWithTimeSpent = Issue & {
  timeSpent: number;
};

const IssueWithChangeLogSchema = IssueSchema.merge(
  z.object({
    changelog: z.object({
      startAt: z.number(),
      maxResults: z.number(),
      total: z.number(),
      histories: z.array(
        z.object({
          id: z.string(),
          created: z.string(),
          items: z.array(
            z.object({
              field: z.string(),
              fieldId: z.string().optional(),
              from: z.string().nullable(),
              fromString: z.string().nullable(),
              to: z.string().nullable(),
              toString: z.string().nullable(),
            })
          ),
        })
      ),
    }),
  })
);

export type IssueWithChangeLog = z.infer<typeof IssueWithChangeLogSchema>;

export async function addEstimationToIssuesWithChangeLog(
  boardId: number,
  issuesPaginated: unknown,
  accessToken: string,
  cloudId: string
): Promise<IssueWithChangeLog[]> {
  const configuration = await getBoardConfiguration(boardId, accessToken, cloudId);

  const IssueSchemaTransformation = z.object({
    startAt: z.number(),
    maxResults: z.number(),
    total: z.number(),
    issues: z.array(
      z
        .object({
          fields: z
            .object({
              [configuration.estimation.field.fieldId]: z.number().nullable(),
            })
            .passthrough(),
        })
        .passthrough()
    ),
  });

  const { issues } = validateData(IssueSchemaTransformation, issuesPaginated);

  const issuesWithEstimation = issues.map((issue) => ({
    ...issue,
    estimation: issue.fields[configuration.estimation.field.fieldId],
  }));

  return validateData(z.array(IssueWithChangeLogSchema), issuesWithEstimation);
}

export async function getIssuesWithChangelog(
  boardId: number,
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

export async function getIssuesFromSprintWithChangelog(
  boardId: number,
  sprintId: number,
  accessToken: string,
  cloudId: string
): Promise<IssueWithChangeLog[]> {
  const issuesPaginated = await callApi(
    `/rest/agile/1.0/board/${boardId}/sprint/${sprintId}/issue`,
    {
      expand: 'changelog',
      jql: 'issuetype=Story',
    },
    accessToken,
    cloudId
  );

  return await addEstimationToIssuesWithChangeLog(boardId, issuesPaginated, accessToken, cloudId);
}
