import Image from 'next/image';
export default function Header() {
  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold">Good Morning, Alexander</h1>
          <p className="text-sm text-gray-600">
            Welcome back, nice to see you again
          </p>
        </div>

        <div className="flex items-center gap-5">
          <span className="w-6 h-6 bg-gray-400 rounded-full"></span>
          <span className="w-6 h-6 bg-gray-400 rounded-full"></span>
          <a href="/dashboard/profile">
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
      </div>
    </>
  );
}
