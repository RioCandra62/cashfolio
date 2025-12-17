'use client';

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
  ChartOptions
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

// =====================================================
// HELPER COMPONENTS & CONFIG
// =====================================================

function SectionTitle({ title }: { title: string }) {
  return (
    <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-6 border-b pb-2">
      {title}
    </h2>
  );
}

// Opsi Chart agar lebih bersih (Clean Minimalist)
const commonOptions: ChartOptions<any> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#1f2937',
      padding: 12,
      cornerRadius: 4,
    }
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { font: { size: 11 } }
    },
    y: {
      display: false, // Sembunyikan sumbu Y agar lebih bersih
      grid: { display: false }
    }
  },
  elements: {
    bar: { borderRadius: 4 }
  }
};

export default function FinanceReportEditorial() {
  const income2027 = 50_000_000;
  const income2028 = 63_345_678;

  const chartDataBar = {
    labels: ["2027", "2028"],
    datasets: [
      {
        label: "Income",
        data: [income2027, income2028],
        backgroundColor: ["#e5e7eb", "#059669"], // Gray for past, Green for focus
        barThickness: 40,
      },
    ],
  };

  const chartDataDoughnut = {
    labels: ["Saved", "Spent"],
    datasets: [
      {
        data: [72, 28],
        backgroundColor: ["#059669", "#e5e7eb"],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-200 py-10 font-sans">
      {/* A4 Container 
        Width 210mm is standard A4. 
        Aspect ratio handles height automatically or use min-h for content 
      */}
      <main
        className="bg-white text-gray-900 shadow-2xl box-border relative overflow-hidden"
        style={{ width: '210mm', minHeight: '297mm', padding: '15mm' }} // Padding menggunakan mm agar presisi cetak
      >
        {/* DECORATIVE TOP BAR */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gray-900" />

        {/* HEADER */}
        <header className="mb-14 flex justify-between items-end">
          <div>
            <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase mb-2">
              Annual Report • Personal Finance
            </p>
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
              2026 Projection
            </h1>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400">Prepared for</p>
            <p className="font-semibold">Client Name</p>
          </div>
        </header>

        {/* SECTION 1: EXECUTIVE SUMMARY & BAR CHART */}
        <section className="mb-16">
          <div className="grid grid-cols-12 gap-8">
            {/* Left: Text Content (5 cols) */}
            <div className="col-span-5 flex flex-col justify-between">
              <div>
                <SectionTitle title="Executive Summary" />
                <p className="text-sm leading-7 text-gray-600 mb-6 text-justify">
                  Analysis indicates a positive trajectory for the upcoming fiscal year. 
                  Driven by strategic budget allocation, the projected income shows a 
                  robust increase compared to the previous period.
                </p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                <p className="text-xs text-green-800 font-medium mb-1 uppercase tracking-wide">
                  Projected Income
                </p>
                <p className="text-2xl font-bold text-green-700 font-mono">
                  Rp {income2028.toLocaleString('id-ID')}
                </p>
              </div>
            </div>

            {/* Right: Bar Chart (7 cols) */}
            <div className="col-span-7 flex flex-col justify-end">
              <div className="h-64 w-full"> {/* CONTAINER HEIGHT IS CRUCIAL FOR CHART.JS */}
                <Bar 
                  data={chartDataBar} 
                  options={commonOptions} 
                />
              </div>
              <p className="text-center text-xs text-gray-400 mt-2">
                Year-over-Year Income Comparison
              </p>
            </div>
          </div>
        </section>

        {/* SEPARATOR */}
        <hr className="border-gray-200 mb-16" />

        {/* SECTION 2: BREAKDOWN & RATIOS */}
        <section className="grid grid-cols-2 gap-16">
          
          {/* Table Area */}
          <div>
            <SectionTitle title="Income Breakdown" />
            <div className="overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-black">
                    <th className="text-left py-3 font-bold">Fiscal Year</th>
                    <th className="text-right py-3 font-bold">Net Amount</th>
                    <th className="text-right py-3 font-bold">Growth</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="py-4 text-gray-600">2027 (Actual)</td>
                    <td className="py-4 text-right font-mono text-gray-600">
                      {income2027.toLocaleString('id-ID')}
                    </td>
                    <td className="py-4 text-right text-xs text-gray-400">-</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="py-4 font-semibold text-gray-900 pl-2">2028 (Proj.)</td>
                    <td className="py-4 text-right font-mono font-bold text-gray-900 pr-2">
                      {income2028.toLocaleString('id-ID')}
                    </td>
                    <td className="py-4 text-right text-xs text-green-600 font-bold pr-2">
                      +26%
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Doughnut Area */}
          <div className="flex flex-col items-center justify-start">
            <div className="w-full">
              <SectionTitle title="Efficiency Ratio" />
            </div>
            
            <div className="relative w-48 h-48 mt-4"> {/* Fixed Size for Doughnut */}
              <Doughnut
                data={chartDataDoughnut}
                options={{
                  ...commonOptions,
                  cutout: "75%", // Thinner ring
                  plugins: { legend: { display: false } },
                  elements: { arc: { borderWidth: 0 } }
                }}
              />
              {/* Center Text Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-3xl font-bold text-gray-800">72%</span>
                <span className="text-[10px] uppercase tracking-wider text-gray-500">Saved</span>
              </div>
            </div>
            
            <p className="text-xs text-center text-gray-500 mt-6 max-w-xs leading-relaxed">
              Targeting a <strong className="text-gray-900">72% saving rate</strong> allows for accelerated asset accumulation within the first two quarters.
            </p>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="absolute bottom-12 left-0 w-full px-[15mm] flex justify-between items-center text-[10px] text-gray-400 border-t pt-4 mx-auto" style={{ width: '100%' }}>
          <span>CONFIDENTIAL REPORT</span>
          <span>PAGE 01 / 01</span>
        </footer>
      </main>
    </div>
  );
}