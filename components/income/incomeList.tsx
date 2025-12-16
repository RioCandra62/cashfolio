"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Briefcase,
  TrendingUp,
  Building2,
  ArrowUpRight,
  PlusCircle,
  Loader2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

// Components
import AddIncome from "./addIncome";

// Libs
import {
  getUserIncomes,
  fetchTotalIncome,
  numberOfIncomes,
  getMostProfitableSource,
} from "@/lib/Income";

interface IncomeData {
  id: number;
  title: string;
  amount: number;
  payment: string;
  transaction_date: string;
  created_at: string;
  category: string;
}

interface MostSourceData {
  source: string;
  total_amount: number;
  transaction_count: number;
}

export default function IncomeList() {
  // --- STATE MANAGEMENT ---
  const [showAddModal, setShowAddModal] = useState(false);

  // Data States
  const [total, setTotal] = useState(0);
  const [data, setData] = useState<IncomeData[]>([]);

  // UI Logic States
  const [loading, setLoading] = useState(true);
  const [checkIncome, setCheckIncome] = useState(0);
  const [mostSource, setMostSource] = useState<MostSourceData | null>(null);
  const [showAll, setShowAll] = useState(false);

  // --- FETCH DATA ---
  const fetchIncomeData = useCallback(async () => {
    try {
      const [check, incomeData, totalIncome, most] = await Promise.all([
        numberOfIncomes(),
        getUserIncomes(),
        fetchTotalIncome(),
        getMostProfitableSource()
      ]);

      setCheckIncome(check);
      setData(incomeData);
      setTotal(totalIncome);
      setMostSource(most);
    } catch (error) {
      console.error("Error fetching income data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Initial fetch
    fetchIncomeData();

    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      fetchIncomeData();
    }, 30000); // 30 seconds

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [fetchIncomeData]);

  // Helper formatting
  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(num);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col h-screen bg-[#f8f9fc] items-center justify-center">
        <Loader2 className="animate-spin text-emerald-600" size={48} />
        <p className="mt-4 text-gray-600">Loading income data...</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col">
        {/* 1. HEADER & SUMMARY CARDS */}
        <div className="px-8 pt-6 pb-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Total Income Card */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Income</p>
                  <p className="text-2xl font-bold text-emerald-600">
                    {formatRupiah(total)}
                  </p>
                </div>
                <TrendingUp className="text-emerald-500" size={24} />
              </div>
            </div>

            {/* Number of Transactions */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Income Entries</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {checkIncome}
                  </p>
                </div>
                <Briefcase className="text-blue-500" size={24} />
              </div>
            </div>

            {/* Most Profitable Source */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Top Source</p>
                  <p className="text-lg font-bold text-purple-600 truncate">
                    {mostSource?.source || "N/A"}
                  </p>
                </div>
                <Building2 className="text-purple-500" size={24} />
              </div>
            </div>
          </div>

          {/* Add Income Button */}
          <div className="flex justify-end">
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl shadow-lg shadow-emerald-600/20 transition flex items-center gap-2"
            >
              <PlusCircle size={20} />
              Add Income
            </button>
          </div>
        </div>

        {/* 2. INCOME LIST */}
        <div className="flex-1 px-8 pb-8">
          {checkIncome <= 0 ? (
            <div className="flex flex-col m-auto items-center gap-4">
              <Briefcase className="text-gray-400" size={64} />
              <p className="text-xl font-semibold text-gray-700">
                No Income Records
              </p>
              <p className="text-gray-500 text-center max-w-md">
                Start tracking your income sources to better manage your finances.
              </p>
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium shadow-lg shadow-emerald-600/20 transition flex items-center gap-2 w-fit"
              >
                <PlusCircle size={16} />
                Add Your First Income
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {(showAll ? data : data.slice(0, 5)).map((income) => (
                <div
                  key={income.id}
                  className="group flex items-center justify-between p-5 bg-white rounded-xl shadow-sm border border-gray-100 hover:bg-gray-50 cursor-pointer transition"
                >
                  {/* Left Section: Icon and Title */}
                  <div className="flex items-center gap-4 w-1/3">
                    <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl group-hover:bg-emerald-100 transition">
                      <ArrowUpRight size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm group-hover:text-emerald-600 transition">
                        {income.title}
                      </h4>
                      <p className="text-xs text-gray-500 mt-0.5">Income Record</p>
                    </div>
                  </div>

                  {/* Middle Section: Category */}
                  <div className="w-1/4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                      {income.category}
                    </span>
                  </div>

                  {/* Right Section: Payment Method and Date */}
                  <div className="w-1/4">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      <p className="text-sm text-gray-600">{income.payment}</p>
                    </div>
                    <p className="text-xs text-gray-400 ml-4">{formatDate(income.transaction_date)}</p>
                  </div>

                  {/* Amount */}
                  <div className="w-1/6 text-right">
                    <p className="font-bold text-emerald-600">+{formatRupiah(income.amount)}</p>
                  </div>
                </div>
              ))}
              
              {/* Show More Button */}
              {data.length > 5 && (
                <div className="flex justify-center pt-4">
                  <button
                    onClick={() => setShowAll(!showAll)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2.5 rounded-lg text-sm font-medium transition flex items-center gap-2"
                  >
                    {showAll ? (
                      <>
                        <ChevronUp size={16} />
                        Tampilkan Lebih Sedikit
                      </>
                    ) : (
                      <>
                        <ChevronDown size={16} />
                        Lihat Semua
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <AddIncome 
        isOpen={showAddModal} 
        onClose={() => setShowAddModal(false)}
        onSuccess={fetchIncomeData}
      />
    </>
  );
}