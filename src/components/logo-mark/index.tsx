import Image from 'next/image';
import classNames from 'classnames';

interface LogoMarkProps {
  className?: string;
}

export default function LogoMark({ className }: LogoMarkProps) {
  return (
    <div
      className={classNames(className, 'flex gap-2 items-center justify-between w-full md:w-auto')}>
      <span className="sr-only">Scrum Flow</span>
      <Image className="h-8 w-auto" src="/logo.svg" alt="scrum flow logo" width={40} height={40} />
      <span className="text-2xl font-bold">Scrum Flow</span>
    </div>
  );
}
