import { Session } from 'next-auth';
import { Disclosure } from '@headlessui/react';
import Link from 'next/link';
import classNames from 'classnames';
import Image from 'next/image';
import { signOut } from 'next-auth/react';
import {
  getPrivateLinks,
  navigation,
} from '@/components/layout/dashboard-layout-server/dashboard-layout-client/nav-bar.service';

interface MobileMenuProps {
  pathname: string | null;
  session: Session | null;
}
// Mobile menu
export default function MobileMenu({ pathname, session }: MobileMenuProps) {
  return (
    <>
      <MobileMenuItems pathname={pathname} />
      <MobileUserInfo session={session} />
    </>
  );
}

interface MobileMenuItemsProps {
  pathname: string | null;
}

function MobileMenuItems({ pathname }: MobileMenuItemsProps) {
  return (
    <div className="px-2 py-3 space-y-1 sm:px-3">
      {getPrivateLinks().map((item) => (
        <Disclosure.Button
          as={Link}
          key={item.name}
          href={item.href}
          className={classNames(
            pathname === item.href
              ? 'bg-gray-900 text-white'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white',
            'block px-3 py-2 rounded-md text-base font-medium'
          )}
          aria-current={pathname === item.href ? 'page' : undefined}>
          {item.name}
        </Disclosure.Button>
      ))}
    </div>
  );
}

interface MobileUserInfoProps {
  session: Session | null;
}

function MobileUserInfo({ session }: MobileUserInfoProps) {
  return (
    <div className="pt-4 pb-3 border-t border-gray-700">
      <div className="flex items-center px-5">
        <div className="flex-shrink-0">
          <Image
            className="h-10 w-10 rounded-full"
            src={session?.user?.image || 'https://avatar.vercel.sh/leerob'}
            height={40}
            width={40}
            alt={`${session?.user?.name} avatar`}
          />
        </div>
        <div className="ml-3">
          <div className="text-base font-medium leading-none text-white">{session?.user?.name}</div>
          <div className="text-sm font-medium leading-none text-gray-400">
            {session?.user?.email}
          </div>
        </div>
      </div>
      <div className="mt-3 space-y-1">
        <Disclosure.Button
          onClick={() => signOut({ callbackUrl: navigation[0].href })}
          className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700">
          Déconnexion
        </Disclosure.Button>
      </div>
    </div>
  );
}
