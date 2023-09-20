import { Sprint } from '@/lib/sprint.service';
import { differenceInMilliseconds, formatDuration, intervalToDuration, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

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

  return formatDuration(duration, { format: ['days', 'hours', 'minutes'], locale: fr });
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

  const pointDuration = intervalToDuration({ start: 0, end: pointDurationInMilliseconds });

  return formatDuration(pointDuration, { format: ['days', 'hours', 'minutes'], locale: fr });
}
