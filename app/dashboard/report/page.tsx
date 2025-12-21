// "use client";

// import React from "react";
// import { Bar, Doughnut } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   ArcElement,
//   Tooltip,
//   Legend,
//   ChartOptions,
// } from "chart.js";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   ArcElement,
//   Tooltip,
//   Legend
// );

// // =====================================================
// // HELPER COMPONENTS & CONFIG
// // =====================================================

// function SectionTitle({ title }: { title: string }) {
//   return (
//     <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-6 border-b pb-2">
//       {title}
//     </h2>
//   );
// }

// // Opsi Chart agar lebih bersih (Clean Minimalist)
// const commonOptions: ChartOptions<any> = {
//   responsive: true,
//   maintainAspectRatio: false,
//   plugins: {
//     legend: { display: false },
//     tooltip: {
//       backgroundColor: "#1f2937",
//       padding: 12,
//       cornerRadius: 4,
//     },
//   },
//   scales: {
//     x: {
//       grid: { display: false },
//       ticks: { font: { size: 11 } },
//     },
//     y: {
//       display: false, // Sembunyikan sumbu Y agar lebih bersih
//       grid: { display: false },
//     },
//   },
//   elements: {
//     bar: { borderRadius: 4 },
//   },
// };

// export default function FinanceReportEditorial() {
//   const income2027 = 50_000_000;
//   const income2028 = 63_345_678;

//   const chartDataBar = {
//     labels: ["2027", "2028"],
//     datasets: [
//       {
//         label: "Income",
//         data: [income2027, income2028],
//         backgroundColor: ["#e5e7eb", "#059669"], // Gray for past, Green for focus
//         barThickness: 40,
//       },
//     ],
//   };

//   const chartDataDoughnut = {
//     labels: ["Saved", "Spent"],
//     datasets: [
//       {
//         data: [72, 28],
//         backgroundColor: ["#059669", "#e5e7eb"],
//         borderWidth: 0,
//       },
//     ],
//   };

//   return (
//     <div className="flex justify-center flex-col items-start min-h-screen gap-4 mx-auto bg-gray-200 py-10 font-sans">
//       {/* A4 Container
//         Width 210mm is standard A4.
//         Aspect ratio handles height automatically or use min-h for content
//       */}
//       <main
//         className="bg-white text-gray-900 shadow-2xl box-border relative overflow-hidden mx-auto"
//         style={{ width: "210mm", minHeight: "297mm", padding: "15mm" }} // Padding menggunakan mm agar presisi cetak
//       >
//         {/* DECORATIVE TOP BAR */}
//         <div className="absolute top-0 left-0 w-full h-2 bg-gray-900" />

//         {/* HEADER */}
//         <header className="mb-14 flex justify-between items-end">
//           <div>
//             <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase mb-2">
//               Annual Report • Personal Finance
//             </p>
//             <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
//               2026 Projection
//             </h1>
//           </div>
//           <div className="text-right">
//             <p className="text-xs text-gray-400">Prepared for</p>
//             <p className="font-semibold">Client Name</p>
//           </div>
//         </header>

//         {/* SECTION 1: EXECUTIVE SUMMARY & BAR CHART */}
//         <section className="mb-16">
//           <div className="grid grid-cols-12 gap-8">
//             {/* Left: Text Content (5 cols) */}
//             <div className="col-span-5 flex flex-col justify-between">
//               <div>
//                 <SectionTitle title="Executive Summary" />
//                 <p className="text-sm leading-7 text-gray-600 mb-6 text-justify">
//                   Analysis indicates a positive trajectory for the upcoming
//                   fiscal year. Driven by strategic budget allocation, the
//                   projected income shows a robust increase compared to the
//                   previous period.
//                 </p>
//               </div>

//               <div className="bg-green-50 p-4 rounded-lg border border-green-100">
//                 <p className="text-xs text-green-800 font-medium mb-1 uppercase tracking-wide">
//                   Projected Income
//                 </p>
//                 <p className="text-2xl font-bold text-green-700 font-mono">
//                   Rp {income2028.toLocaleString("id-ID")}
//                 </p>
//               </div>
//             </div>

//             {/* Right: Bar Chart (7 cols) */}
//             <div className="col-span-7 flex flex-col justify-end">
//               <div className="h-64 w-full">
//                 {" "}
//                 {/* CONTAINER HEIGHT IS CRUCIAL FOR CHART.JS */}
//                 <Bar data={chartDataBar} options={commonOptions} />
//               </div>
//               <p className="text-center text-xs text-gray-400 mt-2">
//                 Year-over-Year Income Comparison
//               </p>
//             </div>
//           </div>
//         </section>

//         {/* SEPARATOR */}
//         <hr className="border-gray-200 mb-16" />

//         {/* SECTION 2: BREAKDOWN & RATIOS */}
//         <section className="grid grid-cols-2 gap-16">
//           {/* Table Area */}
//           <div>
//             <SectionTitle title="Income Breakdown" />
//             <div className="overflow-hidden">
//               <table className="w-full text-sm">
//                 <thead>
//                   <tr className="border-b-2 border-black">
//                     <th className="text-left py-3 font-bold">Fiscal Year</th>
//                     <th className="text-right py-3 font-bold">Net Amount</th>
//                     <th className="text-right py-3 font-bold">Growth</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-100">
//                   <tr>
//                     <td className="py-4 text-gray-600">2027 (Actual)</td>
//                     <td className="py-4 text-right font-mono text-gray-600">
//                       {income2027.toLocaleString("id-ID")}
//                     </td>
//                     <td className="py-4 text-right text-xs text-gray-400">-</td>
//                   </tr>
//                   <tr className="bg-gray-50">
//                     <td className="py-4 font-semibold text-gray-900 pl-2">
//                       2028 (Proj.)
//                     </td>
//                     <td className="py-4 text-right font-mono font-bold text-gray-900 pr-2">
//                       {income2028.toLocaleString("id-ID")}
//                     </td>
//                     <td className="py-4 text-right text-xs text-green-600 font-bold pr-2">
//                       +26%
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           {/* Doughnut Area */}
//           <div className="flex flex-col items-center justify-start">
//             <div className="w-full">
//               <SectionTitle title="Efficiency Ratio" />
//             </div>

//             <div className="relative w-48 h-48 mt-4">
//               {" "}
//               {/* Fixed Size for Doughnut */}
//               <Doughnut
//                 data={chartDataDoughnut}
//                 options={{
//                   ...commonOptions,
//                   cutout: "75%", // Thinner ring
//                   plugins: { legend: { display: false } },
//                   elements: { arc: { borderWidth: 0 } },
//                 }}
//               />
//               {/* Center Text Overlay */}
//               <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
//                 <span className="text-3xl font-bold text-gray-800">72%</span>
//                 <span className="text-[10px] uppercase tracking-wider text-gray-500">
//                   Saved
//                 </span>
//               </div>
//             </div>

//             <p className="text-xs text-center text-gray-500 mt-6 max-w-xs leading-relaxed">
//               Targeting a{" "}
//               <strong className="text-gray-900">72% saving rate</strong> allows
//               for accelerated asset accumulation within the first two quarters.
//             </p>
//           </div>
//         </section>

//         {/* FOOTER */}
//         <footer
//           className="absolute bottom-12 left-0 w-full px-[15mm] flex justify-between items-center text-[10px] text-gray-400 border-t pt-4 mx-auto"
//           style={{ width: "100%" }}
//         >
//           <span>CONFIDENTIAL REPORT</span>
//           <span>PAGE 01 / 01</span>
//         </footer>
//       </main>
//       <main
//         className="bg-white text-gray-900 shadow-2xl box-border relative overflow-hidden mx-auto"
//         style={{ width: "210mm", minHeight: "297mm", padding: "15mm" }} // Padding menggunakan mm agar presisi cetak
//       >
//         {/* DECORATIVE TOP BAR */}
//         <div className="absolute top-0 left-0 w-full h-2 bg-gray-900" />

//         {/* HEADER */}
//         <header className="mb-14 flex justify-between items-end">
//           <div>
//             <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase mb-2">
//               Annual Report • Personal Finance
//             </p>
//             <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
//               2026 Projection
//             </h1>
//           </div>
//           <div className="text-right">
//             <p className="text-xs text-gray-400">Prepared for</p>
//             <p className="font-semibold">Client Name</p>
//           </div>
//         </header>

//         {/* SECTION 1: EXECUTIVE SUMMARY & BAR CHART */}
//         <section className="mb-16">
//           <div className="grid grid-cols-12 gap-8">
//             {/* Left: Text Content (5 cols) */}
//             <div className="col-span-5 flex flex-col justify-between">
//               <div>
//                 <SectionTitle title="Executive Summary" />
//                 <p className="text-sm leading-7 text-gray-600 mb-6 text-justify">
//                   Analysis indicates a positive trajectory for the upcoming
//                   fiscal year. Driven by strategic budget allocation, the
//                   projected income shows a robust increase compared to the
//                   previous period.
//                 </p>
//               </div>

//               <div className="bg-green-50 p-4 rounded-lg border border-green-100">
//                 <p className="text-xs text-green-800 font-medium mb-1 uppercase tracking-wide">
//                   Projected Income
//                 </p>
//                 <p className="text-2xl font-bold text-green-700 font-mono">
//                   Rp {income2028.toLocaleString("id-ID")}
//                 </p>
//               </div>
//             </div>

//             {/* Right: Bar Chart (7 cols) */}
//             <div className="col-span-7 flex flex-col justify-end">
//               <div className="h-64 w-full">
//                 {" "}
//                 {/* CONTAINER HEIGHT IS CRUCIAL FOR CHART.JS */}
//                 <Bar data={chartDataBar} options={commonOptions} />
//               </div>
//               <p className="text-center text-xs text-gray-400 mt-2">
//                 Year-over-Year Income Comparison
//               </p>
//             </div>
//           </div>
//         </section>

//         {/* SEPARATOR */}
//         <hr className="border-gray-200 mb-16" />

//         {/* SECTION 2: BREAKDOWN & RATIOS */}
//         <section className="grid grid-cols-2 gap-16">
//           {/* Table Area */}
//           <div>
//             <SectionTitle title="Income Breakdown" />
//             <div className="overflow-hidden">
//               <table className="w-full text-sm">
//                 <thead>
//                   <tr className="border-b-2 border-black">
//                     <th className="text-left py-3 font-bold">Fiscal Year</th>
//                     <th className="text-right py-3 font-bold">Net Amount</th>
//                     <th className="text-right py-3 font-bold">Growth</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-100">
//                   <tr>
//                     <td className="py-4 text-gray-600">2027 (Actual)</td>
//                     <td className="py-4 text-right font-mono text-gray-600">
//                       {income2027.toLocaleString("id-ID")}
//                     </td>
//                     <td className="py-4 text-right text-xs text-gray-400">-</td>
//                   </tr>
//                   <tr className="bg-gray-50">
//                     <td className="py-4 font-semibold text-gray-900 pl-2">
//                       2028 (Proj.)
//                     </td>
//                     <td className="py-4 text-right font-mono font-bold text-gray-900 pr-2">
//                       {income2028.toLocaleString("id-ID")}
//                     </td>
//                     <td className="py-4 text-right text-xs text-green-600 font-bold pr-2">
//                       +26%
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           {/* Doughnut Area */}
//           <div className="flex flex-col items-center justify-start">
//             <div className="w-full">
//               <SectionTitle title="Efficiency Ratio" />
//             </div>

//             <div className="relative w-48 h-48 mt-4">
//               {" "}
//               {/* Fixed Size for Doughnut */}
//               <Doughnut
//                 data={chartDataDoughnut}
//                 options={{
//                   ...commonOptions,
//                   cutout: "75%", // Thinner ring
//                   plugins: { legend: { display: false } },
//                   elements: { arc: { borderWidth: 0 } },
//                 }}
//               />
//               {/* Center Text Overlay */}
//               <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
//                 <span className="text-3xl font-bold text-gray-800">72%</span>
//                 <span className="text-[10px] uppercase tracking-wider text-gray-500">
//                   Saved
//                 </span>
//               </div>
//             </div>

//             <p className="text-xs text-center text-gray-500 mt-6 max-w-xs leading-relaxed">
//               Targeting a{" "}
//               <strong className="text-gray-900">72% saving rate</strong> allows
//               for accelerated asset accumulation within the first two quarters.
//             </p>
//           </div>
//         </section>

//         {/* FOOTER */}
//         <footer
//           className="absolute bottom-12 left-0 w-full px-[15mm] flex justify-between items-center text-[10px] text-gray-400 border-t pt-4 mx-auto"
//           style={{ width: "100%" }}
//         >
//           <span>CONFIDENTIAL REPORT</span>
//           <span>PAGE 01 / 01</span>
//         </footer>
//       </main>
//     </div>
//   );
// }

"use client";

import React from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const income = 12000000;
const expense = 7800000;

const budgets = [
  { name: "Makan & Minum", amount: 2500000 },
  { name: "Transport", amount: 1200000 },
  { name: "Langganan", amount: 800000 },
  { name: "Hiburan", amount: 1500000 },
  { name: "Lain-lain", amount: 2000000 },
];

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
};

import { useEffect, useState } from "react";
import { fetchTotalExpense } from "@/lib/Expanse";
import { fetchTotalIncome } from "@/lib/Income";
import { getUserBudget } from "@/lib/budget";
import { get } from "http";
import { getTotalSaving } from "@/lib/saving";

export default function CashfolioReport() {
  const handlePrint = () => window.print();
  const [allExpanse, setAllExpanse] = useState(0);
  const [allIncome, setAllIncome] = useState(0);
  const [budget, setBudget] = useState<any[]>([]);
  const [allSaving, setAllSaving] = useState(0);

  useEffect(() => {
    async function allExpanse() {
      const res = await fetchTotalExpense();
      setAllExpanse(res);
    }

    async function allIncome() {
      const res = await fetchTotalIncome();
      setAllIncome(res);
    }

    async function getBudget() {
      const res = await getUserBudget();
      setBudget(res);
    }

    async function allSaving() {
      const res = await getTotalSaving();
      setAllSaving(res);
    }

    allSaving();
    getBudget();
    allIncome();
    allExpanse();
  }, []);

  const barData = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        data: [allIncome, allExpanse],
        borderRadius: 8,
        backgroundColor: [
          "rgba(34, 197, 94, 0.5)", // soft green (income)
          "rgba(239, 68, 68, 0.7)", // soft red (expense)
        ],
      },
    ],
  };

  const doughnutData = {
    labels: ["Expense", "Remaining"],
    datasets: [
      {
        data: [allExpanse, allIncome - allExpanse],
        borderWidth: 0,
        backgroundColor: [
          "rgba(239, 68, 68, 0.7)", // soft red (expense)
          "rgba(34, 197, 94, 0.5)", // soft green (income)
        ],
      },
    ],
  };

  const percentage = Math.round((allExpanse / allIncome) * 100);

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(num);
  };

  const expenseRatio = allExpanse / allIncome;
  const savingRatio = allSaving / allIncome;
  const remainingCash = allIncome - allExpanse - allSaving;

  let isBoros = false;
  let status ='';
  let desc = '';

  if (expenseRatio <= 0.4 && savingRatio >= 0.15){
    isBoros = false;
    status = 'Sangat Hemat';
    desc = 'Pengeluaran relatif rendah, namun tingkat tabungan masih rendah.';
  }

  if (expenseRatio > 0.75 && savingRatio < 0.15) {
    // Pengeluaran besar, nabung kecil
    isBoros = true;
    status = 'Normal';
    
  }

  if (remainingCash < 0) {
    // Nombok
    isBoros = true;
    status = 'Budget Deficit';
  }

  if (expenseRatio > 0.85) {
    // Red flag keras
    isBoros = true;
    status = 'Sangat Boros (High Expense Ratio)';
  }

  return (
    <div className="flex flex-col">
      {/* PRINT BUTTON */}
      <button
        onClick={handlePrint}
        className="px-4 py-2 rounded-full w-fit bg-gray-900 text-white text-sm hover:opacity-90 print:hidden"
      >
        Print Report
      </button>
      <main
        className="bg-white text-gray-900 mx-auto shadow-xl relative print-area"
        style={{ width: "210mm", minHeight: "297mm", padding: "16mm" }}
      >
        {/* HEADER */}
        <header className="mb-12">
          <p className="text-xs tracking-widest text-gray-400 uppercase">
            Cashfolio Report
          </p>
          <h1 className="text-4xl font-bold tracking-tight">
            Personal Finance Summary
          </h1>
          <p className="text-sm text-gray-500 mt-2">Monthly Overview</p>
        </header>

        {/* SECTION 1 */}
        <section className="grid grid-cols-12 gap-10 mb-14">
          <div className="col-span-5">
            <h2 className="text-lg font-semibold mb-3">Overview</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-6">
              Laporan ini menampilkan perbandingan income dan expense, serta
              evaluasi pola pengeluaran untuk menentukan apakah pengguna
              tergolong boros atau tidak.
            </p>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-green-50">
                <p className="text-xs text-gray-500">Total Income</p>
                <p className="text-xl font-bold text-green-700 font-mono">
                  Rp {allIncome.toLocaleString("id-ID")}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-rose-50">
                <p className="text-xs text-gray-500">Total Expense</p>
                <p className="text-xl font-bold text-rose-600 font-mono">
                  Rp {allExpanse.toLocaleString("id-ID")}
                </p>
              </div>
            </div>
          </div>

          <div className="col-span-7 h-64">
            <Bar data={barData} options={chartOptions} />
            <p className="text-xs text-center text-gray-400 mt-2">
              Income vs Expense
            </p>
          </div>
        </section>

        <hr className="mb-14" />

        {/* SECTION 2 */}
        <section className="grid grid-cols-2 gap-16">
          {/* BUDGET LIST */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Budget Breakdown</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Category</th>
                  <th className="text-right py-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                {budget.map((b, i) => (
                  <tr key={i} className="border-b last:border-0">
                    <td className="py-3 text-gray-600">{b.name}</td>
                    <td className="py-3 text-right font-mono">
                      {formatRupiah(b.budget)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ANALYSIS */}
          <div className="flex flex-col items-center">
            <h2 className="text-lg font-semibold mb-4 self-start">
              Spending Analysis
            </h2>

            <div className="relative w-44 h-44">
              <Doughnut data={doughnutData} options={chartOptions} />
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-2xl font-bold">{percentage}%</span>
                <span className="text-xs text-gray-500">Used</span>
              </div>
            </div>

            <p className="text-sm text-center text-gray-600 mt-6 max-w-xs">
              Pengguna tergolong{" "}
              <strong className={isBoros ? "text-rose-600" : "text-green-600"}>
                {status}
              </strong>{" "}
              {desc} dengan rincian <br /><strong>{percentage}%</strong>{" "}
              dari total income, <br />dan rasio tabungan sebesar <strong>{(savingRatio).toFixed(2)}%</strong>
            </p>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="absolute bottom-10 left-0 w-full px-[16mm] text-xs text-gray-400 flex justify-between">
          <span>Cashfolio • Confidential</span>
          <span>A4 Portrait</span>
        </footer>
      </main>
    </div>
  );
}
