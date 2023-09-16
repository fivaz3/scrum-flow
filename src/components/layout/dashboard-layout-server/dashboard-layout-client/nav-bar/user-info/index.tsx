import { Menu, Transition } from '@headlessui/react';
import Image from 'next/image';
import { Fragment } from 'react';
import classNames from 'classnames';
import { signOut } from 'next-auth/react';
import { Session } from 'next-auth';
import { navigation } from '@/components/layout/dashboard-layout-server/dashboard-layout-client/nav-bar.service';

interface UserInfoProps {
  session: Session | null;
}

export default function UserInfo({ session }: UserInfoProps) {
  return (
    <div className="hidden md:block">
      <div className="ml-4 flex items-center md:ml-6">
        <Menu as="div" className="ml-3 relative">
          <div>
            <Menu.Button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
              <span className="sr-only">Open user menu</span>
              <Image
                className="h-8 w-8 rounded-full"
                src={session?.user?.image || 'https://avatar.vercel.sh/leerob'}
                alt={`${session?.user?.name || 'placeholder'} avatar`}
                height={32}
                width={32}
              />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95">
            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={classNames(
                      { 'bg-gray-100': active },
                      'block px-4 py-2 text-sm text-gray-700'
                    )}
                    onClick={() => signOut({ callbackUrl: navigation[0].href })}>
                    Déconnexion
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
}
