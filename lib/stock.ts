// Definisikan tipe return biar gampang dipakai di frontend
interface HistoryData {
  date: string;
  close: number;
}




export async function getStockData(symbol: string = "^JKSE", range: string = "1mo", interval: string = "1d") {
  // Logika: Jika symbol bukan IHSG (^JKSE) dan belum ada .JK, tambahkan .JK
  let formattedSymbol = symbol;
  if (symbol !== "^JKSE" && !symbol.endsWith(".JK")) {
    formattedSymbol = `${symbol}.JK`;
  }

  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${formattedSymbol}?range=${range}&interval=${interval}`;

  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return [];

    const json = await res.json();
    const result = json.chart?.result?.[0];

    if (!result) return [];

    const timestamps = result.timestamp || [];
    const closes = result.indicators?.quote?.[0]?.close || [];

    return timestamps
      .map((t: number, i: number) => ({
        date: new Date(t * 1000).toISOString(),
        close: closes[i],
      }))
      .filter((item: any) => item.close !== null);
  } catch (error) {
    console.error("Error fetching stock:", error);
    return [];
  }
}

export async function getStockQuotes() {
  const symbols = ["^JKSE", "BBCA.JK", "BBRI.JK", "BMRI.JK", "TLKM.JK", "ASII.JK"];

  async function fetchOne(sym: string) {
    const url = `https://query1.finance.yahoo.com/v7/finance/chart/${sym}`;
    try {
      const res = await fetch(url, { cache: "no-store" });
      const json = await res.json();

      const result = json?.chart?.result?.[0];
      if (!result) return null;

      return {
        symbol: sym.replace(".JK", "").replace("^", ""),
        price: result.meta?.regularMarketPrice ?? 0,
        change: result.meta?.chartPreviousClose
          ? result.meta.regularMarketPrice - result.meta.chartPreviousClose
          : 0,
        changePercent: result.meta?.chartPreviousClose
          ? ((result.meta.regularMarketPrice - result.meta.chartPreviousClose) /
              result.meta.chartPreviousClose) *
            100
          : 0,
      };
    } catch (err) {
      console.error("Gagal fetch", sym, err);
      return null;
    }
  }

  const results = await Promise.all(symbols.map(fetchOne));
  return results.filter(Boolean);
}
