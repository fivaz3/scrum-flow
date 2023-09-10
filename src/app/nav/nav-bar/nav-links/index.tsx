import Link from 'next/link';
import classNames from 'classnames';
import { navigation } from '@/app/nav/nav-bar/nav-bar.service';

export interface NavLinksProps {
  pathname: string | null;
}

export default function NavLinks({ pathname }: NavLinksProps) {
  return (
    <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
      {navigation.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={classNames(
            pathname === item.href
              ? 'border-slate-500 text-gray-900'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
            'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
          )}
          aria-current={pathname === item.href ? 'page' : undefined}>
          {item.name}
        </Link>
      ))}
    </div>
  );
}
