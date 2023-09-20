import { deleteBackEnd, getBackEnd, postBackEnd, putBackEnd } from '@/lib/backend.service';
import { validateData } from '@/lib/jira.service';
import { z } from 'zod';
import { Issue } from '@/lib/issue/issue.service';
import { RRule } from 'rrule';
import { parseISO } from 'date-fns';

export const SingleScheduleSchema = z.object({
  id: z.string(),
  memberId: z.string(),
  start: z.string(),
  end: z.string(),
  duration: z.null(),
  rrule: z.null(),
});

export type SingleSchedule = z.infer<typeof SingleScheduleSchema>;

export const RecurringScheduleSchema = z.object({
  id: z.string(),
  memberId: z.string(),
  start: z.null(),
  end: z.null(),
  duration: z.string(),
  rrule: z.object({
    freq: z.string(),
    byweekday: z.array(z.string()),
    dtstart: z.string(),
    until: z.string(),
  }),
});

export type RecurringSchedule = z.infer<typeof RecurringScheduleSchema>;

export const ScheduleSchema = RecurringScheduleSchema.or(SingleScheduleSchema);

export type Schedule = z.infer<typeof ScheduleSchema>;

const PATH = '/api/schedules';

export async function addSchedule(
  data: Omit<Schedule, 'id'>,
  accessToken: string,
  cloudId: string
): Promise<Schedule> {
  const response = await postBackEnd(PATH, data, accessToken, cloudId);

  return validateData(ScheduleSchema, response);
}

export async function getSchedules(accessToken: string, cloudId: string): Promise<Schedule[]> {
  const response = await getBackEnd(PATH, accessToken, cloudId);

  return validateData(z.array(ScheduleSchema), response);
}

export async function editSchedule(
  data: Omit<Schedule, 'id'>,
  id: string,
  accessToken: string,
  cloudId: string
): Promise<Schedule> {
  const response = await putBackEnd(`${PATH}/${id}`, data, accessToken, cloudId);

  return validateData(ScheduleSchema, response);
}

export async function deleteSchedule(
  id: string,
  accessToken: string,
  cloudId: string
): Promise<void> {
  const response = await deleteBackEnd(`${PATH}/${id}`, accessToken, cloudId);

  const ResponseSchema = z.object({
    success: z.boolean(),
  });

  validateData(ResponseSchema, response);
}

export function getMemberSchedule(issue: Issue, schedules: Schedule[]): Schedule[] {
  const memberId = issue.fields.assignee?.accountId || schedules[0].memberId;

  return schedules.filter((schedule) => schedule.memberId === memberId);
}

function convertScheduleToRRule(schedule: RecurringSchedule): RRule {
  // TODO later const DaySchema = z.enum(['mo', 'tu', 'we', 'th', 'fr', 'sa', 'su']); in zod Schema
  const dayToNumber: any = { mo: 0, tu: 1, we: 2, th: 3, fr: 4, sa: 5, su: 6 } as const;
  const numbers: number[] = schedule.rrule.byweekday.map((day) => dayToNumber[day]);

  return new RRule({
    freq: RRule.WEEKLY,
    byweekday: numbers,
    dtstart: parseISO(schedule.rrule.dtstart),
    until: parseISO(schedule.rrule.until),
  });
}

export function parseDuration(duration: string): number {
  const [hours, minutes] = duration.split(':').map(Number);
  return (hours * 60 * 60 + minutes * 60) * 1000;
}

export function convertRecurringEventIntoSingle(recurring: RecurringSchedule): SingleSchedule[] {
  const rrule = convertScheduleToRRule(recurring);
  const occurrences = rrule.all();
  // console.log(occurrences);
  return occurrences.map((occurrence, index) => ({
    id: (Number(recurring.id) + index).toString(),
    memberId: recurring.memberId,
    start: occurrence.toISOString(),
    end: new Date(occurrence.getTime() + parseDuration(recurring.duration)).toISOString(),
    duration: null,
    rrule: null,
  }));
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
