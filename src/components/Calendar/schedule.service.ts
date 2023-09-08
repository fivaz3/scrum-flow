import { postBackEnd, putBackEnd } from '@/lib/backend.service';
import { validateData } from '@/lib/jira.service';
import { z } from 'zod';

export type Schedule = {
  id: string;
  employeeId: string;
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
const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
const timeErrorMessage = "Format d'heure invalide. Le format attendu est hh:mm";

export const ScheduleSchema = z.object({
  id: z.string(),
  employeeId: z.string(),
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

export async function addSchedule(data: ScheduleIn, accessToken: string): Promise<Schedule> {
  return { ...data, id: Math.random().toString() };
  const response = await postBackEnd('/api/working-schedule', data, accessToken);

  return validateData(ScheduleSchema, response);
}

export async function editSchedule(
  data: ScheduleIn,
  id: string,
  accessToken: string
): Promise<Schedule> {
  return { ...data, id: Math.random().toString() };
  const response = await putBackEnd(`/api/working-schedule/${id}`, data, accessToken);

  return validateData(ScheduleSchema, response);
}
