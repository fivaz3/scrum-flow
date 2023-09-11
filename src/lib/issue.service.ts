import { z } from 'zod';
import { callApi, validateData } from '@/lib/jira.service';
import { getBoardConfiguration } from '@/lib/board.service';
import {
  differenceInMinutes,
  eachDayOfInterval,
  getDay,
  isSameDay,
  isWithinInterval,
  parseISO,
  set,
} from 'date-fns';
import { getInProgressStatuses } from '@/lib/project.service';
import { MemberSchema } from '@/app/(dashboard)/settings/Calendar/member.service';
import {
  getMemberSchedule,
  getSchedulesServer,
  Schedule,
} from '@/app/(dashboard)/settings/Calendar/schedule.service';
// TODO add a eslint plugin that will fix my imports merging them possible

const IssueSchema = z.object({
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

export type IssueWithTimeSpent = Issue & { timeSpent: number };

async function addEstimationToIssues(
  boardId: string | number,
  rawIssues: unknown,
  accessToken: string,
  cloudId: string
) {
  const configuration = await getBoardConfiguration(boardId, accessToken, cloudId);

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
  queryParams: Record<string, string>,
  accessToken: string,
  cloudId: string
) {
  const response = await callApi(
    `/rest/agile/1.0/board/${boardId}/sprint/${sprintId}/issue`,
    queryParams,
    accessToken,
    cloudId
  );

  return await addEstimationToIssues(boardId, response, accessToken, cloudId);
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

export async function getIssuesFromSprintWithChangelog(
  boardId: string | number,
  sprintId: number,
  accessToken: string,
  cloudId: string
) {
  // issuetype=Story exclude Sub-tasks issues
  const issues = await getIssuesFromSprint(
    boardId,
    sprintId,
    {
      expand: 'changelog',
      jql: 'issuetype=Story',
    },
    accessToken,
    cloudId
  );

  const issuesWithChangelog = validateData(z.array(IssueWithChangeLogSchema), issues);

  // for (const issue of issuesWithChangelog) {
  //   for (const history of issue.changelog.histories) {
  //     for (const item of history.items) {
  //       if (!item.fieldId) {
  //         console.log('issue.key', issue.key);
  //         console.log('history.id', history.id);
  //         console.log('item', item);
  //       }
  //     }
  //   }
  // }

  const schedules = await getSchedulesServer();

  return await Promise.all(
    issuesWithChangelog.map(async (issue) => ({
      ...issue,
      timeSpent: await getTimeInProgress(issue, schedules, accessToken, cloudId),
    }))
  );
}

async function hasMovedToInProgress(
  item: IssueWithChangeLog['changelog']['histories'][0]['items'][0],
  accessToken: string,
  cloudId: string
) {
  const inProgressColumns = await getInProgressStatuses(accessToken, cloudId);
  return !!(
    item.fromString &&
    !inProgressColumns.includes(item.fromString) &&
    item.toString &&
    inProgressColumns.includes(item.toString)
  );
}

async function hasLeftInProgress(
  item: IssueWithChangeLog['changelog']['histories'][0]['items'][0],
  accessToken: string,
  cloudId: string
) {
  const inProgressColumns = await getInProgressStatuses(accessToken, cloudId);
  return !!(
    item.fromString &&
    inProgressColumns.includes(item.fromString) &&
    item.toString &&
    !inProgressColumns.includes(item.toString)
  );
}

function getStatusHistory(histories: IssueWithChangeLog['changelog']['histories']) {
  // sort histories by date
  histories.sort((a, b) => parseISO(a.created).valueOf() - parseISO(b.created).valueOf());

  // remove history that isn't about status
  const remainingHistories = histories.map((history) => {
    return {
      ...history,
      items: history.items.filter((item) => item.fieldId === 'status'),
    };
  });

  return remainingHistories.filter((history) => history.items.length > 0);
}

async function getTimeInProgress(
  issue: IssueWithChangeLog,
  workingSchedules: Schedule[],
  accessToken: string,
  cloudId: string
): Promise<number> {
  if (workingSchedules.length === 0) {
    return -1;
  }

  const memberSchedule = getMemberSchedule(issue, workingSchedules);

  const historiesOfStatus = getStatusHistory(issue.changelog.histories);

  let inProgressStart: Date | null = null;
  let totalTimeSpentInProgressInMinutes = 0;

  for (const history of historiesOfStatus) {
    for (const item of history.items) {
      if (!inProgressStart && (await hasMovedToInProgress(item, accessToken, cloudId))) {
        inProgressStart = parseISO(history.created); // start tracking time
      } else if (inProgressStart && (await hasLeftInProgress(item, accessToken, cloudId))) {
        totalTimeSpentInProgressInMinutes += calculateTimeInMinutes(
          memberSchedule,
          inProgressStart,
          parseISO(history.created)
        );
        inProgressStart = null; // stop tracking time
      }
    }
  }

  if (inProgressStart && issue.fields.status.statusCategory.name === 'In Progress') {
    // issue is still in progress
    totalTimeSpentInProgressInMinutes += calculateTimeInMinutes(
      memberSchedule,
      inProgressStart,
      new Date()
    );
  }

  return totalTimeSpentInProgressInMinutes;
}

function calculateTimeInMinutes(
  workingSchedules: Schedule[],
  taskStartedAt: Date,
  taskEndedAt: Date
): number {
  let totalMinutes = 0;

  eachDayOfInterval({ start: taskStartedAt, end: taskEndedAt }).forEach((day) => {
    workingSchedules.forEach((schedule) => {
      if (
        isWithinInterval(day, {
          start: new Date(schedule.startDate),
          end: new Date(schedule.endDate),
        }) &&
        schedule.daysOfWeek.includes(getDay(day))
      ) {
        const [startHour, startMinute] = schedule.startTime.split(':').map(Number);
        const [endHour, endMinute] = schedule.endTime.split(':').map(Number);
        const startOfWork = set(day, { hours: startHour, minutes: startMinute });
        const endOfWork = set(day, { hours: endHour, minutes: endMinute });

        if (isSameDay(day, taskStartedAt)) {
          if (taskStartedAt < endOfWork) {
            const diff = differenceInMinutes(
              Math.min(endOfWork.getTime(), taskEndedAt.getTime()),
              Math.max(startOfWork.getTime(), taskStartedAt.getTime())
            );
            totalMinutes += diff;
          }
        } else if (isSameDay(day, taskEndedAt)) {
          if (taskEndedAt > startOfWork) {
            const diff = differenceInMinutes(
              Math.min(endOfWork.getTime(), taskEndedAt.getTime()),
              Math.max(startOfWork.getTime(), taskStartedAt.getTime())
            );
            totalMinutes += diff;
          }
        } else {
          const diff = differenceInMinutes(endOfWork, startOfWork);
          totalMinutes += diff;
        }
      }
    });
  });

  return totalMinutes;
}
