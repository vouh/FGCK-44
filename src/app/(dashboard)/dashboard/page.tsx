"use client";

import React, { useState } from "react";
import { AuthPanel } from "@/features/auth/AuthPanel";
import { PageShell } from "@/components/site/PageShell";

export default function AdminDashboard() {
  const [tab, setTab] = useState("analytics");
  return (
    <PageShell title="Admin Dashboard" description="Manage content and view analytics.">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <nav className="w-full md:w-56 flex-shrink-0 mb-4 md:mb-0">
          <ul className="space-y-2">
            <li><button className={`w-full text-left px-4 py-2 rounded-lg font-semibold ${tab === "analytics" ? "bg-blue-100 text-blue-900" : "hover:bg-slate-100"}`} onClick={() => setTab("analytics")}>Analytics</button></li>
            <li><button className={`w-full text-left px-4 py-2 rounded-lg font-semibold ${tab === "blog" ? "bg-blue-100 text-blue-900" : "hover:bg-slate-100"}`} onClick={() => setTab("blog")}>Upload Blog</button></li>
            <li><button className={`w-full text-left px-4 py-2 rounded-lg font-semibold ${tab === "project" ? "bg-blue-100 text-blue-900" : "hover:bg-slate-100"}`} onClick={() => setTab("project")}>Upload Project</button></li>
            <li><button className={`w-full text-left px-4 py-2 rounded-lg font-semibold ${tab === "sermon" ? "bg-blue-100 text-blue-900" : "hover:bg-slate-100"}`} onClick={() => setTab("sermon")}>Upload Sermon (YouTube)</button></li>
            <li><button className={`w-full text-left px-4 py-2 rounded-lg font-semibold ${tab === "event" ? "bg-blue-100 text-blue-900" : "hover:bg-slate-100"}`} onClick={() => setTab("event")}>Upload Event</button></li>
          </ul>
        </nav>
        {/* Main Content */}
        <div className="flex-1">
          <div className="mb-6"><AuthPanel /></div>
          {tab === "analytics" && <AnalyticsPanel />}
          {tab === "blog" && <BlogUploadPanel />}
          {tab === "project" && <ProjectUploadPanel />}
          {tab === "sermon" && <SermonUploadPanel />}
          {tab === "event" && <EventUploadPanel />}
        </div>
      </div>
    </PageShell>
  );
}

function AnalyticsPanel() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Site Analytics</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="rounded-xl bg-blue-50 p-4 text-center">
          <div className="text-2xl font-bold text-blue-900">2,500</div>
          <div className="text-xs text-slate-600">Total Users</div>
        </div>
        <div className="rounded-xl bg-blue-50 p-4 text-center">
          <div className="text-2xl font-bold text-blue-900">8,220</div>
          <div className="text-xs text-slate-600">Total Page Views</div>
        </div>
        <div className="rounded-xl bg-blue-50 p-4 text-center">
          <div className="text-2xl font-bold text-blue-900">120</div>
          <div className="text-xs text-slate-600">Blog Reads</div>
        </div>
        <div className="rounded-xl bg-blue-50 p-4 text-center">
          <div className="text-2xl font-bold text-blue-900">45</div>
          <div className="text-xs text-slate-600">Sermon Views</div>
        </div>
      </div>
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <div className="h-48 flex items-center justify-center text-slate-400">[Analytics Chart Placeholder]</div>
      </div>
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
