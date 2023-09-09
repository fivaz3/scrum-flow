import { deleteBackEnd, getBackEnd, postBackEnd, putBackEnd } from '@/lib/backend.service';
import { getAccessToken, validateData } from '@/lib/jira.service';
import { z } from 'zod';
import { Issue } from '@/lib/issue.service';

export type Schedule = {
  id: string;
  memberId: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  daysOfWeek: number[];
  isRecurring: boolean;
};

export type ScheduleIn = Omit<Schedule, 'id'>;

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
const dateErrorMessage = 'Format de date invalide. Le format attendu est YYYY-MM-DD';
const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/;
const timeErrorMessage = "Format d'heure invalide. Le format attendu est hh:mm ou hh:mm:ss";

export const ScheduleSchema = z.object({
  id: z.string(),
  memberId: z.string(),
  startDate: z.string().regex(dateRegex, dateErrorMessage),
  endDate: z.string().regex(dateRegex, dateErrorMessage),
  startTime: z.string().regex(timeRegex, timeErrorMessage),
  endTime: z.string().regex(timeRegex, timeErrorMessage),
  isRecurring: z.boolean(),
  daysOfWeek: z.array(z.number()),
});

export const ScheduleInSchema = ScheduleSchema.omit({ id: true }).refine(
  (data) => !(data.isRecurring && data.daysOfWeek.length === 0),
  {
    message: 'Il faut avoir sélectionner au moins 1 jour de la semaine',
    path: ['daysOfWeek'],
  }
);

const PATH = '/api/schedule';

export async function addSchedule(data: ScheduleIn, accessToken: string): Promise<Schedule> {
  // return { ...data, id: Math.random().toString() };
  const response = await postBackEnd(PATH, data, accessToken);

  return validateData(ScheduleSchema, response);
}

export async function getSchedulesServer(): Promise<Schedule[]> {
  const accessToken = await getAccessToken();
  const response = await getBackEnd(PATH, accessToken);

  return validateData(z.array(ScheduleSchema), response);
}

export async function getSchedules(accessToken: string): Promise<Schedule[]> {
  const response = await getBackEnd(PATH, accessToken);

  return validateData(z.array(ScheduleSchema), response);
}

export async function editSchedule(
  data: ScheduleIn,
  id: string,
  accessToken: string
): Promise<Schedule> {
  const response = await putBackEnd(`${PATH}/${id}`, data, accessToken);

  return validateData(ScheduleSchema, response);
}

export async function deleteSchedule(id: string, accessToken: string): Promise<void> {
  const response = await deleteBackEnd(`${PATH}/${id}`, accessToken);

  const ResponseSchema = z.object({
    success: z.boolean(),
  });

  validateData(ResponseSchema, response);
}

export function getMemberSchedule(issue: Issue, schedules: Schedule[]) {
  const memberId = !issue.fields.assignee?.accountId || schedules[0].memberId;

  return schedules.filter((schedule) => schedule.memberId === memberId);
}
