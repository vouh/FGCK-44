"use client";

import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/features/firebase/firebaseConfig";
import { PageVisit, AnalyticsData } from "./types";
import { COLLECTIONS } from "./collections";

const pageVisitsRef = collection(db, COLLECTIONS.PAGE_VISITS);

// Get the start and end timestamps for a given month
function getMonthRange(date: Date): { start: number; end: number } {
  const start = new Date(date.getFullYear(), date.getMonth(), 1).getTime();
  const end = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999).getTime();
  return { start, end };
}

// Get visits for a specific page in a date range
async function getVisitsByPage(page: string, startTime: number, endTime: number): Promise<number> {
  const q = query(
    pageVisitsRef,
    where("page", "==", page),
    where("timestamp", ">=", startTime),
    where("timestamp", "<=", endTime)
  );
  const snapshot = await getDocs(q);
  return snapshot.size;
}

// Get all visits in a date range
async function getAllVisits(startTime: number, endTime: number): Promise<PageVisit[]> {
  const q = query(
    pageVisitsRef,
    where("timestamp", ">=", startTime),
    where("timestamp", "<=", endTime)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as PageVisit[];
}

// Get analytics data for dashboard
export async function getAnalyticsData(): Promise<AnalyticsData> {
  const now = new Date();
  const currentMonth = getMonthRange(now);
  const lastMonth = getMonthRange(new Date(now.getFullYear(), now.getMonth() - 1, 1));

  // Get current month counts
  const [currentHomeVisits, currentBlogReads, currentSermonViews] = await Promise.all([
    getVisitsByPage("home", currentMonth.start, currentMonth.end),
    getVisitsByPage("blog", currentMonth.start, currentMonth.end),
    getVisitsByPage("sermons", currentMonth.start, currentMonth.end),
  ]);

  // Get last month counts
  const [lastHomeVisits, lastBlogReads, lastSermonViews] = await Promise.all([
    getVisitsByPage("home", lastMonth.start, lastMonth.end),
    getVisitsByPage("blog", lastMonth.start, lastMonth.end),
    getVisitsByPage("sermons", lastMonth.start, lastMonth.end),
  ]);

  return {
    totalVisits: currentHomeVisits,
    blogReads: currentBlogReads,
    sermonViews: currentSermonViews,
    lastMonthTotalVisits: lastHomeVisits,
    lastMonthBlogReads: lastBlogReads,
    lastMonthSermonViews: lastSermonViews,
  };
}

// Calculate percentage change
export function calculatePercentageChange(current: number, previous: number): string {
  if (previous === 0) {
    return current > 0 ? "+100%" : "N/A";
  }
  const change = ((current - previous) / previous) * 100;
  const sign = change >= 0 ? "+" : "";
  return `${sign}${change.toFixed(0)}%`;
}

// Get monthly visit data for charts (last 8 months)
export async function getMonthlyVisitData(): Promise<{
  labels: string[];
  homeVisits: number[];
  blogReads: number[];
  sermonViews: number[];
}> {
  const now = new Date();
  const labels: string[] = [];
  const homeVisits: number[] = [];
  const blogReads: number[] = [];
  const sermonViews: number[] = [];

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Get data for last 8 months
  for (let i = 7; i >= 0; i--) {
    const monthDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const range = getMonthRange(monthDate);
    
    labels.push(monthNames[monthDate.getMonth()]);
    
    const [home, blog, sermons] = await Promise.all([
      getVisitsByPage("home", range.start, range.end),
      getVisitsByPage("blog", range.start, range.end),
      getVisitsByPage("sermons", range.start, range.end),
    ]);
    
    homeVisits.push(home);
    blogReads.push(blog);
    sermonViews.push(sermons);
  }

  return { labels, homeVisits, blogReads, sermonViews };
}

// Get pie chart data
export async function getPieChartData(): Promise<{
  labels: string[];
  data: number[];
}> {
  const now = new Date();
  const currentMonth = getMonthRange(now);

  const [homeVisits, blogReads, sermonViews] = await Promise.all([
    getVisitsByPage("home", currentMonth.start, currentMonth.end),
    getVisitsByPage("blog", currentMonth.start, currentMonth.end),
    getVisitsByPage("sermons", currentMonth.start, currentMonth.end),
  ]);

  return {
    labels: ["Total Visits", "Blog Reads", "Sermon Views"],
    data: [homeVisits, blogReads, sermonViews],
  };
}
