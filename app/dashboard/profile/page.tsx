"use client";
import { logoutUser } from "@/app/action";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      // 1. Panggil server action logoutUser yang sudah kita buat
      await logoutUser();

      // 2. Redirect ke halaman login
      router.push("/auth/login");
      router.refresh(); // Refresh agar header/navbar update (misal menghilangkan nama user)
    } catch (error) {
      console.error("Gagal logout:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div className="mb-3">
        <h1 className="text-3xl font-bold text-[#0D1B52] tracking-tight">
          Your Profile
        </h1>
        <p className="text-gray-500 text-sm">
          Let's make this place feel like home ✨
        </p>
      </div>

      {/* TOP CARD */}
      <div className="bg-white p-6 rounded-2xl shadow-sm flex items-center gap-6 border border-gray-100">
        <img
          src="https://i.pravatar.cc/180"
          className="w-28 h-28 rounded-2xl object-cover shadow-md"
        />

        <div className="flex flex-col justify-center">
          <h2 className="text-2xl font-semibold text-[#0D1B52]">
            Alexander Pierce
          </h2>
          <p className="text-gray-500 text-sm">alexander@example.com</p>

          <div className="mt-3 flex gap-3">
            <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">
              Pro Member
            </span>
            <span className="bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full">
              Active
            </span>
          </div>
          <div className="flex flex-row gap-4">
            <button className="mt-4 bg-[#0D1B52] text-white px-4 py-2 rounded-xl hover:bg-[#15256d] transition text-sm">
              Update Profile Photo
            </button>
            <button
              onClick={handleLogout}
              disabled={loading}
              className="mt-4 bg-red-400 text-white px-4 py-2 rounded-xl hover:bg-red-500 transition text-sm"
            >
              {loading ? "Keluar..." : "Logout"}
            </button>
            {/* <a
              href="/auth/login"
              className="mt-4 bg-red-400 text-white px-4 py-2 rounded-xl hover:bg-red-500 transition text-sm"
            >
              Logout
            </a> */}
          </div>
        </div>
      </div>

      {/* PERSONAL INFO */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-semibold mb-4 text-[#0D1B52]">
          Personal Information
        </h3>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-gray-400 text-xs uppercase tracking-wider">
              Full Name
            </p>
            <p className="text-[#0D1B52] font-medium">Alexander Pierce</p>
          </div>

          <div className="space-y-1">
            <p className="text-gray-400 text-xs uppercase tracking-wider">
              Username
            </p>
            <p className="text-[#0D1B52] font-medium">alex_dev</p>
          </div>

          <div className="space-y-1">
            <p className="text-gray-400 text-xs uppercase tracking-wider">
              Email
            </p>
            <p className="text-[#0D1B52] font-medium">alexander@example.com</p>
          </div>

          <div className="space-y-1">
            <p className="text-gray-400 text-xs uppercase tracking-wider">
              Phone
            </p>
            <p className="text-[#0D1B52] font-medium">+62 812 3456 7890</p>
          </div>
        </div>

        <button className="mt-6 bg-blue-100 text-blue-700 px-5 py-2 rounded-xl hover:bg-blue-200 transition text-sm">
          Edit Information
        </button>
      </div>

      {/* SECURITY */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-semibold mb-4 text-[#0D1B52]">Security</h3>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-gray-400 text-xs mb-1 uppercase tracking-wider">
              Current Password
            </p>
            <input
              type="password"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#0D1B52]"
              placeholder="••••••••"
            />
          </div>

          <div>
            <p className="text-gray-400 text-xs mb-1 uppercase tracking-wider">
              New Password
            </p>
            <input
              type="password"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#0D1B52]"
            />
          </div>

          <div>
            <p className="text-gray-400 text-xs mb-1 uppercase tracking-wider">
              Confirm Password
            </p>
            <input
              type="password"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#0D1B52]"
            />
          </div>
        </div>

        <button className="mt-6 bg-red-500 text-white px-5 py-2 rounded-xl hover:bg-red-600 transition text-sm">
          Update Password
        </button>
      </div>
    </div>
  );
}
