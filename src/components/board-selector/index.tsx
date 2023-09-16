'use client';

import { Board } from '@/lib/board.service';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Fragment, useCallback } from 'react';
import classNames from 'classnames';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/24/solid';

interface BoardSelectorProps {
  currentBoard: Board;
  boards: Board[];
}

export default function BoardSelector({ boards, currentBoard }: BoardSelectorProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;

  const createQueryString = useCallback(
    (name: string, value: number) => {
      const params = new URLSearchParams(Array.from(searchParams.entries()));
      params.set(name, `${value}`);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <>
      <div className="flex items-center gap-2">
        <Listbox
          value={currentBoard.id}
          onChange={(boardId) => {
            router.push(`${pathname}?${createQueryString('boardId', boardId)}`);
          }}>
          {({ open }) => (
            <>
              <Listbox.Label className="block text-sm font-medium text-gray-700">
                Board actuel
              </Listbox.Label>
              <div className="mt-1 relative">
                <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                  <span className="flex items-center">
                    <img
                      src={currentBoard.location.avatarURI}
                      alt="board logo"
                      className="flex-shrink-0 h-6 w-6 rounded-full"
                    />
                    <span className="ml-3 block truncate">{currentBoard.name}</span>
                  </span>
                  <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </span>
                </Listbox.Button>

                <Transition
                  show={open}
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0">
                  <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                    {boards.map((board) => (
                      <Listbox.Option
                        key={board.id}
                        className={({ active }) =>
                          classNames(
                            active ? 'text-white bg-indigo-600' : 'text-gray-900',
                            'cursor-default select-none relative py-2 pl-3 pr-9'
                          )
                        }
                        value={board.id}>
                        {({ selected, active }) => (
                          <>
                            <div className="flex items-center">
                              <img
                                src={board.location.avatarURI}
                                alt="board logo"
                                className="flex-shrink-0 h-6 w-6 rounded-full"
                              />
                              <span
                                className={classNames(
                                  selected ? 'font-semibold' : 'font-normal',
                                  'ml-3 block truncate'
                                )}>
                                {board.name}
                              </span>
                            </div>

                            {selected ? (
                              <span
                                className={classNames(
                                  active ? 'text-white' : 'text-indigo-600',
                                  'absolute inset-y-0 right-0 flex items-center pr-4'
                                )}>
                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </>
          )}
        </Listbox>
      </div>
    </>
  );
}
