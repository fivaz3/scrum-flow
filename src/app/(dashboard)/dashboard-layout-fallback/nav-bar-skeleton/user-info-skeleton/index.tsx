import Image from 'next/image';
import { Session } from 'next-auth';

interface UserInfoSkeletonProps {
  session: Session | null;
}

export default function UserInfoSkeleton({ session }: UserInfoSkeletonProps) {
  return (
    <div className="hidden md:block">
      <div className="ml-4 flex items-center md:ml-6">
        <div className="ml-3 relative">
          <div>
            <button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
              <span className="sr-only">Open user menu</span>
              <Image
                className="h-8 w-8 rounded-full"
                src={session?.user?.image || 'https://avatar.vercel.sh/leerob'}
                alt={`${session?.user?.name || 'placeholder'} avatar`}
                height={32}
                width={32}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
