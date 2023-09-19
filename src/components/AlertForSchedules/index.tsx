import BannerWithNavigation from '@/components/BannerWithNavigation';
import { getSchedules } from '@/app/(dashboard)/schedules/calendar/schedule.service';
import { navigation } from '@/components/layout/dashboard-layout-server/dashboard-layout-client/nav-bar.service';

interface AlertForSchedulesProps {
  accessToken: string;
  cloudId: string;
}

export default async function AlertForSchedules({ accessToken, cloudId }: AlertForSchedulesProps) {
  const schedules = await getSchedules(accessToken, cloudId);

  const link = navigation[3];

  if (schedules.length === 0) {
    return (
      <BannerWithNavigation path={link.href} linkMessage={link.name}>
        Allez dans le plan d&apos;horaires et ajoutez les heures de travail d&apos;au moins un des
        membres pour calculer le temps passé sur un ticket.
      </BannerWithNavigation>
    );
  }
}
