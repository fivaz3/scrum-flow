import Link from 'next/link';
import classNames from 'classnames';
import { getLinks } from '@/app/nav/nav-bar/nav-bar.service';

export interface NavLinksProps {
  isLogged: boolean;
  pathname: string | null;
}
export default function NavLinks({ isLogged, pathname }: NavLinksProps) {
  return (
    <div className="hidden md:ml-6 md:flex md:space-x-8">
      {getLinks(isLogged).map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={classNames(
            pathname === item.href
              ? 'border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
              : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
          )}
          aria-current={pathname === item.href ? 'page' : undefined}>
          {item.name}
        </Link>
      ))}
    </div>
  );
}
