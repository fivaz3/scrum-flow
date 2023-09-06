'use client';
import { useForm } from 'react-hook-form';
import { Card, Title } from '@tremor/react';
import { getBackEnd, postBackEnd } from '@/lib/backend.service';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { z } from 'zod';
interface ActiveSprintPageProps {}

type FormData = {
  start_at: string;
  end_at: string;
};

export default function SettingsPage({}: ActiveSprintPageProps) {
  const { register, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      start_at: '09:00',
      end_at: '18:00',
    },
  });

  const { data: session } = useSession();

  useEffect(() => {
    console.log('x');
    if (session?.access_token) {
      getBackEnd('/api/working-schedule', session.access_token).then((data) => {
        console.log('data', data);
        const WorkingScheduleSchema = z.object({
          start_at: z.string(),
          end_at: z.string(),
        });
        const workingSchedule = WorkingScheduleSchema.parse(data);
        reset(workingSchedule);
      });
    }
  }, [reset, session?.access_token]);

  const onSubmit = async (data: FormData) => {
    // Submit data to your backend
    console.log('data', data);
    if (session?.access_token) {
      await postBackEnd('/api/working-schedule', data, session.access_token);
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm mx-auto">
        <div className="mb-4">
          <Title>Heures de travail de l&apos;équipe</Title>

          <label htmlFor="workingHoursFrom" className="block text-gray-700 text-sm font-bold mb-2">
            Depuis :
          </label>
          <input
            {...register('start_at')}
            type="time"
            id="workingHoursFrom"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="workingHoursTo" className="block text-gray-700 text-sm font-bold mb-2">
            Jusqu&apos;à :
          </label>
          <input
            {...register('end_at')}
            type="time"
            id="workingHoursTo"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Submit
        </button>
      </form>
    </Card>
  );
}
