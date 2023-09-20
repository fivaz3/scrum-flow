import {
  getIssuesFromSprintWithChangelog,
  IssueWithChangeLog,
  IssueWithTimeSpent,
} from '@/lib/issue/issue.service';
import {
  getMemberSchedule,
  getSchedules,
  Schedule,
} from '@/app/(dashboard)/schedules/calendar/schedule.service';
import { formatDuration, intervalToDuration, parseISO } from 'date-fns';
import { getInProgressStatuses } from '@/lib/project.service';
import { fr } from 'date-fns/locale';
import { calculateTotalMinutes, expandRecurringEvents } from '@/lib/issue/test2';

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
        inProgressStart = parseISO(history.created); // start tracking time
        if (issue.key === 'SCRUM-18') console.log(inProgressStart);
      } else if (inProgressStart && hasLeftInProgress(item, inProgressColumns)) {
        // TODO remove parseISO(toISOString) later
        const inProgressStop = parseISO(history.created);
        if (issue.key === 'SCRUM-18') console.log(inProgressStop);
        totalTimeSpentInProgressInMilliseconds += calculateTotalMinutes(
          expandedSchedules,
          inProgressStart.toISOString(),
          inProgressStop.toISOString()
        );
        inProgressStart = null; // stop tracking time
      }
    }
  }

  if (inProgressStart && issue.fields.status.statusCategory.name === 'In Progress') {
    // issue is still in progress
    totalTimeSpentInProgressInMilliseconds += calculateTotalMinutes(
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

  const schedules = await getSchedules(accessToken, cloudId);

  const inProgressColumns = await getInProgressStatuses(accessToken, cloudId);

  return issuesWithChangeLog.map((issue) => ({
    ...issue,
    timeSpent: getTimeInProgress(issue, schedules, inProgressColumns),
  }));
}

export function convertToDuration(milliseconds: number): string {
  if (milliseconds < 1) {
    return '0 minutes';
  }

  const duration = intervalToDuration({ start: 0, end: milliseconds });

  return formatDuration(duration, { format: ['hours', 'minutes'], locale: fr });
}
