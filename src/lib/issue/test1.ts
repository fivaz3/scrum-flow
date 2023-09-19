import { differenceInMinutes, isAfter, isBefore, isEqual, max, min, parseISO } from 'date-fns';
import {
  Event,
  RecurringEvent,
  SingleEvent,
} from '@/app/(dashboard)/schedules/calendar/calendar-core';
import { Schedule } from '@/app/(dashboard)/schedules/calendar/schedule.service';
import { RRule } from 'rrule';

function doEventsOverlap(schedule: Schedule, startDate: string, endDate: string): boolean {
  let event1Start;
  if (schedule.start !== null) {
    event1Start = parseISO(schedule.start);
  } else {
    event1Start = parseISO(schedule.rrule.dtstart);
  }
  let event1End;
  if ('start' in schedule) {
    event1End = parseISO(schedule.end);
  } else {
    event1End = parseISO(schedule.rrule.until);
  }

  const event1End = parseISO(schedule instanceof SingleEvent ? schedule.end : schedule.rrule.until);
  const rangeStart = parseISO(startDate);
  const rangeEnd = parseISO(endDate);

  return (
    (isBefore(event1Start, rangeEnd) || isEqual(event1Start, rangeEnd)) &&
    (isAfter(event1End, rangeStart) || isEqual(event1End, rangeStart))
  );
}

// Function to calculate the minutes spent in an event within the specified range
function calculateMinutesInEvent(event: Event, startDate: string, endDate: string): number {
  const eventStart = parseISO(event instanceof SingleEvent ? event.start : event.rrule.dtstart);
  const eventEnd = parseISO(event instanceof SingleEvent ? event.end : event.rrule.until);
  const overlapStart = max([eventStart, parseISO(startDate)]);
  const overlapEnd = min([eventEnd, parseISO(endDate)]);

  return differenceInMinutes(overlapEnd, overlapStart);
}

// Function to calculate total minutes spent in events within the specified range
export function calculateTotalMinutesInEvents(
  events: Event[],
  startDate: string,
  endDate: string
): number {
  let totalMinutes = 0;

  for (const event of events) {
    if (doEventsOverlap(event, startDate, endDate)) {
      totalMinutes += calculateMinutesInEvent(event, startDate, endDate);
    }
  }

  return totalMinutes;
}

export function parseDuration(duration: string): number {
  const [hours, minutes] = duration.split(':').map(Number);
  return (hours * 60 * 60 + minutes * 60) * 1000;
}

function convertEventToRRule(event: RecurringEvent): RRule {
  const dayToNumber: any = { mo: 0, tu: 1, we: 2, th: 3, fr: 4, sa: 5, su: 6 } as const;
  const numbers: number[] = event.rrule.byweekday.map((day) => dayToNumber[day]);

  return new RRule({
    freq: RRule.WEEKLY,
    byweekday: numbers,
    dtstart: parseISO(event.rrule.dtstart),
    until: parseISO(event.rrule.until),
  });
}
