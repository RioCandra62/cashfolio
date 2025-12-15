"use client";

import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

type DonutChartProps = {
  labels: string[];
  values: number[];
};

export default function DonutChart({
  labels,
  values
}: DonutChartProps) {
  const data: ChartData<"doughnut", number[], string> = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: [
          "#22c55e",
          "#3b82f6",
          "#f97316",
          "#ef4444",
          "#a855f7"
        ],
        borderWidth: 1
      }
    ]
  };

  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    cutout: "65%",
    plugins: {
      legend: {
        position: "bottom"
      },
      tooltip: {
        callbacks: {
          label(context) {
            const value = context.raw as number;
            return `Rp ${value.toLocaleString("id-ID")}`;
          }
        }
      }
    }
  };

  return (
    <div style={{ width: 350, margin: "0 auto" }}>
      <Doughnut data={data} options={options} />
    </div>
  );
}


import { Plugin } from "chart.js";

export const centerTextPlugin: Plugin<"doughnut"> = {
  id: "centerText",
  beforeDraw(chart) {
    const { ctx } = chart;
    const total = chart.data.datasets[0].data.reduce(
      (a, b) => a + (b as number),
      0
    );

    ctx.save();
    ctx.font = "bold 18px sans-serif";
    ctx.fillStyle = "#111";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(
      `Rp ${total.toLocaleString("id-ID")}`,
      chart.width / 2,
      chart.height / 2
    );
  }
};
