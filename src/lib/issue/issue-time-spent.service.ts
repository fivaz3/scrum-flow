import {
  getIssuesFromSprintWithChangelog,
  IssueWithChangeLog,
  IssueWithTimeSpent,
} from '@/lib/issue/issue.service';
import {
  getMemberSchedule,
  getSchedulesServer,
  RecurringSchedule,
  Schedule,
  SingleSchedule,
} from '@/app/(dashboard)/schedules/calendar/schedule.service';
import {
  differenceInMilliseconds,
  eachDayOfInterval,
  format,
  formatDuration,
  intervalToDuration,
  isSameDay,
  isWithinInterval,
  parseISO,
  set,
} from 'date-fns';
import { getInProgressStatuses } from '@/lib/project.service';
import { fr } from 'date-fns/locale';
import { rrulestr } from 'rrule';

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

function isWithinSingleSchedule(date: Date, schedule: SingleSchedule): boolean {
  return isWithinInterval(date, {
    start: parseISO(schedule.start),
    end: parseISO(schedule.end),
  });
}

function isWithinRecurringSchedule(date: Date, schedule: RecurringSchedule): boolean {
  const isInTheInterval = isWithinInterval(date, {
    start: parseISO(schedule.rrule.dtstart),
    end: parseISO(schedule.rrule.until),
  });

  const isInTheWeek = schedule.rrule.byweekday.includes(
    format(date, 'iiii').toLowerCase().substring(0, 2)
  );

  return isInTheInterval && isInTheWeek;
}

function parseDuration(duration: string): number {
  const [hours, minutes] = duration.split(':').map(Number);
  return (hours * 60 * 60 + minutes * 60) * 1000;
}

function isWithinSchedule(date: Date, schedule: Schedule, debug = false): boolean {
  if (schedule.start !== null) {
    return isWithinInterval(date, {
      start: parseISO(schedule.start),
      end: parseISO(schedule.end),
    });

    // return isWithinSingleSchedule(date, schedule);
  } else {
    const rule = rrulestr(
      `DTSTART:${schedule.rrule.dtstart}\nRRULE:FREQ=${schedule.rrule.freq};UNTIL=${
        schedule.rrule.until
      };BYDAY=${schedule.rrule.byweekday.join(',')}`
    );
    return rule.all().some((occurrence) =>
      isWithinInterval(date, {
        start: occurrence,
        end: new Date(occurrence.getTime() + parseDuration(schedule.duration)),
      })
    );
    // return isWithinRecurringSchedule(date, schedule);
  }
}

export function getStartAndEndTimeSchedule(schedule: Schedule): [string, string] {
  function getStartAndEndFirstRecurringSchedule(schedule: RecurringSchedule): [Date, Date] {
    const start = parseISO(schedule.rrule.dtstart);
    return [start, new Date(start.getTime() + parseDuration(schedule.duration))];
  }
  function getStartAndEndSingleSchedule(schedule: SingleSchedule): [Date, Date] {
    return [parseISO(schedule.start), parseISO(schedule.end)];
  }

  const [start, end] =
    schedule.start !== null
      ? getStartAndEndSingleSchedule(schedule)
      : getStartAndEndFirstRecurringSchedule(schedule);

  return [format(start, 'HH:mm'), format(end, 'HH:mm')];
}

export function getStartAndEndOfWork(day: Date, schedule: Schedule) {
  const [startTime, endTime] = getStartAndEndTimeSchedule(schedule);
  const [startHour, startMinute] = startTime.split(':').map(Number);
  const [endHour, endMinute] = endTime.split(':').map(Number);

  const startOfWork = set(day, { hours: startHour, minutes: startMinute });
  const endOfWork = set(day, { hours: endHour, minutes: endMinute });

  return [startOfWork, endOfWork];
}

export function calculateTimeInMilliseconds(
  schedules: Schedule[],
  taskStartedAt: Date,
  taskEndedAt: Date,
  debug = false
): number {
  let totalMilliseconds = 0;

  const intervalOfTaskDuration = eachDayOfInterval({ start: taskStartedAt, end: taskEndedAt });

  intervalOfTaskDuration.forEach((day) => {
    schedules.forEach((schedule) => {
      if (isWithinSchedule(day, schedule, debug)) {
        const [startOfWork, endOfWork] = getStartAndEndOfWork(day, schedule);

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
        if (issue.key === 'SCRUM-54') {
          console.log('inProgressStart', inProgressStart);
          console.log('history.created', history.created);
        }
      } else if (inProgressStart && (await hasLeftInProgress(item, accessToken, cloudId))) {
        inProgressStart = parseISO(history.created); // stop tracking time

        totalTimeSpentInProgressInMilliseconds += calculateTimeInMilliseconds(
          memberSchedule,
          inProgressStart,
          parseISO(history.created),
          issue.key === 'SCRUM-54'
        );
        // if (issue.key === 'SCRUM-54')
        //   console.log(
        //     'totalTimeSpentInProgressInMilliseconds',
        //     totalTimeSpentInProgressInMilliseconds
        //   );
        inProgressStart = null; // stop tracking time
      }
    }
  }

  if (inProgressStart && issue.fields.status.statusCategory.name === 'In Progress') {
    // issue is still in progress
    totalTimeSpentInProgressInMilliseconds += calculateTimeInMilliseconds(
      memberSchedule,
      inProgressStart,
      new Date(),
      issue.key === 'SCRUM-54'
    );
  }

  return totalTimeSpentInProgressInMilliseconds;
}

export async function getIssuesFromSprintWithTimeSpent(
  boardId: number,
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
