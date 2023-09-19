import {
  addDays,
  addHours,
  addMinutes,
  differenceInMinutes,
  format,
  formatISO,
  parseISO,
  set,
} from 'date-fns';
import {
  RecurringSchedule,
  Schedule,
  ScheduleIn,
  SingleSchedule,
} from '@/app/(dashboard)/schedules/calendar/schedule.service';

export function convertToISODate(dateString: string, timeString: string): Date {
  const date = parseISO(dateString);
  const [hours, minutes] = timeString.split(':').map(Number);
  return set(date, { hours: hours, minutes: minutes });
}

export function convertToISOString(dateString: string, timeString: string): string {
  const date = convertToISODate(dateString, timeString);
  return formatISO(date);
}

function getDuration(
  startDate: string,
  startTime: string,
  endDate: string,
  endTime: string
): string {
  const start = convertToISODate(startDate, startTime);
  const end = convertToISODate(endDate, endTime);
  const durationInMinutes = differenceInMinutes(end, start);
  const hours = Math.floor(durationInMinutes / 60);
  const minutes = durationInMinutes % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

function convertScheduleInToSingleSchedule(data: ScheduleIn): Omit<SingleSchedule, 'id'> {
  return {
    memberId: data.memberId,
    start: convertToISOString(data.startDate, data.startTime),
    end: convertToISOString(data.endDate, data.endTime),
    duration: null,
    rrule: null,
  };
}

function convertScheduleInToRecurringSchedule(data: ScheduleIn): Omit<RecurringSchedule, 'id'> {
  return {
    memberId: data.memberId,
    start: null,
    end: null,
    duration: getDuration(data.startDate, data.startTime, data.endDate, data.endTime),
    rrule: {
      freq: 'weekly',
      dtstart: convertToISOString(data.startDate, data.startTime),
      until: data.until,
      byweekday: data.byweekday,
    },
  };
}

export function convertScheduleInToSchedule(data: ScheduleIn): Omit<Schedule, 'id'> {
  if (data.isRecurring) {
    return convertScheduleInToRecurringSchedule(data);
  } else {
    return convertScheduleInToSingleSchedule(data);
  }
}
export function dayAfter(date: string) {
  try {
    const startDate = new Date(date);
    const dayAfter = addDays(startDate, 1);
    return format(dayAfter, 'yyyy-MM-dd');
  } catch {
    return '';
  }
}

function convertFromISO(dateString: string): [string, string] {
  const date = parseISO(dateString);
  // TODO check if when I format this date to only yyyy-MM-dd and hh:mm I don't lose my timezone
  return [format(date, 'yyyy-MM-dd'), format(date, 'HH:mm')];
}

function getFromDuration(startString: string, duration: string): [string, string] {
  const start = parseISO(startString);
  const [hours, minutes] = duration.split(':').map(Number);

  const endDate = addHours(start, hours);
  const endDateTime = addMinutes(endDate, minutes);
  // TODO check if when I format this date to only yyyy-MM-dd and hh:mm I don't lose my timezone
  return [format(endDateTime, 'yyyy-MM-dd'), format(endDateTime, 'HH:mm')];
}

export function convertSingleScheduleToScheduleIn(schedule: SingleSchedule): ScheduleIn {
  const [startDate, startTime] = convertFromISO(schedule.start);
  const [endDate, endTime] = convertFromISO(schedule.end);
  return {
    memberId: schedule.memberId,
    startDate,
    startTime,
    endDate,
    endTime,
    isRecurring: false,
    byweekday: [],
    until: '',
  };
}
export function convertRecurringScheduleToScheduleIn(schedule: RecurringSchedule): ScheduleIn {
  const [startDate, startTime] = convertFromISO(schedule.rrule.dtstart);
  const [endDate, endTime] = getFromDuration(schedule.rrule.dtstart, schedule.duration);
  return {
    memberId: schedule.memberId,
    startDate,
    startTime,
    endDate,
    endTime,
    isRecurring: true,
    byweekday: schedule.rrule.byweekday,
    until: schedule.rrule.until,
  };
}

export function convertScheduleToScheduleIn(schedule: Schedule | null): ScheduleIn | null {
  if (!schedule) {
    return null;
  }
  if (schedule.start !== null) {
    return convertSingleScheduleToScheduleIn(schedule);
  } else {
    return convertRecurringScheduleToScheduleIn(schedule);
  }
}

export const weekDays: Array<{ label: string; value: string }> = [
  {
    label: 'Lundi',
    value: 'mo',
  },
  {
    label: 'Mardi',
    value: 'tu',
  },
  {
    label: 'Mercredi',
    value: 'we',
  },
  {
    label: 'Jeudi',
    value: 'th',
  },
  {
    label: 'Vendredi',
    value: 'fr',
  },
  {
    label: 'Samedi',
    value: 'sa',
  },
  {
    label: 'Dimanche',
    value: 'su',
  },
];
