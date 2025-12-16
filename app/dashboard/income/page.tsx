"use client";

import { useState } from "react";
import IncomeList from "@/components/income/incomeList";
import {
  Wallet,
  TrendingUp,
  Building2,
} from "lucide-react";

export default function IncomePage() {
  const [activeTab, setActive] = useState("daily");

  const tabs = ["daily", "weekly", "monthly", "yearly"];

  return (
    <div className="flex flex-col bg-[#f8f9fc]">
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
      </div>

      {/* 2. CONTENT BASED ON TAB */}
      <div className="flex-1">
        {activeTab === "daily" && <IncomeList />}
        {activeTab === "weekly" && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <TrendingUp className="mx-auto text-gray-400" size={48} />
              <h3 className="text-lg font-semibold text-gray-600 mt-4">Weekly View</h3>
              <p className="text-gray-500">Coming soon...</p>
            </div>
          </div>
        )}
        {activeTab === "monthly" && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <Building2 className="mx-auto text-gray-400" size={48} />
              <h3 className="text-lg font-semibold text-gray-600 mt-4">Monthly View</h3>
              <p className="text-gray-500">Coming soon...</p>
            </div>
          </div>
        )}
        {activeTab === "yearly" && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <Wallet className="mx-auto text-gray-400" size={48} />
              <h3 className="text-lg font-semibold text-gray-600 mt-4">Yearly View</h3>
              <p className="text-gray-500">Coming soon...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}