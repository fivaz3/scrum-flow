import { getSchedulesServer } from '@/app/(dashboard)/settings/Calendar/schedule.service';
import Calendar from '@/app/(dashboard)/settings/Calendar';
import { getMembers } from '@/app/(dashboard)/settings/Calendar/member.service';

interface ActiveSprintPageProps {}

export default async function SettingsPage({}: ActiveSprintPageProps) {
  const members = await getMembers();

  const currentSchedules = await getSchedulesServer();

  return <Calendar members={members} currentSchedules={currentSchedules} />;
}
