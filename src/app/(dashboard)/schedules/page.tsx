import { getSchedulesServer } from '@/app/(dashboard)/schedules/Calendar/schedule.service';
import Calendar from '@/app/(dashboard)/schedules/Calendar';
import { getMembers } from '@/app/(dashboard)/schedules/Calendar/member.service';
import { getAuthData } from '@/lib/jira.service';

interface ActiveSprintPageProps {}

export default async function SettingsPage({}: ActiveSprintPageProps) {
  const { accessToken, cloudId } = await getAuthData();
  const members = await getMembers(accessToken, cloudId);

  const currentSchedules = await getSchedulesServer();

  return <Calendar members={members} currentSchedules={currentSchedules} />;
}
