"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path ? "bg-white/10" : "hover:bg-white/10";
  };

  return (
    <aside className="w-64 bg-[#0D1B52] text-white max-h-screen p-6 sticky top-0 print:hidden">
      <div className="text-2xl font-bold mb-10 flex items-center gap-2 rounded-md justify-center p-2 bg-white">
        {/* <div className="w-8 h-8 bg-white rounded-md"></div> */}
        <Image
          src={"/assets/images/logo-landscape-crop.png"}
          width={180}
          height={50}
          alt="logo"
          unoptimized
          className="rounded-md object-center object-cover"
        />
      </div>

      <nav className="space-y-4 text-sm">
        <a
          className={`flex items-center gap-3 p-2 rounded-lg ${isActive(
            "/dashboard"
          )}`}
          href="/dashboard"
        >
          Dashboard
        </a>
        <a
          className={`flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 ${isActive(
            "/dashboard/budgetplan"
          )}`}
          href="/dashboard/budgetplan"
        >
          Budget Plan
        </a>
        <a
          className={`flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 ${isActive(
            "/dashboard/income"
          )}`}
          href="/dashboard/income"
        >
          Your Income
        </a>
        <a
          className={`flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 ${isActive(
            "/dashboard/expanse"
          )}`}
          href="/dashboard/expanse"
        >
          Your Expanse
        </a>
        <a
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10"
          href="/dashboard/report"
        >
          Finance Report
        </a>
        <a
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10"
          href="/dashboard/saving"
        >
          Savings
        </a>
        <a
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10"
          href="/dashboard/investment"
        >
          Investment
          <span className="ml-auto bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
            3
          </span>
        </a>
        <a
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10"
          href="/dashboard/profile"
        >
          User Profile
        </a>
      </nav>

      <div className="mt-10">
        <h2 className="text-sm opacity-70 mb-2">PDF Report</h2>
        <button
          onClick={() => window.print()}
          className="w-full bg-blue-600 py-2 rounded-lg"
        >
          Download
        </button>
      </div>

      <div className="mt-10 flex items-center justify-between">
        <span className="text-sm">Dark Mode</span>
        <label className="inline-flex items-center cursor-pointer">
          <input type="checkbox" className="sr-only peer" />
          <div className="w-10 h-5 bg-gray-400 peer-checked:bg-blue-600 rounded-full relative">
            <div className="absolute w-4 h-4 bg-white rounded-full top-0.5 left-0.5 peer-checked:left-5 transition-all"></div>
          </div>
        </label>
      </div>
    </aside>
  );
}
