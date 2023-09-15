import { ArrowPathIcon } from '@heroicons/react/24/solid';
import classNames from 'classnames';

interface LoadingBarProps {
  title?: string;
  className?: string;
}

export default function Loading({ title = 'Chargement...', className }: LoadingBarProps) {
  return (
    <div className={classNames(className, 'grid justify-center items-center')}>
      <div className="flex justify-center items-center gap-3">
        <ArrowPathIcon className="animate-spin h-5 w-5" />
        <div>{title}</div>
      </div>
    </div>
  );
}
