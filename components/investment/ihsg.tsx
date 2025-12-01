"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useMemo } from "react";

// --- FORMATTER HELPERS (Sama seperti sebelumnya) ---
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

const formatXAxis = (dateStr: string, range: string) => {
  const date = new Date(dateStr);
  if (range === "1d") {
    return new Intl.DateTimeFormat("id-ID", { hour: "2-digit", minute: "2-digit" }).format(date);
  }
  if (range === "5d") {
     return new Intl.DateTimeFormat("id-ID", { weekday: "short", hour: "2-digit" }).format(date);
  }
  return new Intl.DateTimeFormat("id-ID", { day: "2-digit", month: "short" }).format(date);
};

const formatDateTooltip = (dateStr: string, range: string) => {
  const date = new Date(dateStr);
  if (range === "1d" || range === "5d") {
      return new Intl.DateTimeFormat("id-ID", { weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }).format(date);
  }
  return new Intl.DateTimeFormat("id-ID", { weekday: "long", year: "numeric", month: "long", day: "numeric" }).format(date);
};

// --- CUSTOM TOOLTIP (Sekarang terima prop color) ---
const CustomTooltip = ({ active, payload, label, range, color }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-neutral-900 border border-neutral-700 p-3 rounded shadow-lg text-sm z-50">
        <p className="text-neutral-400 mb-1">{formatDateTooltip(label, range)}</p>
        {/* Warna teks harga mengikuti warna chart */}
        <p style={{ color: color }} className="font-bold text-base">
          IHSG: {formatCurrency(payload[0].value)}
        </p>
      </div>
    );
  }
  return null;
};

export default function IHSGChart({ data, range = "1mo" }: { data: any[], range?: string }) {
  // 1. Hitung Warna Secara Dinamis
  const trendColor = useMemo(() => {
    if (!data || data.length < 2) return "#22c55e"; // Default hijau
    
    const firstPrice = data[0].close;
    const lastPrice = data[data.length - 1].close;

    // Jika turun, Merah (#ef4444). Jika naik/sama, Hijau (#22c55e)
    return lastPrice < firstPrice ? "#ef4444" : "#22c55e";
  }, [data]);

  if (!data || data.length === 0) {
    return (
      <div className="h-[320px] w-full flex items-center justify-center text-gray-500 text-sm">
        Memuat data chart...
      </div>
    );
  }

  return (
    <div style={{ marginLeft: -20, marginRight: -10 }}>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          {/* 2. Gunakan trendColor di Gradient */}
          <defs>
            <linearGradient id="colorClose" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={trendColor} stopOpacity={0.3} />
              <stop offset="95%" stopColor={trendColor} stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#404040" opacity={0.4} />

          <XAxis
            dataKey="date"
            tickFormatter={(tick) => formatXAxis(tick, range)}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9ca3af", fontSize: 12 }}
            minTickGap={range === "1d" ? 30 : 20}
            dy={10}
          />

          <YAxis
            domain={['auto', 'auto']}
            orientation="right"
            tickFormatter={(value) => new Intl.NumberFormat("id-ID").format(value)}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9ca3af", fontSize: 12 }}
            dx={10}
            padding={{ top: 20, bottom: 20 }}
          />

          <Tooltip
            // 3. Kirim warna ke Tooltip
            content={<CustomTooltip range={range} color={trendColor} />}
            cursor={{ stroke: "#404040", strokeWidth: 1, strokeDasharray: "3 3" }}
          />

          <Area
            type="monotone"
            dataKey="close"
            // 4. Gunakan trendColor di Garis dan Dot
            stroke={trendColor}
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorClose)"
            activeDot={{ r: 6, stroke: trendColor, strokeWidth: 2, fill: "#171717" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}