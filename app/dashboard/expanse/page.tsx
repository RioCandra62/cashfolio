"use client";

import { useState, useEffect } from "react";
import WeeklyChart from "@/components/charts/weeklyExpanse";
import MonthlyExpanse from "@/components/charts/monthlyExpanse";
import TimelineView2 from "@/components/expanse/timelineView2";

export default function Tabs() {
  const [activeTab, setActive] = useState("daily");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const loadData = async () => {
  //     try {
  //       const res = await fetch("/api/expanse", {
  //         cache: "no-store",
  //       });
  //       const data = await res.json();
  //       setTransactions(data);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   loadData();
  // }, []);



  return (
    <div className="flex-1">
      <div className="flex flex-row justify-between px-8 items-center">
        <div className="flex justify-between items-end w-full">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Expense Tracking
            </h1>
            <p className="text-gray-500 mt-1">Pantau kemana perginya uangmu.</p>
          </div>
        </div>

        {/* Time Tabs */}
        <div className="flex flex-col">
          <h1 className="font-bold text-xl text-center">
            {activeTab === "daily" &&
              new Date().toLocaleDateString("id-ID", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            {activeTab === "weekly" && "Weekly"}
            {activeTab === "monthly" &&
              new Date().toLocaleDateString("id-ID", {
                month: "long",
                year: "numeric",
              })}
          </h1>

          <div className="flex w-full justify-end">
            <div className="flex items-center gap-2 mt-4 bg-gray-100 rounded-lg p-1 w-fit">
              {["daily", "weekly", "monthly"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActive(tab)}
                  className={`capitalize px-4 py-2 rounded-md transition ${
                    activeTab === tab
                      ? "bg-white shadow text-[#0D1B52]"
                      : "text-gray-500 hover:text-[#0D1B52]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        {activeTab === "daily" && (
          <TimelineView2/>
        )}
        {activeTab === "weekly" && <WeeklyChart />}
        {activeTab === "monthly" && <MonthlyExpanse />}
      </div>
    </div>
  );
}
