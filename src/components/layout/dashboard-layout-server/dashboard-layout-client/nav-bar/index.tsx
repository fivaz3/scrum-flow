import { Disclosure } from '@headlessui/react';
import NavBarLogo from '../../../navbar/logo';
import NavLinks from '../../../navbar/nav-links';
import MobileMenuButton from '../../../navbar/mobile-menu-button';
import { Session } from 'next-auth';
import UserInfo from '@/components/layout/dashboard-layout-server/dashboard-layout-client/nav-bar/user-info';
import MobileMenu from '@/components/layout/dashboard-layout-server/dashboard-layout-client/nav-bar/mobile-menu';

interface NavBarCoreProps {
  pathname: string | null;
  session: Session | null;
}

export default function NavBar({ session, pathname }: NavBarCoreProps) {
  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="border-b border-gray-700">
              <div className="flex items-center justify-between h-16 px-4 sm:px-0">
                <div className="flex items-center">
                  <NavBarLogo />
                  <NavLinks pathname={pathname} />
                </div>
                <UserInfo session={session} />
                <div className="-mr-2 flex md:hidden">
                  <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                    <MobileMenuButton open={open} />
                  </Disclosure.Button>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="border-b border-gray-700 md:hidden">
            <MobileMenu pathname={pathname} session={session} />
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
