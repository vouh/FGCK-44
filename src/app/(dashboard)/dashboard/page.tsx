"use client";

import { useState, useEffect } from "react";
import { OverviewCharts } from "./overview-charts";
import { Eye, BookOpen, Video, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  getAnalyticsData,
  calculatePercentageChange,
  AnalyticsData,
} from "@/lib/firestore";

export default function DashboardOverviewPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  async function loadAnalytics() {
    try {
      setLoading(true);
      const data = await getAnalyticsData();
      setAnalytics(data);
    } catch (error) {
      console.error("Error loading analytics:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  const totalVisitsTrend = analytics
    ? calculatePercentageChange(analytics.totalVisits, analytics.lastMonthTotalVisits)
    : "N/A";
  const blogReadsTrend = analytics
    ? calculatePercentageChange(analytics.blogReads, analytics.lastMonthBlogReads)
    : "N/A";
  const sermonViewsTrend = analytics
    ? calculatePercentageChange(analytics.sermonViews, analytics.lastMonthSermonViews)
    : "N/A";

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Overview</h1>
        <p className="text-slate-600 dark:text-slate-400">Welcome back! Here&apos;s what&apos;s happening today.</p>
      </div>

      {/* 3 Analytics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          label="Total Visits"
          value={analytics?.totalVisits.toLocaleString() || "0"}
          icon={Eye}
          trend={totalVisitsTrend}
          trendUp={totalVisitsTrend.startsWith("+")}
          description="from last month"
          className="bg-blue-500 text-white"
        />
        <StatCard
          label="Blog Reads"
          value={analytics?.blogReads.toLocaleString() || "0"}
          icon={BookOpen}
          trend={blogReadsTrend}
          trendUp={blogReadsTrend.startsWith("+")}
          description="from last month"
          className="bg-emerald-500 text-white"
        />
        <StatCard
          label="Sermon Views"
          value={analytics?.sermonViews.toLocaleString() || "0"}
          icon={Video}
          trend={sermonViewsTrend}
          trendUp={sermonViewsTrend.startsWith("+")}
          description="from last month"
          className="bg-amber-500 text-white"
        />
      </div>

      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
        <OverviewCharts />
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  trend,
  trendUp,
  description,
  className
}: {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  trend: string;
  trendUp: boolean;
  description: string;
  className?: string;
}) {
  return (
    <div className={cn("rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group", className)}>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 bg-white/20 rounded-lg">
            <Icon className="w-5 h-5 text-white" />
          </div>
          <div className={cn(
            "text-xs font-semibold px-2 py-1 rounded-full bg-white/20 text-white",
            trend === "N/A" && "opacity-60"
          )}>
            {trend}
          </div>
        </div>
        <div className="space-y-1">
          <h3 className="text-3xl font-bold text-white tracking-tight">{value}</h3>
          <p className="text-sm font-medium text-white/80">{label}</p>
        </div>
        <div className="mt-4 text-xs text-white/60 font-medium">
          {description}
        </div>
      </div>

      {/* Decorative background element */}
      <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-colors" />
    </div>
  );
}
