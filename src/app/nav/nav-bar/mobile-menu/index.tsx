import { Session } from 'next-auth';
import { Disclosure } from '@headlessui/react';
import { navigation } from '@/app/nav/nav-bar/nav-bar.service';
import Link from 'next/link';
import classNames from 'classnames';
import Image from 'next/image';
import { signIn, signOut } from 'next-auth/react';

interface MobileMenuProps {
  pathname: string | null;
  session: Session | null;
}
// Mobile menu
export default function MobileMenu({ pathname, session }: MobileMenuProps) {
  return (
    <Disclosure.Panel className="sm:hidden">
      <div className="space-y-1 pt-2 pb-3">
        {navigation.map((item) => (
          <Disclosure.Button
            as={Link}
            key={item.name}
            href={item.href}
            className={classNames(
              pathname === item.href
                ? 'bg-slate-50 border-slate-500 text-slate-700'
                : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800',
              'block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
            )}
            aria-current={pathname === item.href ? 'page' : undefined}>
            {item.name}
          </Disclosure.Button>
        ))}
      </div>
      <div className="border-t border-gray-200 pt-4 pb-3">
        {session?.user ? (
          <>
            <div className="flex items-center px-4">
              <div className="flex-shrink-0">
                <Image
                  className="h-8 w-8 rounded-full"
                  src={session?.user.image || 'https://avatar.vercel.sh/leerob'}
                  height={32}
                  width={32}
                  alt={`${session?.user.name} avatar`}
                />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">{session?.user.name}</div>
                <div className="text-sm font-medium text-gray-500">{session?.user.email}</div>
              </div>
            </div>
            <div className="mt-3 space-y-1">
              <button
                onClick={() => signOut()}
                className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800">
                Sign out
              </button>
            </div>
          </>
        ) : (
          <div className="mt-3 space-y-1">
            <button
              onClick={() => signIn('atlassian')}
              className="flex w-full px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800">
              Sign in
            </button>
          </div>
        )}
      </div>
    </Disclosure.Panel>
  );
}
