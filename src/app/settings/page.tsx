import { Card } from '@tremor/react';
import { getSchedules } from '@/app/settings/Calendar/schedule.service';
import { getAccessToken } from '@/lib/jira.service';
import Calendar from '@/app/settings/Calendar';
import { getMembers } from '@/app/settings/Calendar/member.service';

interface ActiveSprintPageProps {}

export default async function SettingsPage({}: ActiveSprintPageProps) {
  const members = await getMembers();

  const accessToken = await getAccessToken();

  const currentSchedules = await getSchedules(accessToken);

  return (
    <Card>
      <Calendar members={members} currentSchedules={currentSchedules} />
    </Card>
  );
}
