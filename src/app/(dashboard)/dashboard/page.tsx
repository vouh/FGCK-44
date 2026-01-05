"use client";

import { OverviewCharts } from "./overview-charts";
import { Users, Eye, BookOpen, Video } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DashboardOverviewPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Overview</h1>
        <p className="text-slate-600 dark:text-slate-400">Welcome back! Here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Total Users"
          value="2,500"
          icon={Users}
          trend="+12%"
          trendUp={true}
          description="from last month"
          className="bg-blue-500 text-white"
        />
        <StatCard
          label="Total Page Views"
          value="8,220"
          icon={Eye}
          trend="+8%"
          trendUp={true}
          description="from last month"
          className="bg-emerald-500 text-white"
        />
        <StatCard
          label="Blog Reads"
          value="120"
          icon={BookOpen}
          trend="-2%"
          trendUp={false}
          description="from last month"
          className="bg-amber-500 text-white"
        />
        <StatCard
          label="Sermon Views"
          value="45"
          icon={Video}
          trend="+24%"
          trendUp={true}
          description="from last month"
          className="bg-rose-500 text-white"
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
  icon: any;
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
          <div className={cn("text-xs font-semibold px-2 py-1 rounded-full bg-white/20 text-white")}>
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
