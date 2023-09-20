import { Issue, IssueWithTimeSpent } from '@/lib/issue/issue.service';
import { Sprint } from '@/lib/sprint.service';
import { calculateAccuracy, getSumOfEstimations } from '@/app/(dashboard)/report/sprint-effort';
import { differenceInMilliseconds, parseISO } from 'date-fns';
import { formatMilliseconds } from '@/lib/formatters';

function getEstimationInTime(
  issues: Issue[],
  estimationInPoints: number | null,
  sprint: Sprint
): number {
  if (!estimationInPoints) {
    return 0;
  }

  const points = getSumOfEstimations(issues);

  if (points === 0) {
    return 0;
  }

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
  return formatMilliseconds(estimationInTime);
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
