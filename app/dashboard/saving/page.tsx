"use client";

import {
  Plus,
  Target,
  PiggyBank,
  Wallet,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

export default function Saving() {
  const target = 20000000;
  const saved = 18000000;

  const savingStats = [
    {
      id: 1,
      savingGoal: "Macbook Pro M4",
      target: 25000000,
      saved: 20000000,
      category: "Gadget",
      deadline: "Des 2025",
    },
    {
      id: 2,
      savingGoal: "Dana Darurat",
      target: 50000000,
      saved: 12500000,
      category: "Finance",
      deadline: "Aman",
    },
    {
      id: 3,
      savingGoal: "Liburan Jepang",
      target: 30000000,
      saved: 5000000,
      category: "Travel",
      deadline: "Jun 2026",
    },
    {
      id: 4,
      savingGoal: "DP Rumah",
      target: 150000000,
      saved: 45000000,
      category: "Property",
      deadline: "2030",
    },
  ];

  const progress = Math.floor((saved / target) * 100);

  const formatNum = (n: number) => new Intl.NumberFormat("id-ID").format(n);
  // Mock Data Global (Total dari semua goals)
  const totalTargetGlobal = savingStats.reduce((acc, curr) => acc + curr.target, 0);
  const totalSavedGlobal = savingStats.reduce((acc, curr) => acc + curr.saved, 0);
  const globalProgress = Math.floor((totalSavedGlobal / totalTargetGlobal) * 100);

  return (
    <div className="flex flex-col gap-12">
      {/* Saving overview */}
      <div className="flex flex-col gap-6">
        {/* Title & Action */}
        <div className="flex flex-row items-end justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#0D1B52]">Saving Goals</h1>
            <p className="text-gray-500 mt-1">
              Wujudkan impianmu satu per satu.
            </p>
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-[#0D1B52] text-white rounded-xl shadow-lg shadow-blue-900/20 hover:bg-[#1a2d75] hover:scale-105 transition-all active:scale-95">
            <Plus size={18} />
            <span className="font-medium">Create New Goal</span>
          </button>
        </div>

        {/* 2. OVERVIEW STATS (The New Header) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Total Tabungan Terkumpul */}
          <div className="bg-blue-600 rounded-2xl p-6 text-white shadow-lg shadow-blue-200">
            <div className="flex justify-between items-start">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <Wallet size={20} className="text-white" />
              </div>
              <span className="flex items-center gap-1 text-xs font-medium bg-emerald-500/50 px-2 py-1 rounded-full border border-emerald-400/50">
                <TrendingUp size={12} /> +12%
              </span>
            </div>
            <div className="mt-4">
              <p className="text-emerald-100 text-sm font-medium">
                Total Tabungan
              </p>
              <h3 className="text-3xl font-bold mt-1">Rp {formatNum(saved)}</h3>
            </div>
          </div>
          {/* Card 2: Total Target Global */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
            <div className="w-full mr-4">
              <p className="text-sm font-medium text-gray-500 mb-1">
                Total Target (Global)
              </p>
              <h3 className="text-2xl font-bold text-gray-900">
                IDR {formatNum(totalTargetGlobal)}
              </h3>

              {/* Mini Progress Bar Global */}
              <div className="mt-3 w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-500 rounded-full"
                  style={{ width: `${globalProgress}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-400 mt-1 text-right">
                {globalProgress}% Terkumpul
              </p>
            </div>
            <div className="h-12 w-12 min-w-[3rem] bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
              <Target size={24} />
            </div>
          </div>

          {/* Card 3: Goals Count */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">
                Goals Aktif
              </p>
              <h3 className="text-2xl font-bold text-gray-900">
                {formatNum(totalTargetGlobal)}
              </h3>
              <p className="text-xs text-gray-400 mt-1">2 tercapai tahun ini</p>
            </div>
            <div className="h-12 w-12 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600">
              <Wallet size={24} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-12">
        {savingStats.map((item) => {
          
          // 3. Logic Hitung Progress (Per Item)
          const progress = Math.floor((item.saved / item.target) * 100);
          const remaining = item.target - item.saved;

          return (
            <div 
              key={item.id} 
              className="w-full border-l-[5px] border-blue-600 bg-white rounded-md shadow-lg p-6 flex flex-col gap-4"
            >
              <div className="flex flex-row justify-between">
                <div className="flex flex-col">
                  {/* Ganti hardcode jadi dynamic data */}
                  <p className="text-lg font-semibold">{item.savingGoal}</p>
                  <p className="text-sm text-gray-500">Saving Goal</p>
                </div>
                <div className="flex flex-col">
                  <p className="text-sm text-right text-gray-500">Target</p>
                  <p className="text-lg font-semibold">IDR {formatNum(item.target)}</p>
                </div>
              </div>

              {/* Progress Bar Section */}
              <div className="flex flex-row items-center gap-8">
                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="font-medium text-gray-700 min-w-[3rem] text-right">{progress}%</p>
              </div>

              <div className="h-px bg-gray-200"></div>

              {/* Footer Section (Saved & Remaining) */}
              <div className="flex flex-row justify-between">
                <div className="justify-between text-sm text-gray-700 flex flex-col">
                  <p>Saved: </p>
                  <span className="font-semibold text-lg">
                    IDR {formatNum(item.saved)}
                  </span>
                </div>
                <div className="justify-between text-sm text-gray-700 flex flex-col">
                  <p className="text-right">Remaining: </p>
                  <span className="font-semibold text-lg text-emerald-600 text-right">
                    IDR {formatNum(remaining)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
        {/* End Loop */}
      </div>
    </div>
  );
}
