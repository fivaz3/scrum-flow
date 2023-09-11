import { callApi, validateData } from '@/lib/jira.service';
import { z } from 'zod';
import { getBoardConfiguration } from '@/lib/board.service';
import { IssueSchema, IssueWithTimeSpent } from '@/lib/issue/issue.service';
import {
  getMemberSchedule,
  getSchedulesServer,
  Schedule,
} from '@/app/(dashboard)/settings/Calendar/schedule.service';
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
  boardId: string | number,
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
      IssueWithChangeLogSchema.merge(
        z
          .object({
            fields: z
              .object({
                [configuration.estimation.field.fieldId]: z.number().nullable(),
              })
              .passthrough(),
          })
          .passthrough()
      )
    ),
  });

  const { issues } = validateData(IssueSchemaTransformation, issuesPaginated);

  const issuesWithEstimation = issues.map((issue) => ({
    ...issue,
    estimation: issue.fields[configuration.estimation.field.fieldId],
  }));

  return validateData(z.array(IssueWithChangeLogSchema), issuesWithEstimation);
}

export async function getIssuesFromSprintWithChangelog(
  boardId: string | number,
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

export async function getIssuesFromSprintWithTimeSpent(
  boardId: string | number,
  sprintId: number,
  accessToken: string,
  cloudId: string
): Promise<IssueWithTimeSpent[]> {
  const issuesWithChangeLog = await getIssuesFromSprintWithChangelog(
    boardId,
    sprintId,
    accessToken,
    cloudId
  );
  const schedules = await getSchedulesServer();

  return await Promise.all(
    issuesWithChangeLog.map(async (issue) => ({
      ...issue,
      timeSpent: await getTimeInProgress(issue, schedules, accessToken, cloudId),
    }))
  );
}
