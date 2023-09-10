import Image from 'next/image';

export interface LogoProps {}

export default function Logo({}: LogoProps) {
  return (
    <div className="flex flex-shrink-0 items-center">
      <Image
        className="block lg:hidden h-8 w-auto"
        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
        alt="Workflow"
        width={35}
        height={32}
      />
      <Image
        className="hidden lg:block h-8 w-auto"
        src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg"
        alt="Workflow"
        width={143}
        height={32}
      />
    </div>
  );
}
