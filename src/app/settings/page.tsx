'use client';
import { Card } from '@tremor/react';
import Calendar from '@/components/Calendar';
interface ActiveSprintPageProps {}

export default function SettingsPage({}: ActiveSprintPageProps) {
  // const { register, handleSubmit, reset } = useForm<FormData>({
  //   defaultValues: {
  //     start_at: '09:00',
  //     end_at: '18:00',
  //   },
  // });
  //
  // const { data: session } = useSession();

  // useEffect(() => {
  //   console.log('x');
  //   if (session?.access_token) {
  //     getBackEnd('/api/working-schedule', session.access_token).then((data) => {
  //       console.log('data', data);
  //       const WorkingScheduleSchema = z.object({
  //         start_at: z.string(),
  //         end_at: z.string(),
  //       });
  //       const workingSchedule = WorkingScheduleSchema.parse(data);
  //       reset(workingSchedule);
  //     });
  //   }
  // }, [reset, session?.access_token]);
  //
  // const onSubmit = async (data: FormData) => {
  //   // Submit data to your backend
  //   console.log('data', data);
  //   if (session?.access_token) {
  //     await postBackEnd('/api/working-schedule', data, session.access_token);
  //   }
  // };

  return (
    <Card>
      <Calendar></Calendar>
    </Card>
  );
}
