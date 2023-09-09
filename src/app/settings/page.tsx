import { Card } from '@tremor/react';
import { getSchedulesServer } from '@/app/settings/Calendar/schedule.service';
import Calendar from '@/app/settings/Calendar';
import { getMembers } from '@/app/settings/Calendar/member.service';

interface ActiveSprintPageProps {}

export default async function SettingsPage({}: ActiveSprintPageProps) {
  const members = await getMembers();

  const currentSchedules = await getSchedulesServer();

  return (
    <Card>
      <Calendar members={members} currentSchedules={currentSchedules} />
    </Card>
  );
}
