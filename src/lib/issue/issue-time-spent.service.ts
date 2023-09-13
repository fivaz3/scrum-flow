import {
  getIssuesFromSprintWithChangelog,
  IssueWithChangeLog,
  IssueWithTimeSpent,
} from '@/lib/issue/issue.service';
import {
  getMemberSchedule,
  getSchedulesServer,
  Schedule,
} from '@/app/(dashboard)/settings/Calendar/schedule.service';
import {
  differenceInMilliseconds,
  eachDayOfInterval,
  formatDuration,
  getDay,
  intervalToDuration,
  isSameDay,
  isWithinInterval,
  parseISO,
  set,
} from 'date-fns';
import { getInProgressStatuses } from '@/lib/project.service';
import { fr } from 'date-fns/locale';

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

function calculateTimeInMilliseconds(
  workingSchedules: Schedule[],
  taskStartedAt: Date,
  taskEndedAt: Date
): number {
  let totalMilliseconds = 0;

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
            const difference = differenceInMilliseconds(
              Math.min(endOfWork.getTime(), taskEndedAt.getTime()),
              Math.max(startOfWork.getTime(), taskStartedAt.getTime())
            );
            totalMilliseconds += difference;
          }
        } else if (isSameDay(day, taskEndedAt)) {
          if (taskEndedAt > startOfWork) {
            const difference = differenceInMilliseconds(
              Math.min(endOfWork.getTime(), taskEndedAt.getTime()),
              Math.max(startOfWork.getTime(), taskStartedAt.getTime())
            );
            totalMilliseconds += difference;
          }
        } else {
          const difference = differenceInMilliseconds(endOfWork, startOfWork);
          totalMilliseconds += difference;
        }
      }
    });
  });

  return totalMilliseconds;
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
  let totalTimeSpentInProgressInMilliseconds = 0;

  for (const history of historiesOfStatus) {
    for (const item of history.items) {
      if (!inProgressStart && (await hasMovedToInProgress(item, accessToken, cloudId))) {
        inProgressStart = parseISO(history.created); // start tracking time
      } else if (inProgressStart && (await hasLeftInProgress(item, accessToken, cloudId))) {
        totalTimeSpentInProgressInMilliseconds += calculateTimeInMilliseconds(
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
    totalTimeSpentInProgressInMilliseconds += calculateTimeInMilliseconds(
      memberSchedule,
      inProgressStart,
      new Date()
    );
  }

  return totalTimeSpentInProgressInMilliseconds;
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

export function convertToDuration(milliseconds: number, debug = false): string {
  if (milliseconds < 1) {
    return '0 minutes';
  }

  const duration = intervalToDuration({ start: 0, end: milliseconds });

  if (debug) console.log(duration);

  return formatDuration(duration, { format: ['hours', 'minutes'], locale: fr });
}
