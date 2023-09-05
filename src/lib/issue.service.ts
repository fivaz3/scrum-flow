import { z } from 'zod';
import { callApi, validateData } from '@/lib/jira.service';
import { getBoardConfiguration } from '@/lib/board.service';
import { differenceInSeconds, parseISO } from 'date-fns';
import { getInProgressStatuses } from '@/lib/project.service';

const IssueSchema = z.object({
  id: z.string(),
  fields: z.object({
    summary: z.string(),
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

export type IssueWithTimeSpent = Issue & { timeSpent: number };

async function addEstimationToIssues(boardId: string | number, rawIssues: unknown) {
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

  const { issues } = validateData(IssueSchemaTransformation, rawIssues);

  return issues.map((issue) => ({
    ...issue,
    estimation: issue.fields[configuration.estimation.field.fieldId],
  }));
}

// TODO add  pagination
// TODO these issues have too many useless attributes, I should request only those I need
export async function getIssuesFromSprint(
  boardId: string | number,
  sprintId: number,
  queryParams: Record<string, string>
) {
  const response = await callApi(
    `/rest/agile/1.0/board/${boardId}/sprint/${sprintId}/issue`,
    queryParams
  );

  return await addEstimationToIssues(boardId, response);
}

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
              fieldId: z.string(),
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

export async function getIssuesFromSprintWithChangelog(boardId: string | number, sprintId: number) {
  // issuetype=Story exclude Sub-tasks issues
  const issues = await getIssuesFromSprint(boardId, sprintId, {
    expand: 'changelog',
    jql: 'issuetype=Story',
  });

  const issuesWithChangelog = validateData(z.array(IssueWithChangeLogSchema), issues);

  const issuesWithTimeSpent = await Promise.all(
    issuesWithChangelog.map(async (issue) => ({
      ...issue,
      timeSpent: await getTimeInProgress(issue),
    }))
  );

  const toDoIssues = issuesWithTimeSpent.filter(
    (issue) => issue.fields.status.statusCategory.name === 'To Do'
  );

  const doingIssues = issuesWithTimeSpent.filter(
    (issue) => issue.fields.status.statusCategory.name === 'In Progress'
  );

  const doneIssues = issuesWithTimeSpent.filter(
    (issue) => issue.fields.status.statusCategory.name === 'Done'
  );

  return {
    toDoIssues,
    doingIssues,
    doneIssues,
  };
}

async function getTimeInProgress(issue: IssueWithChangeLog): Promise<number> {
  const inProgressColumns = await getInProgressStatuses();

  let inProgressStart: Date | null = null;
  let totalTimeSpentInProgress = 0;

  // sort histories by date
  issue.changelog.histories.sort(
    (a, b) => parseISO(a.created).valueOf() - parseISO(b.created).valueOf()
  );

  function hasMovedToInProgress(item: IssueWithChangeLog['changelog']['histories'][0]['items'][0]) {
    return !!(
      item.fromString &&
      !inProgressColumns.includes(item.fromString) &&
      item.toString &&
      inProgressColumns.includes(item.toString)
    );
  }

  function hasLeftInProgress(item: IssueWithChangeLog['changelog']['histories'][0]['items'][0]) {
    return !!(
      item.fromString &&
      inProgressColumns.includes(item.fromString) &&
      item.toString &&
      !inProgressColumns.includes(item.toString)
    );
  }

  // remove history that isn't about status
  const historiesOfStatus = issue.changelog.histories.map((history) => {
    history.items.filter((item) => item.fieldId === 'status');
    return history;
  });

  for (const history of historiesOfStatus) {
    for (const item of history.items) {
      if (!inProgressStart && hasMovedToInProgress(item)) {
        // Issue moved to "In Progress"
        inProgressStart = parseISO(history.created);
      } else if (inProgressStart && hasLeftInProgress(item)) {
        // Issue moved out of "In Progress"
        const inProgressStopped = parseISO(history.created);
        const durationInProgress = differenceInSeconds(inProgressStopped, inProgressStart);
        totalTimeSpentInProgress += durationInProgress;
        inProgressStart = null;
      }
    }
  }

  if (inProgressStart && issue.fields.status.statusCategory.name === 'In Progress') {
    //if the issue is still ongoing get the time spent related to now
    const now = new Date();
    const currentDuration = differenceInSeconds(now, inProgressStart);
    totalTimeSpentInProgress += currentDuration;
  }

  return totalTimeSpentInProgress;
}
