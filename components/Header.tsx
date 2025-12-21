import Image from 'next/image';

import { getCurrentUser } from '@/app/action';
import Greeting from './greeting';
export default async function Header() {
  const user = await getCurrentUser();
  return (
    <>
      <div className="flex justify-between items-center mb-8 print:hidden">
        <div>
          <div className='flex flex-row gap-2 text-2xl font-semibold'>
            <Greeting />
            <p>{user?.name}</p>
          </div>
          <p className="text-sm text-gray-600">
            Welcome back, nice to see you again
          </p>
        </div>

        <a href='/dashboard/profile' className="flex items-center gap-5">
            <Image
              src="https://i.pravatar.cc/40"
              width={40}
              height={40}
              alt="avatar"
              unoptimized
              className="rounded-full"
            />
        </a>
      </div>
    </>
  );
}
