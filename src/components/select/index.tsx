import { Listbox } from '@headlessui/react';
import { Children, Fragment, ReactElement, ReactNode } from 'react';
import { SelectItemProps } from '@/components/select-item';
import { ChevronUpDownIcon } from '@heroicons/react/24/solid';

interface SelectProps {
  label: string;
  value: string | number;
  onChange: (_value: string | number) => void;
  children: ReactElement[] | ReactElement;
  disabled?: boolean;
  placeholder?: string;
}

function getChildrenMap(children: ReactElement[] | ReactElement) {
  if (!Array.isArray(children) && children.type === Fragment) {
    return getChildrenMap(children.props.children);
  } else {
    const valueToItemMapping = new Map<string | number, ReactNode>();
    Children.map(children, (child: ReactElement<SelectItemProps>) => {
      valueToItemMapping.set(child.props.value, child.props.children);
    });
    return valueToItemMapping;
  }
}

export default function Select({
  value,
  onChange,
  label,
  children,
  disabled,
  placeholder = 'Rien sélectionné',
}: SelectProps) {
  const map = getChildrenMap(children);

  return (
    <Listbox value={value} onChange={onChange} as="div" disabled={disabled}>
      <Listbox.Label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </Listbox.Label>
      <div className="relative">
        <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          {value ? map.get(value) : placeholder}
          <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </span>
        </Listbox.Button>

        <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
          {children}
        </Listbox.Options>
      </div>
    </Listbox>
  );
}
