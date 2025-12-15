"use client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie, Doughnut } from "react-chartjs-2";

import { useEffect, useState } from "react";
import { getUserBudget } from "@/lib/budget";

ChartJS.register(ArcElement, Tooltip, Legend);

// props
export default function DonutChart({ data, colors }: { data: any[], colors: string[] }) {
  const pieData = {
    labels: data.map((tx) => tx.name),
    datasets: [
      {
        label: "Expenses",
        data: data.map((tx) => tx.budget),
        backgroundColor: colors,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "65%",
    plugins: { legend: { position: "bottom" as const } },
  };

  return <Doughnut data={pieData} options={options} />;
}

