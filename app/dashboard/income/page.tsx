"use client";

import { useState } from "react";
import InvoiceModal from "@/components/expanse/invoiceDetail"; // Asumsi komponen ini bisa dipakai untuk detail income juga
import { 
  Filter, 
  Wallet, 
  Briefcase, 
  TrendingUp, 
  Building2, 
  ArrowUpRight,
  MoreHorizontal
} from "lucide-react";

export default function IncomePage() {
  const [showDetail, setShowDetail] = useState(false);
  const [activeTab, setActive] = useState("monthly"); // Default monthly biar lebih masuk akal untuk income

  const tabs = ["daily", "weekly", "monthly", "yearly"];

  return (
    <div className="flex flex-col h-screen bg-[#f8f9fc]">
      
      {/* 1. HEADER & TABS */}
      <div className="px-8 pt-8 pb-4">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Income Monitoring</h1>
            <p className="text-gray-500 mt-1">Lacak semua sumber pemasukanmu.</p>
          </div>
          
          {/* Time Tabs */}
          <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-gray-200 shadow-sm">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActive(tab)}
                className={`
                  capitalize px-4 py-1.5 text-sm font-medium rounded-lg transition-all
                  ${
                    activeTab === tab
                      ? "bg-emerald-50 text-emerald-700 shadow-sm ring-1 ring-emerald-200"
                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                  }
                `}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* 2. STATS CARDS (RINGKASAN) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-2">
          {/* Card 1: Total Masuk */}
          <div className="bg-emerald-600 rounded-2xl p-6 text-white shadow-lg shadow-emerald-200">
            <div className="flex justify-between items-start">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <Wallet size={20} className="text-white" />
              </div>
              <span className="flex items-center gap-1 text-xs font-medium bg-emerald-500/50 px-2 py-1 rounded-full border border-emerald-400/50">
                <TrendingUp size={12} /> +12%
              </span>
            </div>
            <div className="mt-4">
              <p className="text-emerald-100 text-sm font-medium">Total Pemasukan</p>
              <h3 className="text-3xl font-bold mt-1">Rp 24.500.000</h3>
            </div>
          </div>

          {/* Card 2: Sumber Aktif */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <div className="flex justify-between items-start">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <Briefcase size={20} />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-gray-500 text-sm font-medium">Sumber Aktif</p>
              <div className="flex items-end gap-2 mt-1">
                <h3 className="text-2xl font-bold text-gray-900">3 Stream</h3>
                <span className="text-xs text-gray-400 mb-1">bulan ini</span>
              </div>
            </div>
          </div>

          {/* Card 3: Pending/Piutang */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <div className="flex justify-between items-start">
              <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
                <MoreHorizontal size={20} />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-gray-500 text-sm font-medium">Pending Invoices</p>
              <div className="flex items-end gap-2 mt-1">
                <h3 className="text-2xl font-bold text-gray-900">Rp 4.200.000</h3>
                <span className="text-xs text-orange-500 mb-1 font-medium">Unpaid</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. MAIN LIST CONTENT */}
      <main className="flex-1 overflow-hidden px-8 pb-8">
        <div className="h-full bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col">
          
          {/* Table Header */}
          <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/30">
            <div>
              <h3 className="font-bold text-gray-900 text-lg">
                Riwayat Transaksi Masuk
              </h3>
              <p className="text-sm text-gray-500">
                Oktober 2025
              </p>
            </div>
            <button className="flex items-center gap-2 text-sm font-medium text-gray-600 bg-white hover:bg-gray-50 px-4 py-2 rounded-lg border border-gray-200 transition shadow-sm">
              <Filter size={16} /> Filter Sumber
            </button>
          </div>

          {/* SCROLLABLE LIST */}
          <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
            
            {/* ITEM 1: GAJI (SALARY) */}
            <div
              onClick={() => setShowDetail(true)}
              className="group flex items-center justify-between p-5 hover:bg-emerald-50/30 cursor-pointer transition"
            >
              <div className="flex items-center gap-4 w-1/3">
                <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl group-hover:scale-110 transition-transform duration-200">
                  <Building2 size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-base group-hover:text-emerald-700 transition">
                    Gaji Bulanan (Okt)
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">
                    PT Teknologi Maju
                  </p>
                </div>
              </div>

              <div className="w-1/4">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  Main Job
                </span>
              </div>

              <div className="w-1/4">
                <div className="flex items-center gap-2">
                  <div className="p-1 bg-gray-100 rounded-full">
                    <span className="text-[10px] font-bold text-gray-600 px-1">BCA</span>
                  </div>
                  <p className="text-sm text-gray-600">Bank Transfer</p>
                </div>
                <p className="text-xs text-gray-400 mt-1">25 Okt, 10:00 AM</p>
              </div>

              <div className="w-1/6 text-right">
                <p className="font-bold text-emerald-600 text-lg">
                  + Rp 18.500.000
                </p>
                <div className="opacity-0 group-hover:opacity-100 transition text-xs text-emerald-600 font-medium mt-1 flex justify-end items-center gap-1">
                  Lihat Slip <ArrowUpRight size={12}/>
                </div>
              </div>
            </div>

            {/* ITEM 2: FREELANCE */}
            <div className="group flex items-center justify-between p-5 hover:bg-emerald-50/30 cursor-pointer transition">
              <div className="flex items-center gap-4 w-1/3">
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl group-hover:scale-110 transition-transform duration-200">
                  <Briefcase size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-base group-hover:text-indigo-700 transition">
                    Project UI Design App
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">
                    Klien: Studio Kreatif
                  </p>
                </div>
              </div>

              <div className="w-1/4">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                  Freelance
                </span>
              </div>

              <div className="w-1/4">
                <div className="flex items-center gap-2">
                  <div className="p-1 bg-gray-100 rounded-full">
                    <span className="text-[10px] font-bold text-gray-600 px-1">JAGO</span>
                  </div>
                  <p className="text-sm text-gray-600">Transfer</p>
                </div>
                <p className="text-xs text-gray-400 mt-1">22 Okt, 14:30 PM</p>
              </div>

              <div className="w-1/6 text-right">
                <p className="font-bold text-emerald-600 text-lg">
                  + Rp 6.000.000
                </p>
                <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                   Nett
                </span>
              </div>
            </div>

             {/* ITEM 3: INVESTASI/DIVIDEN */}
             <div className="group flex items-center justify-between p-5 hover:bg-emerald-50/30 cursor-pointer transition">
              <div className="flex items-center gap-4 w-1/3">
                <div className="p-3 bg-orange-50 text-orange-600 rounded-xl group-hover:scale-110 transition-transform duration-200">
                  <TrendingUp size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-base group-hover:text-orange-700 transition">
                    Dividen Reksadana
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">
                    Bibit / Stockbit
                  </p>
                </div>
              </div>

              <div className="w-1/4">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-orange-50 text-orange-700 border border-orange-200">
                  Passive
                </span>
              </div>

              <div className="w-1/4">
                <div className="flex items-center gap-2">
                   <p className="text-sm text-gray-600">Auto Reinvest</p>
                </div>
                <p className="text-xs text-gray-400 mt-1">15 Okt, 09:00 AM</p>
              </div>

              <div className="w-1/6 text-right">
                <p className="font-bold text-emerald-600 text-lg">
                  + Rp 150.000
                </p>
              </div>
            </div>

          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-100 bg-gray-50 rounded-b-2xl flex justify-center">
            <button className="text-sm text-gray-500 font-medium hover:text-emerald-600 transition">
              Load more history...
            </button>
          </div>
        </div>
      </main>

      {/* Tetap menggunakan modal yang sama atau buat baru khusus Income */}

    </div>
  );
}