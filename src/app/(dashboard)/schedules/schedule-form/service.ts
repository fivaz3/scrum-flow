import {
  addDays,
  addHours,
  addMinutes,
  differenceInDays,
  differenceInMinutes,
  format,
  formatISO,
  parseISO,
  set,
} from 'date-fns';
import {
  RecurringSchedule,
  Schedule,
  SingleSchedule,
} from '@/app/(dashboard)/schedules/calendar/schedule.service';
import { z } from 'zod';

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
const dateErrorMessage = 'Format de date invalide. Le format attendu est yyyy-MM-dd';
const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/;
const timeErrorMessage = "Format d'heure invalide. Le format attendu est hh:mm ou hh:mm:ss";

export const ScheduleInSchema = z
  .object({
    memberId: z.string(),
    startDate: z.string().regex(dateRegex, dateErrorMessage),
    startTime: z.string().regex(timeRegex, timeErrorMessage),
    endDistance: z.number(),
    endTime: z.string(),
    isRecurring: z.boolean(),
    byweekday: z.array(z.string()),
    until: z.string(),
  })
  .refine(
    ({ isRecurring, byweekday }) => {
      if (!isRecurring) {
        return true;
      }

      return byweekday.length !== 0;
    },
    {
      message: 'Il faut avoir sélectionné au moins 1 jour de la semaine',
      path: ['byweekday'],
    }
  )
  .refine(
    ({ isRecurring, until }) => {
      if (!isRecurring) {
        return true;
      }

      return dateRegex.test(until);
    },
    {
      message: dateErrorMessage,
      path: ['until'],
    }
  )
  .refine(
    ({ startDate, startTime, endDistance, endTime }) => {
      const start = convertToISODate(startDate, startTime);
      const end = getEndDate(startDate, endDistance, endTime);
      return start < end;
    },
    {
      message: 'Le début doit être avant la fin',
      path: ['endDistance'],
    }
  )
  .refine(
    ({ isRecurring, startDate, startTime, until }) => {
      if (!isRecurring) {
        return true;
      }

      const start = convertToISODate(startDate, startTime);
      const end = new Date(until);
      return start < end;
    },
    {
      message: 'La recurrence ne peut pas finir avant la date début',
      path: ['until'],
    }
  );

export type ScheduleIn = z.infer<typeof ScheduleInSchema>;

function getEndDate(startDate: string, endDate: number, endTime: string) {
  const startDateObject = parseISO(startDate);
  const endDateObject = addDays(startDateObject, endDate);
  const [hours, minutes] = endTime.split(':').map(Number);
  return set(endDateObject, { hours: hours, minutes: minutes });
}

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
  endDistance: number,
  endTime: string
): string {
  const start = convertToISODate(startDate, startTime);
  const end = getEndDate(startDate, endDistance, endTime);
  const durationInMinutes = differenceInMinutes(end, start);
  const hours = Math.floor(durationInMinutes / 60);
  const minutes = durationInMinutes % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

function convertScheduleInToSingleSchedule(data: ScheduleIn): Omit<SingleSchedule, 'id'> {
  return {
    memberId: data.memberId,
    start: convertToISOString(data.startDate, data.startTime),
    end: getEndDate(data.startDate, data.endDistance, data.endTime).toISOString(),
    duration: null,
    rrule: null,
  };
}

function convertScheduleInToRecurringSchedule(data: ScheduleIn): Omit<RecurringSchedule, 'id'> {
  return {
    memberId: data.memberId,
    start: null,
    end: null,
    duration: getDuration(data.startDate, data.startTime, data.endDistance, data.endTime),
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

function getDistance(start: string, end: string): number {
  const startDate = parseISO(start);
  const endDate = parseISO(end);
  return differenceInDays(endDate, startDate);
}

export function convertSingleScheduleToScheduleIn(schedule: SingleSchedule): ScheduleIn {
  const [startDate, startTime] = convertFromISO(schedule.start);
  const [endDate, endTime] = convertFromISO(schedule.end);
  const endDistance = getDistance(startDate, endDate);

  return {
    memberId: schedule.memberId,
    startDate,
    startTime,
    endDistance,
    endTime,
    isRecurring: false,
    byweekday: [],
    until: '',
  };
}
export function convertRecurringScheduleToScheduleIn(schedule: RecurringSchedule): ScheduleIn {
  const [startDate, startTime] = convertFromISO(schedule.rrule.dtstart);
  const [endDate, endTime] = getFromDuration(schedule.rrule.dtstart, schedule.duration);
  const endDistance = getDistance(startDate, endDate);
  return {
    memberId: schedule.memberId,
    startDate,
    startTime,
    endDistance,
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
