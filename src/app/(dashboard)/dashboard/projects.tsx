"use client";

import { useState } from "react";

const dummyProjects = [
  {
    id: 1,
    title: "Church Renovation",
    image: "https://placehold.co/600x300",
    deadline: "2026-03-01",
    progress: 60,
    description: "Renovating the main church hall."
  },
  {
    id: 2,
    title: "Youth Center",
    image: "https://placehold.co/600x300",
    deadline: "2026-06-15",
    progress: 80,
    description: "Building a new youth center for the community."
  }
];

export default function ProjectsAdminPage() {
  const [projects, setProjects] = useState(dummyProjects);
  const [showModal, setShowModal] = useState(false);
  const [newProject, setNewProject] = useState({
    title: "",
    image: "",
    deadline: "",
    progress: 0,
    description: ""
  });

  const handleDelete = (id: number) => {
    setProjects(projects.filter((p) => p.id !== id));
  };

  const handleAdd = () => {
    setProjects([
      ...projects,
      { ...newProject, id: Date.now() }
    ]);
    setShowModal(false);
    setNewProject({ title: "", image: "", deadline: "", progress: 0, description: "" });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-black text-blue-950">Manage Projects</h1>
        <button className="bg-blue-900 text-white px-4 py-2 rounded-lg font-bold" onClick={() => setShowModal(true)}>
          Add New Project
        </button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div key={project.id} className="rounded-xl border bg-white p-4 shadow-sm flex flex-col gap-2">
            <img src={project.image} alt={project.title} className="rounded-lg h-40 object-cover mb-2" />
            <div className="font-bold text-lg">{project.title}</div>
            <div className="text-blue-900 text-xs font-semibold mb-1">Deadline: {project.deadline || "N/A"}</div>
            <div className="text-slate-500 text-xs mb-2">Progress: {project.progress}%</div>
            <div className="text-sm mb-2 line-clamp-3">{project.description}</div>
            <div className="flex gap-2 mt-auto">
              <button className="bg-yellow-100 text-yellow-900 px-3 py-1 rounded font-bold text-xs">Edit</button>
              <button className="bg-red-100 text-red-900 px-3 py-1 rounded font-bold text-xs" onClick={() => handleDelete(project.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 w-full max-w-md shadow-lg">
            <h2 className="text-xl font-bold mb-4">Add New Project</h2>
            <input className="w-full border rounded-lg px-3 py-2 mb-2" placeholder="Title" value={newProject.title} onChange={e => setNewProject({ ...newProject, title: e.target.value })} />
            <input className="w-full border rounded-lg px-3 py-2 mb-2" placeholder="Image URL" value={newProject.image} onChange={e => setNewProject({ ...newProject, image: e.target.value })} />
            <input className="w-full border rounded-lg px-3 py-2 mb-2" placeholder="Deadline (optional)" type="date" value={newProject.deadline} onChange={e => setNewProject({ ...newProject, deadline: e.target.value })} />
            <input className="w-full border rounded-lg px-3 py-2 mb-2" placeholder="Progress (%)" type="number" min="0" max="100" value={newProject.progress} onChange={e => setNewProject({ ...newProject, progress: Number(e.target.value) })} />
            <textarea className="w-full border rounded-lg px-3 py-2 mb-2" placeholder="Description" rows={4} value={newProject.description} onChange={e => setNewProject({ ...newProject, description: e.target.value })} />
            <div className="flex gap-2 justify-end mt-2">
              <button className="bg-slate-100 px-4 py-2 rounded" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="bg-blue-900 text-white px-4 py-2 rounded font-bold" onClick={handleAdd}>Add Project</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
