import LogoMark from '@/components/logo-mark';
import Image from 'next/image';

export interface LogoProps {}

export default function Logo({}: LogoProps) {
  return (
    <div className="flex flex-shrink-0 items-center">
      <Image
        className="block lg:hidden h-8 w-auto"
        src="logo.svg"
        alt="Workflow"
        width={35}
        height={32}
      />
      <LogoMark className="hidden lg:flex h-8 w-auto text-white" />
    </div>
  );
}
