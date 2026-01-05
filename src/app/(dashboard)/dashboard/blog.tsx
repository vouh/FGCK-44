"use client";

import { useState, useEffect } from "react";
import { createBlog, deleteBlog, getBlogs } from "@/lib/firestore/blogService";
import { Blog } from "@/lib/firestore/types";

export default function BlogAdminPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [newBlog, setNewBlog] = useState({
    title: "",
    subheading: "",
    image: "",
    date: "",
    content: ""
  });

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    try {
      const data = await getBlogs();
      setBlogs(data);
    } catch (error) {
      console.error("Failed to load blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string | undefined) => {
    if (!id) return;
    if (!confirm("Are you sure you want to delete this blog post?")) return;
    try {
      await deleteBlog(id);
      setBlogs(blogs.filter((b) => b.id !== id));
    } catch (error) {
      console.error("Failed to delete blog:", error);
      alert("Failed to delete blog");
    }
  };

  const handleAdd = async () => {
    if (!newBlog.title) return alert("Title is required");
    
    setSubmitting(true);
    try {
      await createBlog(newBlog);
      await loadBlogs();
      setShowModal(false);
      setNewBlog({ title: "", subheading: "", image: "", date: "", content: "" });
    } catch (error) {
      console.error("Failed to create blog:", error);
      alert("Failed to create blog");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div>Loading blogs...</div>;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-black text-blue-950">Manage Blogs</h1>
        <button className="bg-blue-900 text-white px-4 py-2 rounded-lg font-bold" onClick={() => setShowModal(true)}>
          Add New Blog
        </button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <div key={blog.id ?? blog.title} className="rounded-xl border bg-white p-4 shadow-sm flex flex-col gap-2">
            <img src={blog.image || "https://placehold.co/600x300"} alt={blog.title} className="rounded-lg h-40 object-cover mb-2" />
            <div className="font-bold text-lg">{blog.title}</div>
            <div className="text-blue-900 text-xs font-semibold mb-1">{blog.subheading}</div>
            <div className="text-slate-500 text-xs mb-2">{blog.date}</div>
            <div className="text-sm mb-2 line-clamp-3">{blog.content}</div>
            <div className="flex gap-2 mt-auto">
              <button className="bg-yellow-100 text-yellow-900 px-3 py-1 rounded font-bold text-xs">Edit</button>
              <button className="bg-red-100 text-red-900 px-3 py-1 rounded font-bold text-xs" onClick={() => handleDelete(blog.id)} disabled={!blog.id}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 w-full max-w-md shadow-lg">
            <h2 className="text-xl font-bold mb-4">Add New Blog</h2>
            <input className="w-full border rounded-lg px-3 py-2 mb-2" placeholder="Title" value={newBlog.title} onChange={e => setNewBlog({ ...newBlog, title: e.target.value })} />
            <input className="w-full border rounded-lg px-3 py-2 mb-2" placeholder="Subheading" value={newBlog.subheading} onChange={e => setNewBlog({ ...newBlog, subheading: e.target.value })} />
            <input className="w-full border rounded-lg px-3 py-2 mb-2" placeholder="Image URL" value={newBlog.image} onChange={e => setNewBlog({ ...newBlog, image: e.target.value })} />
            <input className="w-full border rounded-lg px-3 py-2 mb-2" placeholder="Date" type="date" value={newBlog.date} onChange={e => setNewBlog({ ...newBlog, date: e.target.value })} />
            <textarea className="w-full border rounded-lg px-3 py-2 mb-2" placeholder="Content" rows={4} value={newBlog.content} onChange={e => setNewBlog({ ...newBlog, content: e.target.value })} />
            <div className="flex gap-2 justify-end mt-2">
              <button className="bg-slate-100 px-4 py-2 rounded" onClick={() => setShowModal(false)} disabled={submitting}>Cancel</button>
              <button className="bg-blue-900 text-white px-4 py-2 rounded font-bold" onClick={handleAdd} disabled={submitting}>
                {submitting ? "Adding..." : "Add Blog"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
