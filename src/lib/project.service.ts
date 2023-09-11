import { z } from 'zod';
import { callApi, validateData } from '@/lib/jira.service';

export async function getInProgressStatuses(
  accessToken: string,
  cloudId: string
): Promise<string[]> {
  // TODO make this variable available later
  const projectId = '10001';
  const response = await callApi(
    `/rest/api/2/project/${projectId}/statuses`,
    {},
    accessToken,
    cloudId
  );

  const projectStatuses = validateData(
    z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        statuses: z.array(
          z.object({
            id: z.string(),
            name: z.string(),
            statusCategory: z.object({
              id: z.number(),
              key: z.string(),
              name: z.string(),
            }),
          })
        ),
      })
    ),
    response
  );

  const taskStatus = projectStatuses.find((projectStatus) => projectStatus.name === 'Task');

  if (!taskStatus) {
    throw Error(
      'There is an error with your Jira application, you might have deleted your Task statuses'
    );
  }

  const inProgressStatuses = taskStatus.statuses.filter(
    (status) => status.statusCategory.name === 'In Progress'
  );

  if (inProgressStatuses.length === 0) {
    throw Error(
      'There is an error with your Jira application, you might have deleted your in Progress statuses'
    );
  }

  return inProgressStatuses.map((inProgressStatus) => inProgressStatus.name);
}
