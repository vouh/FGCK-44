"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Calendar, X, Youtube, Play, Loader2, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  getSermons,
  createSermon,
  updateSermon,
  deleteSermon,
  Sermon,
} from "@/lib/firestore";
import { getYoutubeThumbnail } from "@/lib/youtube";
import { SermonImage } from "@/components/site/SermonImage";

export default function SermonsAdminPage() {
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingSermon, setEditingSermon] = useState<Sermon | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    youtube: "",
    date: "",
  });

  // Load sermons from Firestore
  useEffect(() => {
    loadSermons();
  }, []);

  async function loadSermons() {
    try {
      setLoading(true);
      const data = await getSermons();
      setSermons(data);
    } catch (error) {
      console.error("Error loading sermons:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this sermon?")) return;
    try {
      await deleteSermon(id);
      setSermons(sermons.filter((s) => s.id !== id));
    } catch (error) {
      console.error("Error deleting sermon:", error);
    }
  };

  const openEditModal = (sermon: Sermon) => {
    setEditingSermon(sermon);
    setFormData({
      title: sermon.title,
      description: sermon.description,
      youtube: sermon.youtube,
      date: sermon.date,
    });
    setShowModal(true);
  };

  const openAddModal = () => {
    setEditingSermon(null);
    setFormData({ title: "", description: "", youtube: "", date: "" });
    setShowModal(true);
  };

  const handleSubmit = async () => {
    if (!formData.title) return;
    setSaving(true);
    try {
      if (editingSermon?.id) {
        await updateSermon(editingSermon.id, formData);
        setSermons(sermons.map((s) => (s.id === editingSermon.id ? { ...s, ...formData } : s)));
      } else {
        const id = await createSermon(formData);
        const newSermon: Sermon = { id, ...formData, createdAt: Date.now(), updatedAt: Date.now() };
        setSermons([newSermon, ...sermons]);
      }
      setShowModal(false);
      setFormData({ title: "", description: "", youtube: "", date: "" });
      setEditingSermon(null);
    } catch (error) {
      console.error("Error saving sermon:", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-red-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Manage Sermons</h1>
          <p className="text-slate-600 dark:text-slate-400">Upload and manage church sermons and videos.</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-all hover:scale-105 shadow-md hover:shadow-lg"
        >
          <Plus className="w-5 h-5" />
          Add New Sermon
        </button>
      </div>

      {sermons.length === 0 ? (
        <div className="text-center py-12 text-slate-500">
          No sermons yet. Click &quot;Add New Sermon&quot; to create one.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sermons.map((sermon) => {
            return (
              <div
                key={sermon.id}
                className="group relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden"
              >
                <div className="aspect-video w-full bg-slate-900 relative overflow-hidden">
                  <SermonImage
                    youtubeUrl={sermon.youtube}
                    title={sermon.title}
                    fill
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                  />

                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/50 group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 text-white ml-1" fill="currentColor" />
                    </div>
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-xs font-medium text-red-600 dark:text-red-400 mb-2">
                    <Youtube className="w-3.5 h-3.5" />
                    YouTube Video
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 line-clamp-1">{sermon.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-2 mb-4 flex-1">{sermon.description}</p>

                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {sermon.date || "No date"}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEditModal(sermon)}
                        className="text-blue-600 hover:text-blue-700 font-medium transition-colors flex items-center gap-1"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                        Edit
                      </button>
                      <button
                        onClick={() => sermon.id && handleDelete(sermon.id)}
                        className="text-red-500 hover:text-red-700 font-medium transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {editingSermon ? "Edit Sermon" : "Add New Sermon"}
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
                  className="w-full border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Sermon title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">YouTube Link</label>
                <input
                  className="w-full border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={formData.youtube}
                  onChange={(e) => setFormData({ ...formData, youtube: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Date</label>
                <input
                  type="date"
                  className="w-full border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description</label>
                <textarea
                  className="w-full border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                  placeholder="Sermon description..."
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
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white px-5 py-2 rounded-lg font-semibold transition-colors"
              >
                {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                {editingSermon ? "Save Changes" : "Add Sermon"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
