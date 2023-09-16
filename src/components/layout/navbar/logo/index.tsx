import LogoType from '@/components/logo-mark';
import LogoMark from '@/components/logo';

interface LogoProps {}

export default function NavBarLogo({}: LogoProps) {
  return (
    <div className="flex flex-shrink-0 items-center">
      <LogoMark className="block lg:hidden h-8 w-auto" />
      <LogoType className="hidden lg:flex h-8 w-auto text-white" />
    </div>
  );
}
