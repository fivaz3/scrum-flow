import Link from 'next/link';
import classNames from 'classnames';
import { getLinks } from '@/app/(dashboard)/nav/nav-bar/nav-bar.service';

export interface NavLinksProps {
  isLogged: boolean;
  pathname: string | null;
}
export default function NavLinks({ isLogged, pathname }: NavLinksProps) {
  return (
    <div className="hidden md:block">
      <div className="ml-10 flex items-baseline space-x-4">
        {getLinks(isLogged).map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={classNames(
              pathname === item.href
                ? 'bg-gray-900 text-white'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
              'px-3 py-2 rounded-md text-sm font-medium'
            )}
            aria-current={pathname === item.href ? 'page' : undefined}>
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
