"use client";
import { DashboardShell } from "@/components/dashboard/DashboardShell";

const projects = [
  { id: 1, title: "Church Renovation", manager: "Admin", date: "2025-11-10", status: "Active" },
  { id: 2, title: "Community Outreach", manager: "Pastor John", date: "2025-10-05", status: "Completed" },
];

export default function ProjectsDashboardPage() {
  return (
    <DashboardShell>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-blue-950">Projects</h1>
        <button className="bg-blue-900 text-white px-4 py-2 rounded-lg font-bold">+ New Project</button>
      </div>
      <div className="overflow-x-auto rounded-xl bg-white p-0 shadow-sm">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Manager</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-bold text-slate-700 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {projects.map((project) => (
              <tr key={project.id} className="hover:bg-blue-50/30">
                <td className="px-6 py-4 whitespace-nowrap font-semibold text-blue-900">{project.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">{project.manager}</td>
                <td className="px-6 py-4 whitespace-nowrap">{project.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${project.status === "Active" ? "bg-green-100 text-green-900" : "bg-yellow-100 text-yellow-900"}`}>{project.status}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                  <button className="text-blue-900 hover:underline font-semibold">Edit</button>
                  <button className="text-red-700 hover:underline font-semibold">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardShell>
  );
}
