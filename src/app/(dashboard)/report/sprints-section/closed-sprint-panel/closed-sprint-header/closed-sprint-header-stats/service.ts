import { Sprint } from '@/lib/sprint.service';
import { differenceInMilliseconds, intervalToDuration, parseISO } from 'date-fns';
import { formatMilliseconds, myFormatDuration } from '@/lib/formatters';

export function formatSprintDuration(sprint: Sprint): string {
  const duration = intervalToDuration({
    start: parseISO(sprint.startDate),
    end: parseISO(sprint.endDate),
  });

  if (duration.hours === 23 && duration.minutes === 59) {
    duration.days = (duration.days || 0) + 1;
    duration.hours = undefined;
    duration.minutes = undefined;
  }

  return myFormatDuration(duration);
}

export function getTimeByPoints(points: number, sprint: Sprint): string {
  if (points === 0) {
    return '0 minutes';
  }

  const sprintDurationInMilliseconds = differenceInMilliseconds(
    parseISO(sprint.endDate),
    parseISO(sprint.startDate)
  );

  const pointDurationInMilliseconds = sprintDurationInMilliseconds / points;

  return formatMilliseconds(pointDurationInMilliseconds);
}
