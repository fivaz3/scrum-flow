import { ArrowPathIcon } from '@heroicons/react/24/solid';
import classNames from 'classnames';

interface LoadingBarProps {
  className?: string;
}

export default function Loading({ className }: LoadingBarProps) {
  return (
    <div className="h-96 grid justify-center items-center">
      <div className="flex justify-center items-center gap-3">
        <ArrowPathIcon className="animate-spin h-5 w-5" />
        <div className={classNames(className)}>Chargement...</div>
      </div>
    </div>
  );
}
