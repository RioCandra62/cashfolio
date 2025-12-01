"use client";

import { useMemo } from "react";
import Image from "next/image"; // Jangan lupa import Image

// 1. DAFTAR URL LOGO
const STOCK_LOGOS: Record<string, string> = {
  "^JKSE": "https://s3-symbol-logo.tradingview.com/indices/jakarta-composite-index--600.png",
  "BBCA": "https://s3-symbol-logo.tradingview.com/bank-central-asia--big.svg",
  "BBRI": "https://s3-symbol-logo.tradingview.com/bank-rakyat-indonesia--big.svg",
  "BMRI": "https://s3-symbol-logo.tradingview.com/bank-mandiri--big.svg",
  "TLKM": "https://s3-symbol-logo.tradingview.com/telekom-indonesia--big.svg",
  "ASII": "https://s3-symbol-logo.tradingview.com/astra-international--big.svg",
  // Tambahkan logo default/fallback jika symbol tidak ditemukan
  "DEFAULT": "https://s3-symbol-logo.tradingview.com/indices/jakarta-composite-index--600.png" 
};

// ... Helper formatCurrency & STOCK_NAMES (kode sebelumnya) ...
const STOCK_NAMES: Record<string, string> = {
  "^JKSE": "Indeks Harga Saham Gabungan",
  "BBCA": "Bank Central Asia Tbk",
  "BBRI": "Bank Rakyat Indonesia (Persero) Tbk",
  "BMRI": "Bank Mandiri (Persero) Tbk",
  "TLKM": "Telkom Indonesia (Persero) Tbk",
  "ASII": "Astra International Tbk",
};
const formatCurrency = (value: number) => new Intl.NumberFormat("id-ID", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);


export default function StockHighlight({ data, symbol }: { data: any[]; symbol: string }) {

  const stats = useMemo(() => {
    if (!data || data.length === 0) return null;
    const lastData = data[data.length - 1];
    const firstData = data[0];
    const currentPrice = lastData.close;
    const previousPrice = firstData.close;
    const changeValue = currentPrice - previousPrice;
    const changePercent = (changeValue / previousPrice) * 100;
    const isPositive = changeValue >= 0;
    return { currentPrice, changeValue, changePercent, isPositive, lastUpdate: lastData.date };
  }, [data]);

  // Logic Nama & Symbol
  const cleanSymbol = symbol.replace(".JK", "");
  const displayName = STOCK_NAMES[cleanSymbol] || cleanSymbol;
  const displayCode = cleanSymbol === "^JKSE" ? "IHSG" : cleanSymbol;

  // 2. LOGIKA PEMILIHAN LOGO
  // Jika logo untuk symbol tersebut ada, pakai itu. Jika tidak, pakai logo DEFAULT (atau IHSG).
  const activeLogo = STOCK_LOGOS[cleanSymbol] || STOCK_LOGOS["DEFAULT"];

  if (!stats) return <div className="h-24 animate-pulse bg-neutral-800 rounded-lg w-full max-w-md" />;

  return (
    <div className="flex flex-row items-center">
      
      {/* 3. IMPLEMENTASI IMAGE DENGAN LOGIC */}
      <div className="relative mr-6 bg-white rounded-full p-2 border border-gray-200">
          <Image 
            src={activeLogo} // <--- Sumber gambar dinamis disini
            width={80}       // Saya kecilkan sedikit biar proporsional dengan text, ubah ke 120 kalau mau besar lagi
            height={80}
            alt={`${displayCode} Logo`}
            className="rounded-full object-contain" // Pakai object-contain biar logo tidak kepotong
            unoptimized
          />
      </div>

      {/* Bagian Teks Info (Sama seperti sebelumnya) */}
      <div className="flex flex-col">
        <div className="flex items-center gap-2 mb-1">
          <span className="bg-neutral-800 text-white text-xs font-bold px-2 py-0.5 rounded">
            {displayCode}
          </span>
          <span className="text-neutral-400 text-sm font-medium truncate">
            {displayName}
          </span>
        </div>

        <div className="flex items-end gap-4 flex-wrap">
          <h2 className="text-4xl font-bold tracking-tight ">
            {formatCurrency(stats.currentPrice)}
          </h2>
          <div className={`flex items-center gap-1 text-lg font-medium mb-1 ${stats.isPositive ? "text-green-500" : "text-red-500"}`}>
            <span>{stats.isPositive ? "▲" : "▼"}</span>
            <span>{stats.isPositive ? "+" : ""}{formatCurrency(stats.changeValue)}</span>
            <span className="ml-1">({stats.isPositive ? "+" : ""}{stats.changePercent.toFixed(2)}%)</span>
          </div>
        </div>
        
        <p className="text-xs text-neutral-500 mt-2">
           Last update: {new Date(stats.lastUpdate).toLocaleString('id-ID', { dateStyle: 'full', timeStyle: 'short' })}
        </p>
      </div>
    </div>
  );
}