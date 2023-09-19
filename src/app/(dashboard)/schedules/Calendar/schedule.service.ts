import { deleteBackEnd, getBackEnd, postBackEnd, putBackEnd } from '@/lib/backend.service';
import { getAuthData, validateData } from '@/lib/jira.service';
import { z } from 'zod';
import { Issue } from '@/lib/issue/issue.service';

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
const dateErrorMessage = 'Format de date invalide. Le format attendu est yyyy-MM-dd';
const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/;
const timeErrorMessage = "Format d'heure invalide. Le format attendu est hh:mm ou hh:mm:ss";

export const SingleScheduleSchema = z.object({
  id: z.number(),
  memberId: z.string(),
  start: z.string(),
  end: z.string(),
  duration: z.null(),
  rrule: z.object({
    freq: z.null(),
    byweekday: z.null(),
    dtstart: z.null(),
    until: z.null(),
  }),
});

export type SingleSchedule = z.infer<typeof SingleScheduleSchema>;

export const RecurringScheduleSchema = z.object({
  id: z.number(),
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

export const ScheduleInSchema = z
  .object({
    memberId: z.string(),
    startDate: z.string().regex(dateRegex, dateErrorMessage),
    startTime: z.string().regex(timeRegex, timeErrorMessage),
    endDate: z.string().regex(dateRegex, dateErrorMessage),
    endTime: z.string(),
    isRecurring: z.boolean(),
    byweekday: z.array(z.string()),
    until: z.string(),
  })
  .refine(({ isRecurring, byweekday }) => !(isRecurring && byweekday.length === 0), {
    message: 'Il faut avoir sélectionné au moins 1 jour de la semaine',
    path: ['byweekday'],
  })
  .refine(({ isRecurring, until }) => !(isRecurring && !dateRegex.test(until)), {
    message: dateErrorMessage,
    path: ['until'],
  });

export type ScheduleIn = z.infer<typeof ScheduleInSchema>;

const PATH = '/api/schedule';

export async function addSchedule(
  data: ScheduleIn,
  accessToken: string,
  cloudId: string
): Promise<Schedule> {
  const response = await postBackEnd(PATH, data, accessToken, cloudId);

  return validateData(ScheduleSchema, response);
}

export async function getSchedulesServer(): Promise<Schedule[]> {
  const { accessToken, cloudId } = await getAuthData();
  const response = await getBackEnd(PATH, accessToken, cloudId);

  return validateData(z.array(ScheduleSchema), response);
}

export async function getSchedules(accessToken: string, cloudId: string): Promise<Schedule[]> {
  const response = await getBackEnd(PATH, accessToken, cloudId);

  return validateData(z.array(ScheduleSchema), response);
}

export async function editSchedule(
  data: ScheduleIn,
  id: number,
  accessToken: string,
  cloudId: string
): Promise<Schedule> {
  const response = await putBackEnd(`${PATH}/${id}`, data, accessToken, cloudId);

  return validateData(ScheduleSchema, response);
}

export async function deleteSchedule(
  id: number,
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
