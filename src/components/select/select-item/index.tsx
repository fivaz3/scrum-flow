import { Listbox } from '@headlessui/react';
import classNames from 'classnames';
import { CheckIcon } from '@heroicons/react/24/solid';
import { ReactNode } from 'react';

export interface SelectItemProps {
  value: number | string;
  children: ReactNode;
}

export default function SelectItem({ value, children }: SelectItemProps) {
  return (
    <Listbox.Option
      className={({ active }) =>
        classNames(
          active ? 'text-white bg-indigo-600' : 'text-gray-900',
          'cursor-default select-none relative py-2 pl-3 pr-9'
        )
      }
      value={value}>
      {({ selected, active }) => (
        <>
          {children}

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
  );
}
