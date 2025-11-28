"use client";

import WeeklyChart from "@/components/charts/weeklyExpanse";
import MonthlyExpanse from "@/components/charts/monthlyExpanse";
import { useState } from "react";

export default function Tabs() {
  const [activeTab, setActive] = useState("daily");

  const tabs = ["daily", "weekly", "monthly"];

  return (
    <div className="flex-1">
      <div className="flex flex-row justify-between">
        <h1 className="font-bold text-xl">Your Expanse Overview</h1>
        <h1 className="font-bold text-xl">
          {activeTab === "daily" && (
            <>
              {new Date().toLocaleDateString("id-ID", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </>
          )}
          {activeTab === "weekly" && (
            <>
              {(() => {
                const d = new Date();

                // Hitung nomor minggu dalam satu bulan
                const date = d.getDate();
                const dayOfWeek = d.getDay() === 0 ? 7 : d.getDay(); // ubah Minggu = 7
                const weekOfMonth = Math.ceil((date - dayOfWeek + 1) / 7);

                const monthName = d.toLocaleDateString("id-ID", {
                  month: "long",
                });
                const year = d.getFullYear();

                return `Week ${weekOfMonth} ${monthName} ${year}`;
              })()}
            </>
          )}
          {activeTab === "monthly" && (
            <>
              {new Date().toLocaleDateString("id-ID", {
                month: "long",
                year: "numeric",
              })}
            </>
          )}
        </h1>
      </div>
      <div className="flex items-center gap-2 mt-4 bg-gray-100 rounded-lg p-1 w-fit">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`
            capitalize px-4 py-2 rounded-md transition
            ${
              activeTab === tab
                ? "bg-white shadow text-[#0D1B52]"
                : "text-gray-500 hover:text-[#0D1B52]"
            }
          `}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="mt-4">
        {activeTab === "daily" && (
          <div className="h-[600px] bg-gray-100 rounded-xl flex items-center justify-center">
            Daily Chart
          </div>
        )}

        {activeTab === "weekly" && <WeeklyChart />}

        {activeTab === "monthly" && <MonthlyExpanse />}
      </div>
    </div>
  );
}
