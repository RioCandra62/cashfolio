"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

const OPTIONS = [
  { label: "1D", range: "1d", interval: "5m" },
  { label: "5D", range: "5d", interval: "1h" },
  { label: "1M", range: "1mo", interval: "1d" },
  { label: "3M", range: "3mo", interval: "1d" },
  { label: "6M", range: "6mo", interval: "1d" },
  { label: "1Y", range: "1y", interval: "1d" },
  { label: "5Y", range: "5y", interval: "1wk" },
  { label: "YTD", range: "ytd", interval: "1d" },
];

export default function TimeSelector({
  currentRange,
  // currentInterval tidak wajib dipakai di prop untuk styling jika range sudah unik
}: {
  currentRange: string;
  currentInterval: string;
}) {
  const router = useRouter();
  const pathname = usePathname(); // Mengambil path saat ini secara dinamis
  const searchParams = useSearchParams(); // Mengambil params yang ada

  const select = (range: string, interval: string) => {
    // 1. Buat object URLSearchParams baru dari params yang sekarang
    const params = new URLSearchParams(searchParams.toString());
    
    // 2. Update hanya range dan interval
    params.set("range", range);
    params.set("interval", interval);

    // 3. Gunakan replace agar history browser tidak penuh
    // scroll: false agar halaman tidak lompat ke atas saat ganti filter
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex gap-2">
      {OPTIONS.map((opt) => (
        <button
          key={opt.label}
          onClick={() => select(opt.range, opt.interval)}
          className={`px-3 py-1 rounded border text-sm transition-colors ${
            currentRange === opt.range
              ? "bg-green-600 text-white border-green-600"
              : "bg-neutral-800 text-gray-300 border-neutral-700 hover:bg-neutral-700"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}