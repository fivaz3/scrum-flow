// TODO add a eslint plugin that will fix my imports merging them possible

// async function addEstimationToIssues(
//   boardId: string | number,
//   rawIssues: unknown,
//   accessToken: string,
//   cloudId: string
// ): Promise<Issue[]> {
//   const configuration = await getBoardConfiguration(boardId, accessToken, cloudId);
//
//   const IssueSchemaTransformation = z.object({
//     startAt: z.number(),
//     maxResults: z.number(),
//     total: z.number(),
//     issues: z.array(
//       z
//         .object({
//           fields: z
//             .object({
//               [configuration.estimation.field.fieldId]: z.number().nullable(),
//             })
//             .passthrough(),
//         })
//         .passthrough()
//     ),
//   });
//
//   const { issues } = validateData(IssueSchemaTransformation, rawIssues);
//
//   const issuesWithEstimation = issues.map((issue) => ({
//     ...issue,
//     estimation: issue.fields[configuration.estimation.field.fieldId],
//   }));
//
//   return validateData(z.array(IssueSchema), issuesWithEstimation);
// }
//
// // TODO add  pagination
// // TODO these issues have too many useless attributes, I should request only those I need
// export async function getIssuesFromSprint(
//   boardId: string | number,
//   sprintId: number,
//   queryParams: Record<string, string>,
//   accessToken: string,
//   cloudId: string
// ): Promise<Issue[]> {
//   const response = await callApi(
//     `/rest/agile/1.0/board/${boardId}/sprint/${sprintId}/issue`,
//     queryParams,
//     accessToken,
//     cloudId
//   );
//
//   return await addEstimationToIssues(boardId, response, accessToken, cloudId);
// }
//
// export async function getIssues(
//   boardId: string | number,
//   queryParams: Record<string, string>,
//   accessToken: string,
//   cloudId: string
// ): Promise<Issue[]> {
//   const response = await callApi(
//     `/rest/agile/1.0/board/${boardId}/issue`,
//     queryParams,
//     accessToken,
//     cloudId
//   );
//
//   return await addEstimationToIssues(boardId, response, accessToken, cloudId);
// }
//
// export async function getIssuesWithChangelog(
//   boardId: string | number,
//   accessToken: string,
//   cloudId: string
// ): Promise<IssueWithChangelogAndFields[]> {
//   const issues = await getIssues(
//     boardId,
//     {
//       expand: 'changelog',
//       jql: 'issuetype=Story',
//     },
//     accessToken,
//     cloudId
//   );
//
//   return validateData(z.array(IssueWithChangelogAndFieldsSchema), issues);
// }
