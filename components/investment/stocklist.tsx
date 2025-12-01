"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

// Kamus Logo
const STOCK_LOGOS: Record<string, string> = {
  "^JKSE": "https://s3-symbol-logo.tradingview.com/indices/jakarta-composite-index--600.png",
  "JKSE": "https://s3-symbol-logo.tradingview.com/indices/jakarta-composite-index--600.png",
  "BBCA": "https://s3-symbol-logo.tradingview.com/bank-central-asia--big.svg",
  "BBRI": "https://s3-symbol-logo.tradingview.com/bank-rakyat-indonesia--big.svg",
  "BMRI": "https://s3-symbol-logo.tradingview.com/bank-mandiri--big.svg",
  "TLKM": "https://s3-symbol-logo.tradingview.com/telekom-indonesia--big.svg",
  "ASII": "https://s3-symbol-logo.tradingview.com/astra-international--big.svg",
  DEFAULT: "https://s3-symbol-logo.tradingview.com/indices/jakarta-composite-index--600.png",
};

// Kamus Nama
const STOCK_NAMES: Record<string, string> = {
  "^JKSE": "Indeks Harga Saham Gabungan",
  JKSE: "Indeks Harga Saham Gabungan",
  BBCA: "Bank Central Asia Tbk",
  BBRI: "Bank Rakyat Indonesia (Persero) Tbk",
  BMRI: "Bank Mandiri (Persero) Tbk",
  TLKM: "Telkom Indonesia (Persero) Tbk",
  ASII: "Astra International Tbk",
};

const formatRupiah = (val: number) =>
  new Intl.NumberFormat("id-ID").format(val);

export default function StockList({
  data = [],
  symbol = "",
}: {
  data: any[];
  symbol: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Normalize symbol (hilangkan ^ dan .JK)
  const currentActiveCode = symbol.replace("^", "").replace(".JK", "");

  const handleSelect = (code: string) => {
    const targetSymbol = code === "JKSE" ? "^JKSE" : code;
    const params = new URLSearchParams(searchParams.toString());
    params.set("symbol", targetSymbol);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  if (!data || data.length === 0) {
    return <div className="text-gray-500">Memuat data...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((stock) => {
        const rawSymbol = stock.symbol ?? "UNKNOWN";
        const cleanSymbol = rawSymbol.replace(".JK", "").replace("^", "");

        const price = Number(stock.price) || 0;
        const change = Number(stock.change) || 0;
        const changePercent = Number(stock.changePercent) || 0;

        const displayName = STOCK_NAMES[cleanSymbol] || cleanSymbol;
        const displayLogo = STOCK_LOGOS[cleanSymbol] || STOCK_LOGOS.DEFAULT;

        const isPositive = change > 0;
        const isZero = change === 0;
        const isActive = currentActiveCode === cleanSymbol;

        let colorClass = "text-green-500";
        if (change < 0) colorClass = "text-red-500";
        if (isZero) colorClass = "text-neutral-400";

        return (
          <div
            key={cleanSymbol}
            onClick={() => handleSelect(cleanSymbol)}
            className={`flex items-center gap-4 bg-white border rounded-xl p-4 transition-all cursor-pointer group
              ${
                isActive
                  ? "border-green-500 ring-1 ring-green-500 shadow-md"
                  : "border-neutral-200 hover:scale-105 hover:shadow-lg"
              }
            `}
          >
            <div className="w-16 h-16 relative flex-shrink-0 rounded-full overflow-hidden border border-gray-100">
              <Image
                src={displayLogo}
                alt={displayName}
                fill
                unoptimized
                className="object-contain p-2"
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold text-lg leading-none">{cleanSymbol}</p>
                  <p className="text-xs text-neutral-500 truncate mt-1">
                    {displayName}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-medium">IDR {formatRupiah(price)}</p>
                  <p className={`text-xs font-medium ${colorClass}`}>
                    {!isZero && (isPositive ? "+" : "")}
                    {formatRupiah(change)} ({changePercent.toFixed(2)}%)
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
