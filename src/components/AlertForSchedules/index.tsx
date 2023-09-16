import BannerWithNavigation from '@/components/BannerWithNavigation';
import { getSchedulesServer } from '@/app/(dashboard)/schedules/Calendar/schedule.service';
import { navigation } from '@/components/layout/dashboard-layout-server/dashboard-layout-client/nav-bar.service';

interface AlertForSchedulesProps {}

export default async function AlertForSchedules({}: AlertForSchedulesProps) {
  const schedules = await getSchedulesServer();

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
