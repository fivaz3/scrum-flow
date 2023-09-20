import {
  getHistoryFromSprint,
  getIssuesFromSprintWithChangelog,
  getStatusHistory,
  IssueWithChangeLog,
  IssueWithTimeSpent,
} from '@/lib/issue/issue.service';
import {
  expandRecurringEvents,
  getMemberSchedule,
  getSchedules,
  Schedule,
  SingleSchedule,
} from '@/app/(dashboard)/schedules/calendar/schedule.service';
import {
  differenceInMilliseconds,
  formatDuration,
  intervalToDuration,
  isAfter,
  isBefore,
  isEqual,
  max,
  min,
  parseISO,
} from 'date-fns';
import { getInProgressStatuses } from '@/lib/project.service';
import { fr } from 'date-fns/locale';
import { Sprint } from '@/lib/sprint.service';

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

export function getTimeInProgressInSprint(
  sprint: Sprint,
  issue: IssueWithChangeLog,
  workingSchedules: Schedule[],
  inProgressColumns: string[]
) {
  if (workingSchedules.length === 0) {
    return -1;
  }

  const memberSchedule = getMemberSchedule(issue, workingSchedules);

  const workingShifts = expandRecurringEvents(memberSchedule);

  const sprintHistories = getHistoryFromSprint(sprint, issue.changelog.histories);

  const historiesOfStatus = getStatusHistory(sprintHistories);

  const historiesAsc = historiesOfStatus.sort(
    (a, b) => parseISO(a.created).valueOf() - parseISO(b.created).valueOf()
  );

  if (issue.key === 'SCRUM-38') {
    console.log(sprint);
    console.log(JSON.stringify(historiesAsc));
  }

  return getTimeInProgressFromStatusHistories(
    historiesAsc,
    workingShifts,
    inProgressColumns,
    issue.fields.status.statusCategory.name
  );
}

function getTimeInProgressFromStatusHistories(
  histories: IssueWithChangeLog['changelog']['histories'],
  workingShifts: SingleSchedule[],
  inProgressColumns: string[],
  issueCurrentStatus: string
) {
  let inProgressStart: Date | null = null;
  let totalTimeSpentInProgressInMilliseconds = 0;

  for (const history of histories) {
    for (const item of history.items) {
      if (!inProgressStart && hasMovedToInProgress(item, inProgressColumns)) {
        inProgressStart = parseISO(history.created); // start tracking time
      } else if (inProgressStart && hasLeftInProgress(item, inProgressColumns)) {
        const inProgressStop = parseISO(history.created);
        totalTimeSpentInProgressInMilliseconds += calculateTotalMinutes(
          workingShifts,
          inProgressStart,
          inProgressStop
        );
        inProgressStart = null; // stop tracking time
      }
    }
  }

  if (inProgressStart && issueCurrentStatus === 'In Progress') {
    // issue is still in progress
    totalTimeSpentInProgressInMilliseconds += calculateTotalMinutes(
      workingShifts,
      inProgressStart,
      new Date()
    );
  }

  return totalTimeSpentInProgressInMilliseconds;
}

export function getTimeInProgress(
  issue: IssueWithChangeLog,
  workingSchedules: Schedule[],
  inProgressColumns: string[]
): number {
  if (workingSchedules.length === 0) {
    // TODO handle this use case in the front
    return -1;
  }

  const memberSchedule = getMemberSchedule(issue, workingSchedules);

  const workingShifts = expandRecurringEvents(memberSchedule);

  const historiesOfStatus = getStatusHistory(issue.changelog.histories);

  const historiesAsc = historiesOfStatus.sort(
    (a, b) => parseISO(a.created).valueOf() - parseISO(b.created).valueOf()
  );

  return getTimeInProgressFromStatusHistories(
    historiesAsc,
    workingShifts,
    inProgressColumns,
    issue.fields.status.statusCategory.name
  );
}

export async function getIssuesFromSprintWithTimeSpent(
  boardId: number,
  sprint: Sprint,
  accessToken: string,
  cloudId: string
): Promise<IssueWithTimeSpent[]> {
  const issuesWithChangeLog = await getIssuesFromSprintWithChangelog(
    boardId,
    sprint.id,
    accessToken,
    cloudId
  );

  // const issue = issuesWithChangeLog.find((issue) => issue.key === 'SCRUM-38');

  // if (issue) console.log(JSON.stringify(issue));

  const schedules = await getSchedules(accessToken, cloudId);

  const inProgressColumns = await getInProgressStatuses(accessToken, cloudId);

  return issuesWithChangeLog.map((issue) => ({
    ...issue,
    timeSpent: getTimeInProgressInSprint(sprint, issue, schedules, inProgressColumns),
  }));
}

export function convertToDuration(milliseconds: number): string {
  if (milliseconds < 1) {
    return '0 minutes';
  }

  const duration = intervalToDuration({ start: 0, end: milliseconds });

  return formatDuration(duration, { format: ['hours', 'minutes'], locale: fr });
}

export function doEventsOverlap(schedule: SingleSchedule, startDate: Date, endDate: Date): boolean {
  const event1Start = parseISO(schedule.start);
  const event1End = parseISO(schedule.end);
  const rangeStart = startDate;
  const rangeEnd = endDate;

  return (
    (isBefore(event1Start, rangeEnd) || isEqual(event1Start, rangeEnd)) &&
    (isAfter(event1End, rangeStart) || isEqual(event1End, rangeStart))
  );
}

function calculateMinutesInSchedule(
  schedule: SingleSchedule,
  startDate: Date,
  endDate: Date
): number {
  const scheduleStart = parseISO(schedule.start);
  const scheduleEnd = parseISO(schedule.end);
  const overlapStart = max([scheduleStart, startDate]);
  const overlapEnd = min([scheduleEnd, endDate]);

  return differenceInMilliseconds(overlapEnd, overlapStart);
}

export function calculateTotalMinutes(
  schedules: SingleSchedule[],
  startDate: Date,
  endDate: Date
): number {
  let totalMinutes = 0;

  for (const schedule of schedules) {
    if (doEventsOverlap(schedule, startDate, endDate)) {
      totalMinutes += calculateMinutesInSchedule(schedule, startDate, endDate);
    }
  }

  return totalMinutes;
}
