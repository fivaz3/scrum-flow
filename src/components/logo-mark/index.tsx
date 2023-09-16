import classNames from 'classnames';
import LogoMark from '@/components/logo';

interface LogoMarkProps {
  className?: string;
}

export default function LogoType({ className }: LogoMarkProps) {
  return (
    <div
      className={classNames(className, 'flex gap-2 items-center justify-between w-full md:w-auto')}>
      <span className="sr-only">Scrum Flow</span>
      <LogoMark className="h-8 w-auto" />
      <span className="text-2xl font-bold">Scrum Flow</span>
    </div>
  );
}
