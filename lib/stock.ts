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
  const q = encodeURIComponent(symbols.join(","));
  const url = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${q}`;

  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
      console.error("Yahoo quote response not ok", res.status, await res.text());
      return [];
    }

    const json = await res.json();
    const results = Array.isArray(json?.quoteResponse?.result) ? json.quoteResponse.result : [];

    return results.map((stock: any) => ({
      // normalisasi: hapus .JK dan caret ^ untuk frontend
      symbol: String(stock.symbol || "").replace(".JK", "").replace("^", ""),
      price: stock.regularMarketPrice ?? 0,
      change: stock.regularMarketChange ?? 0,
      changePercent: stock.regularMarketChangePercent ?? 0,
    }));
  } catch (error) {
    console.error("Gagal fetch quotes:", error);
    return [];
  }
}
