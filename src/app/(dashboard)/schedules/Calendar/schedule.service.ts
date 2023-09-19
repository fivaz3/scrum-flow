import { deleteBackEnd, getBackEnd, postBackEnd, putBackEnd } from '@/lib/backend.service';
import { validateData } from '@/lib/jira.service';
import { z } from 'zod';
import { Issue } from '@/lib/issue/issue.service';

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
