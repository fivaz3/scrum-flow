import { Sprint } from '@/lib/sprint.service';
import { getIssuesFromBeforeSprintStart } from '@/lib/issue/issue-sprint.service';

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
