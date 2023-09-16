import { getSchedules } from '@/app/(dashboard)/schedules/Calendar/schedule.service';
import Calendar from '@/app/(dashboard)/schedules/Calendar';
import { getMembers } from '@/app/(dashboard)/schedules/Calendar/member.service';
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
