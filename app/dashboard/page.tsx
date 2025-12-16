"use client";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight,
  Target,
  Coffee,
  ShoppingBag,
  Car,
  Zap,
  Milestone,
} from "lucide-react";

import { useEffect, useState } from "react";
import {
  getLatestGoingSaving,
  getTotalExpanseThisMonth,
  getTotalIncomeThisMonth,
} from "@/lib/dashboard";
import { getUserSaving } from "@/lib/saving";
import { getBudgetLimitByID, getUserBudget } from "@/lib/budget";

import { colorFromString, generatePastelColors } from "@/lib/color";
import { getUserExpenses } from "@/lib/Expanse";

export default function Dashboard() {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [latestSaving, setLatestSaving] = useState<any[]>([]);
  const [category, setCategory] = useState<any[]>([]);
  const [limbudget, setLimitBudget] = useState<any[]>([]);
  const [highlightExpanse, setHighlightExpanse] = useState<any[]>([]);

  useEffect(() => {
    async function getTotalIncome() {
      const res = await getTotalIncomeThisMonth();
      setTotalIncome(res);
    }

    async function getTotalExpense() {
      const res = await getTotalExpanseThisMonth();
      setTotalExpense(res);
    }

    async function getLatetsSaving() {
      const res = await getLatestGoingSaving();
      setLatestSaving(res);
    }

    async function getCategory() {
      const cat = await getUserBudget();
      setCategory(cat);
    }

    async function getbudlimit() {
      const res = await getBudgetLimitByID();
      setLimitBudget(res);
    }

    async function getHighlightExpanse() {
      const res = await getUserExpenses();
      setHighlightExpanse(res);
    }
    getHighlightExpanse();
    getbudlimit();
    getCategory();
    getLatetsSaving();
    getTotalExpense();
    getTotalIncome();
  }, []);

  const globalPercentage = Math.floor((totalExpense / totalIncome) * 100);

  // Helper Format Rupiah
  const formatRp = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const currentMonth = new Date().toLocaleString("en-US", { month: "short" });

  const colors = generatePastelColors(category.length);

  return (
    <div className="flex-1 bg-[#F8F9FC] min-h-screen p-8">
      {/* 1. HEADER & QUICK ACTION */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Financial Overview
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Track your spending and stick to your budget.
          </p>
        </div>
      </div>

      {/* 2. TOP STATS CARDS (Financial Health) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Card 1: Total Balance / Sisa Uang */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition">
            <Wallet size={64} className="text-blue-600" />
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <Wallet size={20} />
            </div>
            <span className="text-sm font-medium text-gray-500">
              Safe to Spend
            </span>
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-1">
            {formatRp(totalIncome - totalExpense)}
          </p>
          <p className="text-sm text-green-600 flex items-center gap-1 font-medium">
            <span className="bg-green-100 px-1.5 py-0.5 rounded text-xs">
              +12%
            </span>{" "}
            vs last month
          </p>
        </div>

        {/* Card 2: Income vs Expense */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500">
              Cash Flow ({currentMonth})
            </h3>
            <MoreHorizontal size={16} className="text-gray-400" />
          </div>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-xs text-gray-400 mb-1 flex items-center gap-1">
                <ArrowDownRight size={14} className="text-green-500" /> Income
              </p>
              <p className="text-xl font-bold text-gray-900">
                {formatRp(totalIncome)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400 mb-1 flex items-center justify-end gap-1">
                <ArrowUpRight size={14} className="text-red-500" /> Expense
              </p>
              <p className="text-xl font-bold text-gray-900">
                {formatRp(totalExpense)}
              </p>
            </div>
          </div>
          {/* Visual Bar */}
          <div className="w-full h-2 bg-gray-100 rounded-full mt-4 overflow-hidden flex">
            <div
              className="h-full bg-green-500"
              style={{ width: `${100 - globalPercentage}%` }}
            ></div>
            <div
              className="h-full bg-red-500"
              style={{ width: `${globalPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Card 3: Savings Goal */}
        {latestSaving.map((sv) => (
          <a
            // ganti sesuai id kamu
            href="/dashboard/saving"
            className="bg-gradient-to-br from-[#0D1B52] to-[#0D1B52]/90 text-white p-6 rounded-xl shadow-lg shadow-gray-900/10"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-white/10 rounded-lg">
                <Target size={20} className="text-white" />
              </div>
              <span className="text-sm font-medium text-gray-300">
                Wishlist: {sv.title}
              </span>
            </div>

            <p className="text-2xl font-bold mb-2">
              {formatRp(sv.saved)}{" "}
              <span className="text-sm text-gray-400 font-normal">
                / {formatRp(sv.target)}
              </span>
            </p>

            <div className="w-full bg-gray-700 h-2 rounded-full mt-4">
              <div
                className="bg-blue-400 h-full rounded-full transition-all"
                style={{ width: `${(sv.saved / sv.target) * 100}%` }}
              />
            </div>

            <p className="text-xs text-gray-400 mt-2 text-right">
              {((sv.saved / sv.target) * 100).toFixed(2)}% Collected
            </p>
          </a>
        ))}
      </div>

      {/* 3. MAIN CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT COLUMN (2/3): RECENT TRANSACTIONS */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="font-bold text-gray-800">Recent Transactions</h2>
              <a
                href="/dashboard/expanse"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                View All
              </a>
            </div>

            <div className="divide-y divide-gray-50">
              {/* Item 1 */}

              {highlightExpanse.slice(0, 4).map((exp) => {
                const color = colorFromString(exp.category_name);
                return (
                  <div className="p-5 flex items-center justify-between hover:bg-gray-50 transition cursor-pointer group">
                    <div className="flex items-center gap-4">
                      <div
                        className="w-9 h-9 flex items-center justify-center rounded-full"
                        style={{
                          backgroundColor: color
                            .replace("hsl", "hsla")
                            .replace(")", ", 0.15)"),
                        }}
                      >
                        <Milestone size={16} style={{ color }} />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-sm group-hover:text-blue-600 transition">
                          {exp.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          {exp.category_name}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900 text-sm">
                        - {formatRp(exp.amount)}
                      </p>
                      <p className="text-xs text-gray-400">{exp.payment}</p>
                    </div>
                  </div>
                );
              })}
              {/* Item 4 */}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (1/3): BUDGET LIMITS */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex flex-row w-full justify-between items-center mb-6">
              <h2 className="font-bold text-gray-800">Budget Limits</h2>
              <a
                className="text-sm text-blue-500 font-semibold"
                href="/dashboard/budgetplan"
              >
                View All
              </a>
            </div>

            {limbudget.slice(0, 3).map((cat, index) => {
              const color = colors[index];

              return (
                <div className="mb-6" key={cat.id}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-gray-700 flex items-center gap-2">
                      {cat.name}
                    </span>

                    <span className="font-bold" style={{ color }}>
                      {Math.floor(cat.percentage)}%
                    </span>
                  </div>

                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className="h-2 rounded-full"
                      style={{
                        width: `${!cat.percentage ? "0" : cat.percentage}%`,
                        backgroundColor: color,
                      }}
                    ></div>
                  </div>

                  <p className="text-xs text-gray-400 mt-1">
                    Sisa {formatRp(cat.remaining)} dari {formatRp(cat.budget)}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Mini Banner / Tips */}
          <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
            <h3 className="text-blue-800 font-bold text-sm mb-1">
              💡 Smart Tip
            </h3>
            <p className="text-blue-600 text-xs leading-relaxed">
              Pengeluaran makananmu minggu ini naik 15%. Coba masak sendiri
              untuk menghemat budget!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
