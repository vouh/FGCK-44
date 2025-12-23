
"use client";

import { useState } from "react";
import { OverviewCharts } from "./overview-charts";

export default function DashboardOverviewPage() {
  return (
    <div className="space-y-10">
      <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-2">
        <div>
          <h1 className="text-4xl font-extrabold text-blue-950 mb-1 tracking-tight">Admin Dashboard</h1>
          <p className="text-slate-500 text-lg">Manage content and view analytics.</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        <StatCard label="Total Users" value="2,500" color="blue" />
        <StatCard label="Total Page Views" value="8,220" color="green" />
        <StatCard label="Blog Reads" value="120" color="yellow" />
        <StatCard label="Sermon Views" value="45" color="red" />
      </div>
      <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
        <OverviewCharts />
      </div>
    </div>
  );
}

function StatCard({ label, value, color }: { label: string; value: string; color: string }) {
  const colorMap: any = {
    blue: "bg-blue-100 text-blue-900",
    green: "bg-green-100 text-green-900",
    yellow: "bg-yellow-100 text-yellow-900",
    red: "bg-red-100 text-red-900",
  };
  return (
    <div className={`rounded-2xl shadow-sm border border-blue-100 p-6 text-center font-bold flex flex-col items-center gap-1 ${colorMap[color]}`}> 
      <div className="text-3xl font-extrabold">{value}</div>
      <div className="text-xs font-semibold uppercase tracking-wide mt-1 opacity-80">{label}</div>
    </div>
  );
}

function BlogUploadPanel() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Upload New Blog</h2>
      <form className="space-y-4 max-w-lg">
        <input className="w-full border rounded-lg px-3 py-2" placeholder="Blog Title" />
        <textarea className="w-full border rounded-lg px-3 py-2" placeholder="Blog Content" rows={5} />
        <input className="w-full border rounded-lg px-3 py-2" placeholder="Image URL (optional)" />
        <button type="button" className="bg-blue-900 text-white px-6 py-2 rounded-lg font-bold">Upload Blog</button>
      </form>
    </div>
  );
}

function ProjectUploadPanel() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Upload New Project</h2>
      <form className="space-y-4 max-w-lg">
        <input className="w-full border rounded-lg px-3 py-2" placeholder="Project Title" />
        <textarea className="w-full border rounded-lg px-3 py-2" placeholder="Project Description" rows={4} />
        <input className="w-full border rounded-lg px-3 py-2" placeholder="Image URL (optional)" />
        <button type="button" className="bg-blue-900 text-white px-6 py-2 rounded-lg font-bold">Upload Project</button>
      </form>
    </div>
  );
}

function SermonUploadPanel() {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const getYoutubeId = (url: string) => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/);
    return match ? match[1] : null;
  };
  const videoId = getYoutubeId(youtubeUrl);
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Upload New Sermon (YouTube)</h2>
      <form className="space-y-4 max-w-lg">
        <input className="w-full border rounded-lg px-3 py-2" placeholder="Sermon Title" />
        <textarea className="w-full border rounded-lg px-3 py-2" placeholder="Sermon Description" rows={3} />
        <input className="w-full border rounded-lg px-3 py-2" placeholder="YouTube Link" value={youtubeUrl} onChange={e => setYoutubeUrl(e.target.value)} />
        {videoId && (
          <div className="mt-4 flex flex-col items-center">
            <img src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`} alt="YouTube Thumbnail" className="rounded-lg w-64" />
            <div className="flex gap-4 mt-2">
              <a href={`https://youtube.com/watch?v=${videoId}`} target="_blank" rel="noopener" className="text-blue-900 underline font-semibold">View on YouTube</a>
              <button type="button" className="text-blue-900 underline font-semibold">View Here</button>
            </div>
          </div>
        )}
        <button type="button" className="bg-blue-900 text-white px-6 py-2 rounded-lg font-bold">Upload Sermon</button>
      </form>
    </div>
  );
}

function EventUploadPanel() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Upload New Event</h2>
      <form className="space-y-4 max-w-lg">
        <input className="w-full border rounded-lg px-3 py-2" placeholder="Event Title" />
        <textarea className="w-full border rounded-lg px-3 py-2" placeholder="Event Description" rows={3} />
        <input className="w-full border rounded-lg px-3 py-2" placeholder="Event Date" type="date" />
        <input className="w-full border rounded-lg px-3 py-2" placeholder="Image URL (optional)" />
        <button type="button" className="bg-blue-900 text-white px-6 py-2 rounded-lg font-bold">Upload Event</button>
      </form>
    </div>
  );
}
