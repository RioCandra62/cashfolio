"use client";

import { useState } from "react";
import InvoiceModal from "@/components/expanse/invoiceDetail";
import { 
  Filter, 
  ShoppingBag, 
  Coffee, 
  Zap, 
  TrendingDown, 
  CreditCard,
  PieChart,
  AlertCircle
} from "lucide-react";

export default function ExpensePage() {
  const [showDetail, setShowDetail] = useState(false);
  const [activeTab, setActive] = useState("monthly");

  const tabs = ["daily", "weekly", "monthly"];

  return (
    <div className="flex flex-col h-screen bg-[#f8f9fc]">
      
      {/* 1. HEADER & TABS */}
      <div className="px-8 pt-4 pb-4">
        {/* <div className="flex justify-between items-end mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Expense Tracking</h1>
            <p className="text-gray-500 mt-1">Pantau kemana perginya uangmu.</p>
          </div>

        </div> */}

        {/* 2. STATS CARDS (EXPENSE FOCUS) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-2">
          
          {/* Card 1: Total Keluar (Warning Color) */}
          <div className="bg-rose-600 rounded-2xl p-6 text-white shadow-lg shadow-rose-200">
            <div className="flex justify-between items-start">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <CreditCard size={20} className="text-white" />
              </div>
              <span className="flex items-center gap-1 text-xs font-medium bg-rose-500/50 px-2 py-1 rounded-full border border-rose-400/50">
                <TrendingDown size={12} /> Boros +5%
              </span>
            </div>
            <div className="mt-4">
              <p className="text-rose-100 text-sm font-medium">Total Pengeluaran</p>
              <h3 className="text-3xl font-bold mt-1">Rp 8.450.000</h3>
            </div>
          </div>

          {/* Card 2: Sisa Budget (Budget Control) */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <div className="flex justify-between items-start">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <PieChart size={20} />
              </div>
              <span className="text-xs font-medium text-gray-400">Monthly Limit</span>
            </div>
            <div className="mt-4">
              <div className="flex justify-between items-end mb-2">
                <p className="text-gray-500 text-sm font-medium">Sisa Budget</p>
                <span className="text-sm font-bold text-gray-900">35%</span>
              </div>
              {/* Progress Bar */}
              <div className="w-full bg-gray-100 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full w-[65%]"></div>
              </div>
              <p className="text-xs text-gray-400 mt-2">Rp 4.500.000 remaining</p>
            </div>
          </div>

          {/* Card 3: Top Spending Category */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <div className="flex justify-between items-start">
              <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
                <AlertCircle size={20} />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-gray-500 text-sm font-medium">Kategori Terboros</p>
              <div className="flex items-end gap-2 mt-1">
                <h3 className="text-xl font-bold text-gray-900">Makanan & Minuman</h3>
              </div>
              <p className="text-xs text-rose-500 mt-1 font-medium">40% dari total pengeluaran</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. MAIN LIST CONTENT */}
      <main className="flex-1 overflow-hidden px-8 pb-8">
        <div className="h-fit bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col">
          
          {/* Table Header */}
          <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/30">
            <div>
              <h3 className="font-bold text-gray-900 text-lg">
                Transaksi Keluar
              </h3>
              <p className="text-sm text-gray-500">
                Oktober 2025
              </p>
            </div>
            <button className="flex items-center gap-2 text-sm font-medium text-gray-600 bg-white hover:bg-gray-50 px-4 py-2 rounded-lg border border-gray-200 transition shadow-sm">
              <Filter size={16} /> Filter Kategori
            </button>
          </div>

          {/* SCROLLABLE LIST */}
          <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
            
            {/* ITEM 1: MAKANAN (GOFOOD) */}
            <div
              onClick={() => setShowDetail(true)}
              className="group flex items-center justify-between p-5 hover:bg-rose-50/30 cursor-pointer transition"
            >
              <div className="flex items-center gap-4 w-1/3">
                <div className="p-3 bg-rose-100 text-rose-600 rounded-xl group-hover:bg-rose-200 transition">
                  <Coffee size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-base group-hover:text-rose-700 transition">
                    Kopi Kenangan & Toast
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">
                    GoFood Delivery
                  </p>
                </div>
              </div>

              <div className="w-1/4">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                  Jajan
                </span>
              </div>

              <div className="w-1/4">
                <div className="flex items-center gap-2">
                  <div className="p-1 bg-gray-100 rounded-full">
                    <span className="text-[10px] font-bold text-gray-600 px-1">GOPAY</span>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-1">Hari ini, 14:00</p>
              </div>

              <div className="w-1/6 text-right">
                <p className="font-bold text-gray-900 text-lg">
                  - Rp 45.000
                </p>
                <div className="opacity-0 group-hover:opacity-100 transition text-xs text-rose-500 font-medium mt-1">
                  View Detail &rarr;
                </div>
              </div>
            </div>

            {/* ITEM 2: BELANJA (ECOMMERCE) */}
            <div className="group flex items-center justify-between p-5 hover:bg-rose-50/30 cursor-pointer transition">
              <div className="flex items-center gap-4 w-1/3">
                <div className="p-3 bg-purple-50 text-purple-600 rounded-xl group-hover:bg-purple-100 transition">
                  <ShoppingBag size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-base group-hover:text-purple-700 transition">
                    Tokopedia - Gadget
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">
                    Mouse Logitech MX Master
                  </p>
                </div>
              </div>

              <div className="w-1/4">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">
                  Gadget
                </span>
              </div>

              <div className="w-1/4">
                <div className="flex items-center gap-2">
                  <div className="p-1 bg-gray-100 rounded-full">
                    <span className="text-[10px] font-bold text-gray-600 px-1">BCA</span>
                  </div>
                  <p className="text-sm text-gray-600">Virtual Acc</p>
                </div>
                <p className="text-xs text-gray-400 mt-1">Kemarin, 20:15</p>
              </div>

              <div className="w-1/6 text-right">
                <p className="font-bold text-gray-900 text-lg">
                  - Rp 1.250.000
                </p>
              </div>
            </div>

             {/* ITEM 3: UTILITIES (TAGIHAN) */}
             <div className="group flex items-center justify-between p-5 hover:bg-rose-50/30 cursor-pointer transition">
              <div className="flex items-center gap-4 w-1/3">
                <div className="p-3 bg-yellow-50 text-yellow-600 rounded-xl group-hover:bg-yellow-100 transition">
                  <Zap size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-base group-hover:text-yellow-700 transition">
                    Token Listrik PLN
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">
                    Rumah - Bulanan
                  </p>
                </div>
              </div>

              <div className="w-1/4">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-yellow-50 text-yellow-700 border border-yellow-200">
                  Utilities
                </span>
              </div>

              <div className="w-1/4">
                <div className="flex items-center gap-2">
                   <div className="p-1 bg-gray-100 rounded-full">
                    <span className="text-[10px] font-bold text-gray-600 px-1">OVO</span>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-1">1 Okt, 08:00 AM</p>
              </div>

              <div className="w-1/6 text-right">
                <p className="font-bold text-gray-900 text-lg">
                  - Rp 500.000
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-100 bg-gray-50 rounded-b-2xl flex justify-center">
            <button className="text-sm text-gray-500 font-medium hover:text-rose-600 transition">
              Lihat riwayat lengkap...
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}