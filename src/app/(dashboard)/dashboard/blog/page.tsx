"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Calendar, X, Image as ImageIcon, Loader2, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  Blog,
} from "@/lib/firestore";

export default function BlogAdminPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    subheading: "",
    image: "",
    date: "",
    content: "",
  });

  // Load blogs from Firestore
  useEffect(() => {
    loadBlogs();
  }, []);

  async function loadBlogs() {
    try {
      setLoading(true);
      const data = await getBlogs();
      setBlogs(data);
    } catch (error) {
      console.error("Error loading blogs:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;
    try {
      await deleteBlog(id);
      setBlogs(blogs.filter((b) => b.id !== id));
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  const openEditModal = (blog: Blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      subheading: blog.subheading,
      image: blog.image,
      date: blog.date,
      content: blog.content,
    });
    setShowModal(true);
  };

  const openAddModal = () => {
    setEditingBlog(null);
    setFormData({ title: "", subheading: "", image: "", date: "", content: "" });
    setShowModal(true);
  };

  const handleSubmit = async () => {
    if (!formData.title) return;
    setSaving(true);
    try {
      if (editingBlog?.id) {
        // Update existing blog
        await updateBlog(editingBlog.id, formData);
        setBlogs(blogs.map((b) => (b.id === editingBlog.id ? { ...b, ...formData } : b)));
      } else {
        // Create new blog
        const id = await createBlog(formData);
        const newBlog: Blog = { id, ...formData, createdAt: Date.now(), updatedAt: Date.now() };
        setBlogs([newBlog, ...blogs]);
      }
      setShowModal(false);
      setFormData({ title: "", subheading: "", image: "", date: "", content: "" });
      setEditingBlog(null);
    } catch (error) {
      console.error("Error saving blog:", error);
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
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Manage Blogs</h1>
          <p className="text-slate-600 dark:text-slate-400">Create, edit, and remove blog posts.</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-all hover:scale-105 shadow-md hover:shadow-lg"
        >
          <Plus className="w-5 h-5" />
          Add New Blog
        </button>
      </div>

      {blogs.length === 0 ? (
        <div className="text-center py-12 text-slate-500">
          No blog posts yet. Click &quot;Add New Blog&quot; to create one.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="group relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden"
            >
              <div className="aspect-video w-full bg-slate-100 dark:bg-slate-800 relative overflow-hidden">
                {blog.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400">
                    <ImageIcon className="w-10 h-10 opacity-50" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div className="flex gap-2 w-full">
                    <button
                      onClick={() => openEditModal(blog)}
                      className="flex-1 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white py-2 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2"
                    >
                      <Pencil className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => blog.id && handleDelete(blog.id)}
                      className="flex-none bg-red-500/80 hover:bg-red-500 text-white p-2 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 mb-3">
                  <Calendar className="w-3.5 h-3.5" />
                  {blog.date || "No date"}
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 line-clamp-1">{blog.title}</h3>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2">{blog.subheading}</p>
                <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-3 mb-4 flex-1">{blog.content}</p>
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
                {editingBlog ? "Edit Blog Post" : "Add New Blog Post"}
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
                  placeholder="Blog title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Subheading</label>
                <input
                  className="w-full border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Subheading"
                  value={formData.subheading}
                  onChange={(e) => setFormData({ ...formData, subheading: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Image</label>
                <div className="flex gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="flex-1 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm"
                  />
                </div>
                {formData.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={formData.image} alt="Preview" className="mt-2 h-32 w-full object-cover rounded-lg" />
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Date</label>
                <input
                  type="date"
                  className="w-full border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Content</label>
                <textarea
                  className="w-full border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Blog content..."
                  rows={5}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
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
                {editingBlog ? "Save Changes" : "Add Blog"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
