"use client";

import { useEffect, useState } from "react";
import {
  Wallet,
  TrendingUp,
  PiggyBank,
  AlertCircle,
  MoreHorizontal,
  Plus,
  PieChart as PieChartIcon,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import AddBudget from "@/components/budget/addBudget";

import { fetchTotalBudget, getUserBudget } from "@/lib/budget";

// Mock Data untuk contoh
const INITIAL_BUDGETS = [
  {
    id: 1,
    category: "Makanan & Minuman",
    limit: 3000000,
    spent: 2100000,
    color: "bg-orange-500",
  },
  {
    id: 2,
    category: "Transportasi",
    limit: 1500000,
    spent: 800000,
    color: "bg-blue-500",
  },
  {
    id: 3,
    category: "Hiburan / Jajan",
    limit: 1000000,
    spent: 1200000,
    color: "bg-rose-500",
  }, // Over budget
  {
    id: 4,
    category: "Tagihan & Utilities",
    limit: 2000000,
    spent: 1950000,
    color: "bg-yellow-500",
  },
];

export default function BudgetPlannerPage() {
  const [budgets, setBudgets] = useState(INITIAL_BUDGETS);
  const [totalBudget, setTotalBudget] = useState(0);

  // Helper formatting
  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(num);
  };

  // Kalkulasi Total
  const totalLimit = budgets.reduce((acc, curr) => acc + curr.limit, 0);
  const totalSpent = budgets.reduce((acc, curr) => acc + curr.spent, 0);
  const remaining = totalLimit - totalSpent;
  const spentPercentage = Math.round((totalSpent / totalLimit) * 100);

  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    async function load() {
      const result = await fetchTotalBudget();
      setTotalBudget(result);
    }
    load();
  }, []);

  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const res = await getUserBudget();
      setData(res);
    }
    load();
  }, []);

  return (
    <div className="flex flex-col gap-6 bg-[#f8f9fc] min-h-screen p-8 font-sans text-slate-800">
      {/* HEADER SECTION */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Budget Planner</h1>
          <p className="text-slate-500 text-sm mt-1">
            Atur batasan pengeluaran bulananmu.
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="cursor-pointer flex items-center gap-2 bg-slate-900 text-white px-4 py-2.5 rounded-xl hover:bg-slate-800 transition shadow-lg shadow-slate-200 text-sm font-medium"
        >
          <Plus size={16} /> Buat Budget Baru
        </button>
      </div>

      {/* 1. TOP CARDS (SUMMARY) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Total Budget */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between h-32 relative overflow-hidden group">
          <div className="flex justify-between items-start z-10">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <Wallet size={20} />
            </div>
            <span className="text-xs font-semibold bg-green-50 text-green-700 px-2 py-1 rounded-full flex items-center gap-1">
              <ArrowUpRight size={12} /> +12%
            </span>
          </div>
          <div className="z-10">
            <p className="text-slate-500 text-sm font-medium">Total Anggaran</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">
              {formatRupiah(totalBudget)}
            </h3>
          </div>
          {/* Dekorasi Background */}
          <div className="absolute -right-4 -bottom-4 bg-blue-50 w-24 h-24 rounded-full opacity-50 group-hover:scale-125 transition duration-500"></div>
        </div>

        {/* Card 2: Terpakai (Progress) */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between h-32">
          <div className="flex justify-between items-start">
            <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
              <TrendingUp size={20} />
            </div>
          </div>
          <div>
            <div className="flex justify-between items-end mb-1">
              <p className="text-slate-500 text-sm font-medium">Terpakai</p>
              <span className="text-sm font-bold text-slate-700">
                {spentPercentage}%
              </span>
            </div>
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-orange-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${spentPercentage}%` }}
              ></div>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              {formatRupiah(totalSpent)} digunakan
            </p>
          </div>
        </div>

        {/* Card 3: Sisa (Safe Balance) */}
        <div className="bg-emerald-600 p-6 rounded-2xl shadow-lg shadow-emerald-200 flex flex-col justify-between h-32 text-white">
          <div className="flex justify-between items-start">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <PiggyBank size={20} />
            </div>
            <span className="text-xs font-medium bg-emerald-500 px-2 py-1 rounded-full border border-emerald-400">
              Aman
            </span>
          </div>
          <div>
            <p className="text-emerald-100 text-sm font-medium">
              Sisa Anggaran
            </p>
            <h3 className="text-2xl font-bold mt-1">
              {formatRupiah(remaining)}
            </h3>
          </div>
        </div>
      </div>

      {/* 2. MIDDLE SECTION (CHART & ANALYTICS) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-auto lg:h-96">
        {/* Main Chart Area (Ganti "Line Chart") */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800">Analisis Pengeluaran</h3>
            <select className="text-sm border-none bg-slate-50 text-slate-600 rounded-lg px-3 py-1 outline-none cursor-pointer hover:bg-slate-100 transition">
              <option>Bulan Ini</option>
              <option>Bulan Lalu</option>
            </select>
          </div>

          {/* Simulasi Chart Visual (Pake CSS Flex) */}
          <div className="flex-1 flex items-end justify-between gap-2 px-4 pb-2 border-b border-slate-100">
            {[40, 65, 30, 85, 50, 60, 90, 45, 70, 55, 35, 60].map((h, i) => (
              <div
                key={i}
                className="group relative flex-1 bg-slate-100 rounded-t-lg hover:bg-blue-100 transition-all cursor-pointer h-full flex items-end"
              >
                <div
                  style={{ height: `${h}%` }}
                  className="w-full bg-blue-500 rounded-t-md group-hover:bg-blue-600 transition-all relative"
                >
                  {/* Tooltip on hover */}
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition">
                    {h}%
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-slate-400 mt-3 px-2">
            <span>Minggu 1</span>
            <span>Minggu 2</span>
            <span>Minggu 3</span>
            <span>Minggu 4</span>
          </div>
        </div>

        {/* Sidebar / Pie Area (Ganti "Pie Chart") */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-slate-800">Distribusi</h3>
            <PieChartIcon size={18} className="text-slate-400" />
          </div>

          {/* CSS Only Pie Chart using Conic Gradient */}
          <div className="flex-1 flex items-center justify-center py-4">
            <div
              className="relative w-48 h-48 rounded-full"
              style={{
                background: `conic-gradient(
                      #f97316 0% 35%, 
                      #3b82f6 35% 60%, 
                      #eab308 60% 85%, 
                      #f43f5e 85% 100%
                    )`,
              }}
            >
              {/* Inner White Circle to make it a Donut */}
              <div className="absolute inset-4 bg-white rounded-full flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-slate-800">4</span>
                <span className="text-xs text-slate-400">Categories</span>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="space-y-3 mt-2">
            {budgets.slice(0, 3).map((b) => (
              <div
                key={b.id}
                className="flex items-center justify-between text-sm"
              >
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${b.color}`}></div>
                  <span className="text-slate-600">{b.category}</span>
                </div>
                <span className="font-medium text-slate-900">
                  {Math.round((b.limit / totalLimit) * 100)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. BOTTOM SECTION (BUDGET LIST) */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col mt-4">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-slate-900 text-lg">Alokasi Budget</h3>
          <button className="text-sm text-blue-600 font-medium hover:underline">
            Lihat Semua
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          {data.map((bd) => (
            <div className="w-full bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
              {/* Header */}
              <div className="flex flex-row justify-between items-start">
                <div className="flex flex-col">
                  <p className="text-lg font-semibold text-gray-800">
                    {bd.name}
                  </p>
                  <p className="text-xs text-gray-500 tracking-wide">
                    Category
                  </p>
                </div>

                <div className="flex flex-col items-end">
                  <p className="text-xs text-gray-500">Budget</p>
                  <p className="text-xl font-bold text-gray-900">
                    {formatRupiah(bd.budget)}
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
     
            </div>
          ))}
        </div>
      </div>
      <AddBudget isOpen={showAddModal} onClose={() => setShowAddModal(false)} />
    </div>
  );
}
