import {
  getIssuesFromSprintWithChangelog,
  IssueWithChangeLog,
  IssueWithTimeSpent,
} from '@/lib/issue/issue.service';
import {
  getMemberSchedule,
  getSchedules,
  RecurringSchedule,
  Schedule,
  SingleSchedule,
} from '@/app/(dashboard)/schedules/calendar/schedule.service';
import {
  format,
  formatDuration,
  intervalToDuration,
  isWithinInterval,
  parseISO,
  set,
} from 'date-fns';
import { getInProgressStatuses } from '@/lib/project.service';
import { fr } from 'date-fns/locale';
import { rrulestr } from 'rrule';
import {
  calculateTotalMinutesInEvents,
  expandRecurringEvents,
  parseDuration,
} from '@/lib/issue/test2';

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

function hasMovedToInProgress(
  item: IssueWithChangeLog['changelog']['histories'][0]['items'][0],
  inProgressColumns: string[]
) {
  return !!(
    item.fromString &&
    !inProgressColumns.includes(item.fromString) &&
    item.toString &&
    inProgressColumns.includes(item.toString)
  );
}

function hasLeftInProgress(
  item: IssueWithChangeLog['changelog']['histories'][0]['items'][0],
  inProgressColumns: string[]
) {
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

function isWithinSchedule(date: Date, schedule: Schedule, debug = false): boolean {
  if (schedule.start !== null) {
    const a = isWithinInterval(date, {
      start: parseISO(schedule.start),
      end: parseISO(schedule.end),
    });

    return a;

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

export function getTimeInProgress(
  issue: IssueWithChangeLog,
  workingSchedules: Schedule[],
  inProgressColumns: string[]
): number {
  if (workingSchedules.length === 0) {
    return -1;
  }

  const memberSchedule = getMemberSchedule(issue, workingSchedules);
  // console.log(memberSchedule);

  const expandedSchedules = expandRecurringEvents(memberSchedule);
  // console.log(expandedSchedules);

  const historiesOfStatus = getStatusHistory(issue.changelog.histories);
  // console.log(JSON.stringify(historiesOfStatus));
  let inProgressStart: Date | null = null;
  let totalTimeSpentInProgressInMilliseconds = 0;

  for (const history of historiesOfStatus) {
    for (const item of history.items) {
      if (!inProgressStart && hasMovedToInProgress(item, inProgressColumns)) {
        console.log('if');
        inProgressStart = parseISO(history.created); // start tracking time
      } else if (inProgressStart && hasLeftInProgress(item, inProgressColumns)) {
        console.log('else if');
        // inProgressStart = parseISO(history.created); // stop tracking time

        // TODO remove parseISO(toISOString) later
        totalTimeSpentInProgressInMilliseconds += calculateTotalMinutesInEvents(
          expandedSchedules,
          inProgressStart.toISOString(),
          parseISO(history.created).toISOString()
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
    totalTimeSpentInProgressInMilliseconds += calculateTotalMinutesInEvents(
      expandedSchedules,
      inProgressStart.toISOString(),
      new Date().toISOString()
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

  if (sprintId === 19) {
    console.log('issuesWithChangeLog', JSON.stringify(issuesWithChangeLog));
  }

  const schedules = await getSchedules(accessToken, cloudId);

  if (sprintId === 19) {
    console.log('schedules', JSON.stringify(schedules));
  }

  const inProgressColumns = await getInProgressStatuses(accessToken, cloudId);

  if (sprintId === 19) {
    console.log('inProgressColumns', JSON.stringify(inProgressColumns));
  }

  return issuesWithChangeLog.map((issue) => ({
    ...issue,
    timeSpent: getTimeInProgress(issue, schedules, inProgressColumns),
  }));
}

export function convertToDuration(milliseconds: number, debug = false): string {
  if (milliseconds < 1) {
    return '0 minutes';
  }

  const duration = intervalToDuration({ start: 0, end: milliseconds });

  return formatDuration(duration, { format: ['hours', 'minutes'], locale: fr });
}
