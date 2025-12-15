"use client";

import { useState, useEffect } from "react";
import Link from "next/link"; // Untuk navigasi ke page budget jika kosong
import {
  Filter,
  ShoppingBag,
  Coffee,
  TrendingDown,
  CreditCard,
  PieChart,
  AlertCircle,
  PlusCircle,
  Layers,
  Loader2,
} from "lucide-react";

// Components
import AddExpanse from "./addExpanse";
import InvoiceModal from "@/components/expanse/invoiceDetail"; // Jika dipakai nanti

// Libs
import {
  getUserExpenses,
  fetchTotalExpense,
  getMostExpensiveCategory,
} from "@/lib/Expanse";

import { getCatNumber, getTotalBudget } from "@/lib/budget";

export default function ExpensePage() {
  // --- STATE MANAGEMENT ---
  const [showDetail, setShowDetail] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  // Data States
  const [total, setTotal] = useState(0);
  const [data, setData] = useState<any[]>([]);

  // UI Logic States
  const [loading, setLoading] = useState(true);
  const [hasCategories, setHasCategories] = useState(false);

  // --- FETCH DATA ---

  const [checkExpanse, setCheckExpanse] = useState(0);
  const [checkCategory, setCheckCategory] = useState(0);
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalExpanse, setTotalExpanse] = useState(0);
  const [mostCat, setMostCat] = useState<any>(null);


  useEffect(() => {
    async function checkExpanse() {
      const check = await fetchTotalExpense();
      setCheckExpanse(check);
    }
    checkExpanse();

    async function checkCategory() {
      const check = await getCatNumber();
      setCheckCategory(check);
    }
    checkCategory();

    async function getExpanse() {
      const data = await getUserExpenses();
      setData(data);
    }
    getExpanse();

    async function getTotal() {
      const total = await fetchTotalExpense();
      setTotal(total);
    }
    getTotal();

    async function getBudgetTotal() {
      const total = await getTotalBudget();
      setTotalBudget(total);
    }
    getBudgetTotal();

    async function getTotalExpanse() {
      const total = await fetchTotalExpense();
      setTotalExpanse(total);
    }
    getTotalExpanse();

    async function getMostCat() {
      const most = await getMostExpensiveCategory();
      setMostCat(most);
    }
    getMostCat();
  }, []);

  const remaining = totalBudget - totalExpanse;
  const percent = Math.round((totalExpanse / totalBudget) * 100);

  // --- SUB-COMPONENTS (Empty States) ---

  // Tampilan jika Kategori ADA tapi Transaksi KOSONG
  // const EmptyStateExpenses = () => (
  //   <div className="flex flex-col items-center justify-center h-64 text-center p-6 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
  //     <div className="bg-white p-4 rounded-full shadow-sm mb-4">
  //       <ShoppingBag size={32} className="text-gray-400" />
  //     </div>
  //     <h3 className="text-lg font-bold text-gray-900">Belum ada pengeluaran</h3>
  //     <p className="text-gray-500 text-sm max-w-xs mb-6">
  //       Catat pengeluaran pertamamu untuk mulai memantau arus kas.
  //     </p>
  //     <button
  //       onClick={() => setShowAddModal(true)}
  //       className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium shadow-lg shadow-blue-600/20 transition flex items-center gap-2"
  //     >
  //       <PlusCircle size={18} /> Tambah Pengeluaran
  //     </button>
  //   </div>
  // );

  // Tampilan jika Kategori TIDAK ADA (0)
  // const EmptyStateNoCategory = () => (
  //   <div className="flex flex-col items-center justify-center h-64 text-center p-6 border border-rose-100 rounded-2xl bg-rose-50/30">
  //     <div className="bg-white p-4 rounded-full shadow-sm mb-4">
  //       <Layers size={32} className="text-rose-400" />
  //     </div>
  //     <h3 className="text-lg font-bold text-gray-900">Budget Kosong</h3>
  //     <p className="text-gray-500 text-sm max-w-sm mb-6">
  //       Kamu belum memiliki kategori budget. Silakan buat budget terlebih dahulu
  //       sebelum mencatat pengeluaran.
  //     </p>
  //     <Link
  //       href="/budget"
  //       className="text-blue-600 font-semibold text-sm hover:underline flex items-center gap-1"
  //     >
  //       Pergi ke Halaman Budget &rarr;
  //     </Link>
  //   </div>
  // );

  return (
    <>
      <div className="flex flex-col bg-[#f8f9fc]">
        {checkCategory <= 0 ? (
          <p>Budget category tidak ditemukan</p>
        ) : checkExpanse <= 0 ? (
          <div className="flex flex-col m-auto items-center gap-4set">
            <p className="text-xl font-semibold">
              Data Expanse Tidak Ditemukan
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium shadow-lg shadow-blue-600/20 transition flex items-center gap-2 w-fit"
            >
              + Add Expanse
            </button>
          </div>
        ) : (
          <div className="flex flex-col bg-[#f8f9fc]">
            {/* 1. HEADER & TABS */}
            <div className="px-8 pt-4 pb-4">
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
                    <p className="text-rose-100 text-sm font-medium">
                      Total Pengeluaran
                    </p>
                    <h3 className="text-3xl font-bold mt-1">
                      IDR {total.toLocaleString("id-ID")}
                    </h3>
                  </div>
                </div>

                {/* Card 2: Sisa Budget (Budget Control) */}
                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                  <div className="flex justify-between items-start">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                      <PieChart size={20} />
                    </div>
                    <span className="text-xs font-medium text-gray-400">
                      Monthly Limit
                    </span>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between items-end mb-2">
                      <p className="text-gray-500 text-sm font-medium">
                        Sisa Budget
                      </p>
                      <span className="text-sm font-bold text-gray-900">
                        {percent}%
                      </span>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full bg-gray-100 rounded-full h-2.5">
                      <div
                        className={`${
                          percent >= 85
                            ? "bg-red-500"
                            : percent >= 70
                            ? "bg-amber-400"
                            : "bg-blue-500"
                        }  h-2.5 rounded-full`}
                        style={{ width: `${percent}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                      Rp {remaining.toLocaleString("id-ID")} remaining
                    </p>
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
                    <p className="text-gray-500 text-sm font-medium">
                      Kategori Terboros
                    </p>
                    <div className="flex items-end gap-2 mt-1">
                      <h3 className="text-xl font-bold text-gray-900">
                        {mostCat?.name}
                      </h3>
                    </div>
                    <p className="text-xs text-rose-500 mt-1 font-medium">
                      {Math.round(mostCat?.percent)} % dari total pengeluaran
                    </p>
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
                    <p className="text-sm text-gray-500">Oktober 2025</p>
                  </div>
                  <div className="flex flex-row gap-3">
                    <button className="flex items-center gap-2 text-sm font-medium text-gray-600 bg-white hover:bg-gray-50 px-4 py-2 rounded-lg border border-gray-200 transition shadow-sm">
                      <Filter size={16} /> Filter Kategori
                    </button>
                    <button
                      onClick={() => setShowAddModal(true)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium shadow-lg shadow-blue-600/20 transition flex items-center gap-2"
                    >
                      + Add Expense
                    </button>
                  </div>
                </div>

                {/* SCROLLABLE LIST */}
                <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
                  {data.map((tx) => (
                    <div
                      key={tx.id}
                      className="group flex items-center justify-between p-5 hover:bg-rose-50/30 cursor-pointer transition"
                    >
                      {/* KIRI: ICON + NAMA ITEM */}
                      <div className="flex items-center gap-4 w-1/3">
                        <div className="p-3 bg-rose-100 text-rose-600 rounded-xl group-hover:bg-rose-200 transition">
                          {/* <Coffee size={24} /> */}
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 text-base group-hover:text-rose-700 transition">
                            {tx.title}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">
                            {tx.type}
                          </p>
                        </div>
                      </div>

                      {/* KATEGORI */}
                      <div className="w-1/4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                          {tx.category_name}
                        </span>
                      </div>

                      {/* PAYMENT + TANGGAL */}
                      <div className="w-1/4">
                        <div className="flex items-center gap-2">
                          <div className="p-1 bg-gray-100 rounded-full">
                            <span className="text-[10px] font-bold text-gray-600 px-1">
                              {tx.payment}
                            </span>
                          </div>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">
                          {" "}
                          {tx.created_at.toLocaleDateString("id-ID", {
                            weekday: "long",
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      </div>

                      {/* AMOUNT */}
                      <div className="w-1/6 text-right">
                        <p className="font-bold text-lg text-red-500">
                          - Rp {Number(tx.amount).toLocaleString("id-ID")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                {/* <div className="p-4 border-t border-gray-100 bg-gray-50 rounded-b-2xl flex justify-center">
            <button className="text-sm text-gray-500 font-medium hover:text-rose-600 transition">
              Lihat riwayat lengkap...
            </button>
          </div> */}
              </div>
            </main>

            <AddExpanse
              isOpen={showAddModal}
              onClose={() => setShowAddModal(false)}
            />
          </div>
        )}
      </div>

      <AddExpanse
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
      />
    </>
  );
}
