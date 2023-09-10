import { Session } from 'next-auth';
import { Disclosure } from '@headlessui/react';
import Link from 'next/link';
import classNames from 'classnames';
import Image from 'next/image';
import { signIn, signOut } from 'next-auth/react';
import { getLinks } from '@/app/nav/nav-bar/nav-bar.service';

interface MobileMenuProps {
  pathname: string | null;
  session: Session | null;
}
// Mobile menu
export default function MobileMenu({ pathname, session }: MobileMenuProps) {
  return (
    <>
      <MobileMenuItems isLogged={!!session?.user} pathname={pathname} />
      <MobileUserInfo session={session} />
    </>
  );
}

interface MobileMenuItemsProps {
  isLogged: boolean;
  pathname: string | null;
}

function MobileMenuItems({ isLogged, pathname }: MobileMenuItemsProps) {
  return (
    <div className="pt-2 pb-3 space-y-1">
      {getLinks(isLogged).map((item) => (
        <Disclosure.Button
          as={Link}
          key={item.name}
          href={item.href}
          className={classNames(
            pathname === item.href
              ? 'bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6'
              : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6'
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
    <div className="pt-4 pb-3 border-t border-gray-200">
      <div className="flex items-center px-4 sm:px-6">
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
          <div className="text-base font-medium text-gray-800">{session?.user?.name}</div>
          <div className="text-sm font-medium text-gray-500">{session?.user?.email}</div>
        </div>
      </div>
      <div className="mt-3 space-y-1">
        {session?.user ? (
          <Disclosure.Button
            onClick={() => signOut()}
            className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 sm:px-6">
            Sign out
          </Disclosure.Button>
        ) : (
          <Disclosure.Button
            onClick={() => signIn('atlassian')}
            className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 sm:px-6">
            Sign in
          </Disclosure.Button>
        )}
      </div>
    </div>
  );
}
