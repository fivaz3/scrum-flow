import { isBefore, isAfter, isEqual, parseISO, differenceInMinutes, max, min } from 'date-fns';

import {
  RecurringSchedule,
  Schedule,
  SingleSchedule,
} from '@/app/(dashboard)/schedules/calendar/schedule.service';
import { RRule } from 'rrule';

// Function to check if two events overlap
export function doEventsOverlap(
  event1: SingleSchedule,
  startDate: string,
  endDate: string
): boolean {
  const event1Start = parseISO(event1.start);
  const event1End = parseISO(event1.end);
  const rangeStart = parseISO(startDate);
  const rangeEnd = parseISO(endDate);

  return (
    (isBefore(event1Start, rangeEnd) || isEqual(event1Start, rangeEnd)) &&
    (isAfter(event1End, rangeStart) || isEqual(event1End, rangeStart))
  );
}

// Function to calculate the minutes spent in an event within the specified range
function calculateMinutesInEvent(
  event: SingleSchedule,
  startDate: string,
  endDate: string
): number {
  const eventStart = parseISO(event.start);
  const eventEnd = parseISO(event.end);
  const overlapStart = max([eventStart, parseISO(startDate)]);
  const overlapEnd = min([eventEnd, parseISO(endDate)]);

  return differenceInMinutes(overlapEnd, overlapStart);
}

// Function to expand recurring events into multiple single events

// Function to calculate total minutes spent in events within the specified range
export function calculateTotalMinutesInEvents(
  events: SingleSchedule[],
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

function convertScheduleToRRule(schedule: RecurringSchedule): RRule {
  // TODO later const DaySchema = z.enum(['mo', 'tu', 'we', 'th', 'fr', 'sa', 'su']); in zod Schema
  const dayToNumber: any = { mo: 0, tu: 1, we: 2, th: 3, fr: 4, sa: 5, su: 6 } as const;
  const numbers: number[] = schedule.rrule.byweekday.map((day) => dayToNumber[day]);

  return new RRule({
    freq: RRule.WEEKLY,
    byweekday: numbers,
    // dtstart: datetime(2023, 9, 5, 10, 0),
    dtstart: parseISO(schedule.rrule.dtstart),
    // until: datetime(2023, 9, 30),
    until: parseISO(schedule.rrule.until),
  });
}

export function convertRecurringEventIntoSingle(recurring: RecurringSchedule): SingleSchedule[] {
  const rrule = convertScheduleToRRule(recurring);
  const occurrences = rrule.all();
  console.log(occurrences);
  return occurrences.map((occurrence, index) => ({
    id: (Number(recurring.id) + index).toString(),
    memberId: recurring.memberId,
    start: occurrence.toISOString(),
    end: new Date(occurrence.getTime() + parseDuration(recurring.duration)).toISOString(),
    duration: null,
    rrule: null,
  }));
}

export function parseDuration(duration: string): number {
  const [hours, minutes] = duration.split(':').map(Number);
  return (hours * 60 * 60 + minutes * 60) * 1000;
}

export function expandRecurringEvents(schedules: Schedule[]): SingleSchedule[] {
  const expandedEvents: SingleSchedule[] = [];

  for (const schedule of schedules) {
    if (schedule.start === null) {
      const singleEvents = convertRecurringEventIntoSingle(schedule);
      expandedEvents.push(...singleEvents);
    } else {
      expandedEvents.push(schedule);
    }
  }

  return expandedEvents;
}
