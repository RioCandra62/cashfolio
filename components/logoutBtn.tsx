"use client";
import { logoutUser } from "@/app/action";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function logoutBtn() {
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
    <button
      onClick={handleLogout}
      disabled={loading}
      className="mt-4 bg-red-400 text-white px-4 py-2 rounded-xl hover:bg-red-500 transition text-sm"
    >
      {loading ? "Keluar..." : "Logout"}
    </button>
  );
}
