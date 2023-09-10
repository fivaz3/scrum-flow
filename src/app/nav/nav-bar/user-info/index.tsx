import { Menu, Transition } from '@headlessui/react';
import Image from 'next/image';
import { Fragment } from 'react';
import classNames from 'classnames';
import { signIn, signOut } from 'next-auth/react';
import { Session } from 'next-auth';

export interface UserInfoProps {
  session: Session | null;
}

export default function UserInfo({ session }: UserInfoProps) {
  return (
    <div className="hidden sm:ml-6 sm:flex sm:items-center">
      <Menu as="div" className="relative ml-3">
        <div>
          <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2">
            <span className="sr-only">Open user menu</span>
            <Image
              className="h-8 w-8 rounded-full"
              src={session?.user?.image || 'https://avatar.vercel.sh/leerob'}
              height={32}
              width={32}
              alt={`${session?.user?.name || 'placeholder'} avatar`}
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95">
          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {session?.user ? (
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={classNames(
                      { 'bg-gray-100': active },
                      'flex w-full px-4 py-2 text-sm text-gray-700'
                    )}
                    onClick={() => signOut()}>
                    Sign out
                  </button>
                )}
              </Menu.Item>
            ) : (
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={classNames(
                      { 'bg-gray-100': active },
                      'flex w-full px-4 py-2 text-sm text-gray-700'
                    )}
                    onClick={() => signIn('atlassian')}>
                    Sign in
                  </button>
                )}
              </Menu.Item>
            )}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
