"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function BudgetPlannerPage() {
  const [period, setPeriod] = useState("weekly");
  const [startDate, setStartDate] = useState("");
  const [budget, setBudget] = useState("");
  const [generatedData, setGeneratedData] = useState<any[]>([]);

  const formatNum = (n: number) =>
    new Intl.NumberFormat("id-ID").format(n);

  // Days & Weeks
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const weeks = ["Week 1", "Week 2", "Week 3", "Week 4"];

  const generate = () => {
    if (!budget) return;

    const total = Number(budget);

    let labels = period === "weekly" ? days : weeks;
    let equalShare = Math.floor(total / labels.length);

    let data = labels.map((label) => {
      const planned = equalShare;
      const actual = Math.floor(Math.random() * planned); // contoh dummy actual

      return {
        name: label,
        planned,
        actual,
        remaining: planned - actual,
      };
    });

    setGeneratedData(data);
  };

  // Grand totals
  const grandPlanned = generatedData.reduce((a, b) => a + b.planned, 0);
  const grandActual = generatedData.reduce((a, b) => a + b.actual, 0);
  const grandRemaining = grandPlanned - grandActual;

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-[#0D1B52]">💰 Budget Planner</h1>

      {/* INPUT CARD */}
      <div className="bg-white p-6 rounded-xl shadow-md border">
        <h2 className="text-xl font-semibold mb-4">Plan your budget easily</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Period */}
          <div>
            <label className="text-sm font-medium">Period</label>
            <select
              className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-[#0D1B52]"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
            >
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          {/* Start Date */}
          <div>
            <label className="text-sm font-medium">Start Date</label>
            <input
              type="date"
              className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-[#0D1B52]"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          {/* Budget */}
          <div>
            <label className="text-sm font-medium">Total Budget</label>
            <input
              type="number"
              placeholder="ex: 2000000"
              className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-[#0D1B52]"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            />
          </div>
        </div>

        <button
          onClick={generate}
          className="mt-6 bg-[#0D1B52] text-white px-6 py-3 rounded-lg hover:bg-[#15256d] transition"
        >
          Generate Plan
        </button>
      </div>

      {/* CHART */}
      {generatedData.length > 0 && (
        <div className="mt-10 bg-white p-6 shadow-md rounded-xl border">
          <h2 className="text-xl font-semibold mb-4">Budget Overview</h2>

          <LineChart
            width={900}
            height={350}
            data={generatedData}
            style={{ width: "100%" }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis width={80} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="planned" stroke="#0D1B52" />
            <Line type="monotone" dataKey="actual" stroke="#82ca9d" />
            <Line type="monotone" dataKey="remaining" stroke="#d63384" />
          </LineChart>
        </div>
      )}

      {/* TABLE */}
      {generatedData.length > 0 && (
        <table className="table-auto w-full border-collapse bg-white shadow-md rounded-xl mt-10">
          <thead>
            <tr className="bg-[#0D1B52] text-white">
              <th className="py-3 px-2">No</th>
              <th className="py-3 px-2">Day / Week</th>
              <th className="py-3 px-2">Planned</th>
              <th className="py-3 px-2">Actual</th>
              <th className="py-3 px-2">Remaining</th>
            </tr>
          </thead>

          <tbody>
            {generatedData.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="py-3 px-2">{index + 1}</td>
                <td className="py-3 px-2">{item.name}</td>
                <td className="py-3 px-2">IDR {formatNum(item.planned)}</td>
                <td className="py-3 px-2">IDR {formatNum(item.actual)}</td>
                <td className="py-3 px-2">IDR {formatNum(item.remaining)}</td>
              </tr>
            ))}

            {/* GRAND TOTAL */}
            <tr className="bg-gray-100 font-semibold">
              <td colSpan={2} className="py-3 px-2">Grand Total</td>
              <td className="py-3 px-2 text-blue-700">IDR {formatNum(grandPlanned)}</td>
              <td className="py-3 px-2 text-green-700">IDR {formatNum(grandActual)}</td>
              <td className="py-3 px-2 text-purple-700">
                IDR {formatNum(grandRemaining)}
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}
