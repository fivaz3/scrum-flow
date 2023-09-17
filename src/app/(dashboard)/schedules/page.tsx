import { getSchedules } from '@/app/(dashboard)/schedules/calendar/schedule.service';
import Calendar from '@/app/(dashboard)/schedules/calendar';
import { getMembers } from '@/app/(dashboard)/schedules/calendar/member.service';
import { getAuthData } from '@/lib/jira.service';

interface ActiveSprintPageProps {}

export default async function SettingsPage({}: ActiveSprintPageProps) {
  const { accessToken, cloudId } = await getAuthData();
  const [members, currentSchedules] = await Promise.all([
    getMembers(accessToken, cloudId),
    getSchedules(accessToken, cloudId),
  ]);

  return (
    <Calendar
      members={members}
      currentSchedules={currentSchedules}
      accessToken={accessToken}
      cloudId={cloudId}
    />
  );
}
