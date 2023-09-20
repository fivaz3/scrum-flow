import { Duration, intervalToDuration } from 'date-fns';

export function myFormatDuration(duration: Duration) {
  let formattedDuration = '';

  if (duration.days) {
    formattedDuration += `${duration.days} j `;
  }

  if (duration.hours) {
    formattedDuration += `${duration.hours} h `;
  }

  if (duration.minutes) {
    formattedDuration += `${duration.minutes} min`;
  }

  return formattedDuration.trim();
}

export function formatMilliseconds(milliseconds: number): string {
  if (milliseconds < 1) {
    return '0 min';
  }

  const duration = intervalToDuration({ start: 0, end: milliseconds });

  return myFormatDuration(duration);
}
