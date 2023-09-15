import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

interface MobileMenuButtonProps {
  open: boolean;
}

// Mobile menu button
export default function MobileMenuButton({ open }: MobileMenuButtonProps) {
  return (
    <>
      <span className="sr-only">Open main menu</span>
      {open ? (
        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
      ) : (
        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
      )}
    </>
  );
}
