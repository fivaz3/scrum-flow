import { Issue, IssueWithTimeSpent } from '@/lib/issue/issue.service';
import { Sprint } from '@/lib/sprint.service';
import { calculateAccuracy, getSumOfEstimations } from '@/app/(dashboard)/report/sprint-effort';
import { differenceInMilliseconds, formatDuration, intervalToDuration, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

function getEstimationInTime(
  issues: Issue[],
  estimationInPoints: number | null,
  sprint: Sprint
): number {
  if (!estimationInPoints) {
    return 0;
  }

  const points = getSumOfEstimations(issues);

  const sprintDurationInMilliseconds = differenceInMilliseconds(
    parseISO(sprint.endDate),
    parseISO(sprint.startDate)
  );

  const pointDurationInMilliseconds = sprintDurationInMilliseconds / points;

  return estimationInPoints * pointDurationInMilliseconds;
}

export function getEstimationInTimeFormatted(
  issues: Issue[],
  estimationInPoints: number | null,
  sprint: Sprint
): string {
  const estimationInTime = getEstimationInTime(issues, estimationInPoints, sprint);
  return formatEstimationInTime(estimationInTime);
}

function formatEstimationInTime(estimationInMilliseconds: number): string {
  const pointDuration = intervalToDuration({ start: 0, end: estimationInMilliseconds });

  return formatDuration(pointDuration, { format: ['days', 'hours', 'minutes'], locale: fr });
}

export function getIssueAccuracy(
  issues: Issue[],
  issue: IssueWithTimeSpent,
  sprint: Sprint
): string {
  const estimationInMilliseconds = getEstimationInTime(issues, issue.estimation, sprint);
  const accuracyInPercentage = calculateAccuracy(estimationInMilliseconds, issue.timeSpent);
  return `${accuracyInPercentage}%`;
}
