"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Calendar, X, Hammer, Loader2, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  Project,
} from "@/lib/firestore";

export default function ProjectsAdminPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    deadline: "",
    progress: 0,
    description: "",
  });

  // Load projects from Firestore
  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    try {
      setLoading(true);
      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      console.error("Error loading projects:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      await deleteProject(id);
      setProjects(projects.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const openEditModal = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      image: project.image,
      deadline: project.deadline,
      progress: project.progress,
      description: project.description,
    });
    setShowModal(true);
  };

  const openAddModal = () => {
    setEditingProject(null);
    setFormData({ title: "", image: "", deadline: "", progress: 0, description: "" });
    setShowModal(true);
  };

  const handleSubmit = async () => {
    if (!formData.title) return;
    setSaving(true);
    try {
      if (editingProject?.id) {
        await updateProject(editingProject.id, formData);
        setProjects(projects.map((p) => (p.id === editingProject.id ? { ...p, ...formData } : p)));
      } else {
        const id = await createProject(formData);
        const newProject: Project = { id, ...formData, createdAt: Date.now(), updatedAt: Date.now() };
        setProjects([newProject, ...projects]);
      }
      setShowModal(false);
      setFormData({ title: "", image: "", deadline: "", progress: 0, description: "" });
      setEditingProject(null);
    } catch (error) {
      console.error("Error saving project:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Manage Projects</h1>
          <p className="text-slate-600 dark:text-slate-400">Track and update ongoing church projects.</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-all hover:scale-105 shadow-md hover:shadow-lg"
        >
          <Plus className="w-5 h-5" />
          Add New Project
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-12 text-slate-500">
          No projects yet. Click &quot;Add New Project&quot; to create one.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden"
            >
              <div className="aspect-video w-full bg-slate-100 dark:bg-slate-800 relative overflow-hidden">
                {project.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400">
                    <Hammer className="w-10 h-10 opacity-50" />
                  </div>
                )}
                <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                  {project.progress}% Complete
                </div>
              </div>

              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{project.title}</h3>

                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 mb-4 overflow-hidden">
                  <div
                    className="bg-blue-600 h-full rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>

                <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-2 mb-4 flex-1">{project.description}</p>

                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    Deadline: {project.deadline || "N/A"}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEditModal(project)}
                      className="text-blue-600 hover:text-blue-700 font-medium transition-colors flex items-center gap-1"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                      Edit
                    </button>
                    <button
                      onClick={() => project.id && handleDelete(project.id)}
                      className="text-red-500 hover:text-red-700 font-medium transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {editingProject ? "Edit Project" : "Add New Project"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Title</label>
                <input
                  className="w-full border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Project title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm"
                />
                {formData.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={formData.image} alt="Preview" className="mt-2 h-32 w-full object-cover rounded-lg" />
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Deadline</label>
                <input
                  type="date"
                  className="w-full border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Progress: {formData.progress}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                  value={formData.progress}
                  onChange={(e) => setFormData({ ...formData, progress: Number(e.target.value) })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description</label>
                <textarea
                  className="w-full border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Project description..."
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 p-6 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={saving || !formData.title}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-5 py-2 rounded-lg font-semibold transition-colors"
              >
                {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                {editingProject ? "Save Changes" : "Add Project"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
