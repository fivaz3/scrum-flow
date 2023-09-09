import { Card } from '@tremor/react';
import Calendar from '@/components/Calendar';
import { Member } from '@/components/DevList';
import { getSchedules } from '@/components/Calendar/schedule.service';
import { getAccessToken } from '@/lib/jira.service';

interface ActiveSprintPageProps {}

export default async function SettingsPage({}: ActiveSprintPageProps) {
  const members: Member[] = [
    { id: '1', name: 'Alice' },
    { id: '2', name: 'Bob' },
    { id: '3', name: 'Charlie' },
  ];

  const accessToken = await getAccessToken();

  const currentSchedules = await getSchedules(accessToken);

  return (
    <Card>
      <Calendar members={members} currentSchedules={currentSchedules} />
    </Card>
  );
}
