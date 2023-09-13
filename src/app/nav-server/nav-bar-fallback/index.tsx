import { ArrowPathIcon } from '@heroicons/react/24/solid';
import Logo from '@/app/nav-server/nav-bar/logo';
import NavLinks from '@/app/nav-server/nav-bar/nav-links';
import MobileMenuButton from '@/app/nav-server/nav-bar/mobile-menu-button';
import UserInfoServer from '@/app/nav-server/nav-bar/user-info-server';

export interface NavBarFallbackProps {}

export default function NavBarFallback({}: NavBarFallbackProps) {
  return (
    <div className="min-h-full">
      <div className="bg-gray-800 pb-32">
        <nav className="bg-gray-800">
          <>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
              <div className="border-b border-gray-700">
                <div className="flex items-center justify-between h-16 px-4 sm:px-0">
                  <div className="flex items-center">
                    <Logo />
                    <NavLinks pathname={null} />
                  </div>
                  <UserInfoServer session={null} />
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
        <header className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          </div>
        </header>
      </div>

      <main className="-mt-32">
        <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
            <div className="h-96 grid justify-center items-center">
              <div className="flex justify-center items-center gap-3">
                <ArrowPathIcon className="animate-spin h-5 w-5" />
                <div className="">Chargement...</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
