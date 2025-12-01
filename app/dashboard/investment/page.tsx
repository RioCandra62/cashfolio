import { getStockData, getStockQuotes } from "@/lib/stock"; // Gunakan fungsi baru
import IHSGChart from "@/components/investment/ihsg";
import TimeSelector from "@/components/investment/timeSelector";
import StockHighlight from "@/components/investment/stockHighlight";
import StockList from "@/components/investment/stocklist"; // Import component baru

export const dynamic = "force-dynamic";

export default async function InvestmentPage({
  searchParams,
}: {
  searchParams: Promise<{ range?: string; interval?: string; symbol?: string }>;
}) {
  const params = await searchParams;

  const range = params?.range || "1mo";
  const interval = params?.interval || "1d";
  // Kalau URL kosong, default ke IHSG (^JKSE)
  const symbol = params?.symbol || "^JKSE";

  // Ambil data sesuai symbol yang dipilih
  const data = await getStockData(symbol, range, interval);

  const listData = await getStockQuotes();


  return (
    <div className="p-6 space-y-6">
      <StockHighlight data={data} symbol={symbol}/>

      <TimeSelector currentRange={range} currentInterval={interval} />

      <IHSGChart data={data} />
      
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-bold">Top Movers (LQ45)</h3>
        
        {/* Panggil Component List Saham Disini */}
        <StockList data={listData} symbol={symbol} />
      </div>
    </div>
  );
}