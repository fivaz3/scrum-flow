import Logo from '../../../../components/layout/navbar/logo';
import NavLinks from '../../../../components/layout/navbar/nav-links';
import UserInfoSkeleton from './user-info-skeleton';
import MobileMenuButton from '../../../../components/layout/navbar/mobile-menu-button';

interface NavBarSkeletonProps {}

export default function NavBarSkeleton({}: NavBarSkeletonProps) {
  return (
    <nav className="bg-gray-800">
      <>
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="border-b border-gray-700">
            <div className="flex items-center justify-between h-16 px-4 sm:px-0">
              <div className="flex items-center">
                <Logo />
                <NavLinks pathname={null} />
              </div>
              <UserInfoSkeleton session={null} />
              <div className="-mr-2 flex md:hidden">
                <button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                  <MobileMenuButton open={false} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-700 md:hidden"></div>
      </>
    </nav>
  );
}
