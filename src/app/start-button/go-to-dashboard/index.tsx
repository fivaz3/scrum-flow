import Link from 'next/link';
import { navigation } from '@/app/(dashboard)/dashboard-layout-server/dashboard-layout-client/nav-bar.service';
import LogoMark from '@/components/logo';

interface GoToDashboardButtonProps {}

export default function GoToDashboardButton({}: GoToDashboardButtonProps) {
  return (
    <Link
      href={navigation[1].href}
      className="gap-3 w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
      <LogoMark fill="#ffffff" className="h-8" />
      Aller au Dashboard
    </Link>
  );
}
