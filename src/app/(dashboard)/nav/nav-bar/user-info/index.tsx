import { Menu, Transition } from '@headlessui/react';
import Image from 'next/image';
import { Fragment } from 'react';
import classNames from 'classnames';
import { signIn, signOut } from 'next-auth/react';
import { Session } from 'next-auth';
import { PlusIcon } from '@heroicons/react/24/solid';

export interface UserInfoProps {
  session: Session | null;
}

export default function UserInfo({ session }: UserInfoProps) {
  return (
    <div className="hidden md:block">
      <div className="ml-4 flex items-center md:ml-6">
        {session?.user ? (
          <>
            <div className="flex-shrink-0">
              <button
                type="button"
                className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                <span>Board</span>
              </button>
            </div>

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
                        onClick={() => signOut()}>
                        Déconnexion
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </>
        ) : (
          <div className="flex-shrink-0">
            <button
              className="gap-1 inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => signIn('atlassian')}>
              <Image
                src="mark-onecolor-blue-atlassian.svg"
                alt="atlassian logo"
                width={24}
                height={24}
              />
              Se connecter avec Atlassian
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
