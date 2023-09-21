import classNames from 'classnames';
import { ArrowPathIcon } from '@heroicons/react/24/solid';
import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'red' | 'indigo';
  isLoading?: boolean;
}

export default function ButtonWithLoading({
  isLoading = false,
  color = 'indigo',
  children,
  disabled,
  className,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || isLoading;

  return (
    <button
      {...props}
      disabled={isDisabled}
      className={classNames(
        className,
        isLoading ? 'ps-3 ' : 'ps-4 ',
        isDisabled
          ? `bg-${color}-500 outline-none ring-2 ring-offset-2 `
          : `bg-${color}-600 hover:bg-${color}-700 `,
        `pe-4 focus:ring-${color}-500 focus:outline-none focus:ring-2 focus:ring-offset-2 text-white flex justify-center gap-1 py-2 rounded-md border border-transparent shadow-sm text-base font-medium sm:w-auto sm:text-sm`
      )}>
      {isLoading && <ArrowPathIcon className="animate-spin h-5 w-5" />}
      {children}
    </button>
  );
}
