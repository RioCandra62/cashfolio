"use client";

import { useEffect, useState } from "react";
import {
  Wallet,
  TrendingUp,
  PiggyBank,
  AlertCircle,
  MoreHorizontal,
  ShoppingBag,
  Car,
  Coffee,
  Plus,
  PieChart as PieChartIcon,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import AddBudget from "@/components/budget/addBudget";

import { colorFromString } from "@/lib/color";

import {
  expanseWithoutSaving,
  fetchTotalBudget,
  getBudgetLimitByID,
  getUserBudget,
} from "@/lib/budget";

import { generatePastelColors } from "@/lib/color";

import { PieChart, Pie } from "recharts";
import DonutChart from "@/components/budget/pieChart";
import { fetchTotalExpense } from "@/lib/Expanse";
import { fetchTotalIncome } from "@/lib/Income";
import { get } from "https";
import { getTotalSaving } from "@/lib/saving";

export default function BudgetPlannerPage() {
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
  const [showAddModal, setShowAddModal] = useState(false);

  const [category, setCategory] = useState<any[]>([]);

  const [limbudget, setLimitBudget] = useState<any[]>([]);

  const [totalExpanse, setTotalExpanse] = useState(0);

  const [budget, setUserBudget] = useState<any[]>([]);

  const [income, setIncome] = useState(0);

  const [totalSaving, setTotalSaving] = useState(0);

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

    async function getCategory() {
      const cat = await getUserBudget();
      setCategory(cat);
    }

    async function getbudlimit() {
      const res = await getBudgetLimitByID();
      setLimitBudget(res);
    }

    async function getTotalExpanse() {
      const res = await expanseWithoutSaving();
      setTotalExpanse(res);
    }

    async function getIncome() {
      const res = await fetchTotalIncome();
      setIncome(res);
    }

    async function totalSaving() {
      const res = await getTotalSaving();
      setTotalSaving(res);
    }

    totalSaving();
    getIncome();
    getTotalExpanse();
    getbudlimit();
    getCategory();
    load();
  }, []);

  const dataPie = [
    { name: "Group A", value: 400, fill: "#0088FE" },
    { name: "Group B", value: 300, fill: "#00C49F" },
    { name: "Group C", value: 300, fill: "#FFBB28" },
    { name: "Group D", value: 200, fill: "#FF8042" },
  ];

  
  const safeBalance = income - totalBudget - totalExpanse - totalSaving;
  const globalPercentage = (totalBudget / safeBalance) * 100;
  
  const colors = generatePastelColors(category.length);

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
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between relative group">
          <div className="flex justify-between items-start z-10">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <Wallet size={20} />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="z-10">
              <p className="text-slate-500 text-sm font-medium">
                Total Anggaran
              </p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">
                {formatRupiah(totalBudget)}
              </h3>
            </div>
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
                {formatRupiah(safeBalance)}
              </span>
            </div>
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-orange-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${globalPercentage}%` }}
              ></div>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              {globalPercentage.toFixed(2)}% digunakan
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
          <div className="">
            <p className="text-emerald-100 text-sm font-medium">
              Available Budget
            </p>
            <h3 className="text-2xl font-bold mt-1">
              {formatRupiah(safeBalance)}
            </h3>
          </div>
        </div>
      </div>

      {/* 2. MIDDLE SECTION (CHART & ANALYTICS) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-auto lg:h-96">
        {/* Main Chart Area (Ganti "Line Chart") */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-bold text-gray-800 mb-6">Budget Limits</h2>
          {/* Budget Item 1 */}
          {limbudget.map((cat, index) => {
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
                  Sisa {formatRupiah(cat.remaining)} dari{" "}
                  {formatRupiah(cat.budget)}
                </p>
              </div>
            );
          })}
        </div>

        {/* Sidebar / Pie Area (Ganti "Pie Chart") */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex justify-center items-center">
          <div className="w-72 h-72">
            <DonutChart data={category} colors={colors} />
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
          {limbudget.map((bd, index) => {
            const color = colors[index];
            return (
              <div
                key={bd.id}
                className="w-full bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 border-b-5"
                style={{ borderBottomColor: color }}
              >
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
            );
          })}
        </div>
      </div>
      <AddBudget isOpen={showAddModal} onClose={() => setShowAddModal(false)} />
    </div>
  );
}
