"use client";

import { useState, useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { getMonthlyVisitData, getPieChartData } from "@/lib/firestore";
import { Loader2 } from "lucide-react";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

export function OverviewCharts() {
  const [barData, setBarData] = useState<{
    labels: string[];
    homeVisits: number[];
    blogReads: number[];
    sermonViews: number[];
  } | null>(null);
  const [pieData, setPieData] = useState<{
    labels: string[];
    data: number[];
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadChartData();
  }, []);

  async function loadChartData() {
    try {
      setLoading(true);
      const [barDataResult, pieDataResult] = await Promise.all([
        getMonthlyVisitData(),
        getPieChartData(),
      ]);
      setBarData(barDataResult);
      setPieData(pieDataResult);
    } catch (error) {
      console.error("Error loading chart data:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
      </div>
    );
  }

  const chartBarData = {
    labels: barData?.labels || ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
    datasets: [
      {
        label: "Total Visits",
        data: barData?.homeVisits || [0, 0, 0, 0, 0, 0, 0, 0],
        backgroundColor: "rgba(37, 99, 235, 0.7)",
        borderRadius: 8,
      },
      {
        label: "Blog Reads",
        data: barData?.blogReads || [0, 0, 0, 0, 0, 0, 0, 0],
        backgroundColor: "rgba(16, 185, 129, 0.7)",
        borderRadius: 8,
      },
      {
        label: "Sermon Views",
        data: barData?.sermonViews || [0, 0, 0, 0, 0, 0, 0, 0],
        backgroundColor: "rgba(251, 191, 36, 0.7)",
        borderRadius: 8,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: "Site Analytics (Last 8 Months)" },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const chartPieData = {
    labels: pieData?.labels || ["Total Visits", "Blog Reads", "Sermon Views"],
    datasets: [
      {
        label: "Current Month",
        data: pieData?.data || [0, 0, 0],
        backgroundColor: [
          "rgba(37, 99, 235, 0.7)",
          "rgba(16, 185, 129, 0.7)",
          "rgba(251, 191, 36, 0.7)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: { position: "right" as const },
      title: { display: true, text: "Current Month Distribution" },
    },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
        <Bar data={chartBarData} options={barOptions} height={300} />
      </div>
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 flex flex-col items-center justify-center">
        <Pie data={chartPieData} options={pieOptions} />
      </div>
    </div>
  );
}
