import { z } from 'zod';
import { callApi, validateData } from '@/lib/jira.service';
import { getBoardConfiguration } from '@/lib/board.service';
import {
  addDays,
  differenceInSeconds,
  endOfDay,
  getHours,
  isSameDay,
  parseISO,
  setHours,
  startOfDay,
} from 'date-fns';
import { getInProgressStatuses } from '@/lib/project.service';
import { MemberSchema } from '@/app/settings/Calendar/member.service';
// TODO add a eslint plugin that will fix my imports merging them possible

const IssueSchema = z.object({
  id: z.string(),
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

  let inProgressStart: Date | null = null;
  let totalTimeSpentInProgress = 0;

  for (const history of historiesOfStatus) {
    for (const item of history.items) {
      if (!inProgressStart && hasMovedToInProgress(item)) {
        // Issue moved to "In Progress"
        inProgressStart = parseISO(history.created);
        // Check if inProgressStart is within working hours
        if (getHours(inProgressStart) < 9) {
          // Set inProgressStart to 09:00
          inProgressStart = setHours(inProgressStart, 9);
        }
      } else if (inProgressStart && hasLeftInProgress(item)) {
        // Issue moved out of "In Progress"
        let inProgressStopped = parseISO(history.created);
        // Check if inProgressStopped is within working hours
        if (getHours(inProgressStopped) > 18) {
          // Set inProgressStopped to 18:00
          inProgressStopped = setHours(inProgressStopped, 18);
        }

        // Check if inProgressStart and inProgressStopped are on different days
        if (isSameDay(inProgressStart, inProgressStopped)) {
          // Calculate duration for a single day
          const durationInProgress = differenceInSeconds(inProgressStopped, inProgressStart);
          totalTimeSpentInProgress += durationInProgress;
        } else {
          // Calculate duration for multiple days
          let currentDate = startOfDay(inProgressStart);
          const endDate = endOfDay(inProgressStopped);
          while (currentDate <= endDate) {
            if (isSameDay(currentDate, inProgressStart)) {
              // First day
              const endOfDayTime = setHours(currentDate, 18);
              const durationInProgress = differenceInSeconds(endOfDayTime, inProgressStart);
              totalTimeSpentInProgress += durationInProgress;
            } else if (isSameDay(currentDate, inProgressStopped)) {
              // Last day
              const startOfDayTime = setHours(currentDate, 9);
              const durationInProgress = differenceInSeconds(inProgressStopped, startOfDayTime);
              totalTimeSpentInProgress += durationInProgress;
            } else {
              // In-between days
              totalTimeSpentInProgress += 9 * 60 * 60; // Add 9 hours for a full working day
            }
            currentDate = addDays(currentDate, 1); // Move to next day
          }
        }

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
