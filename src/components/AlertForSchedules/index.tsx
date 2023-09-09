import BannerWithNavigation from '@/components/BannerWithNavigation';
import { getSchedulesServer } from '@/app/settings/Calendar/schedule.service';

export interface AlertForSchedulesProps {}

export default async function AlertForSchedules({}: AlertForSchedulesProps) {
  const schedules = await getSchedulesServer();

  if (schedules.length === 0) {
    return (
      <BannerWithNavigation path={'/settings'} linkMessage={'Réglages'}>
        Allez dans les Réglages et ajoutez les heures de travail d&apos;au moins un des membres pour
        calculer le temps passé sur un ticket.
      </BannerWithNavigation>
    );
  }
}
