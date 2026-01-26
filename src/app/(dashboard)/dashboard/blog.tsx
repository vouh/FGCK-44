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
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl p-6 md:p-8 w-full max-w-3xl shadow-lg my-8">
            <h2 className="text-2xl font-bold mb-2">Add New Blog</h2>
            <p className="text-sm text-slate-600 mb-6">Fill in the details below. Use double line breaks for paragraphs.</p>
            
            <div className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Title *</label>
                <input 
                  className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  placeholder="Enter blog title" 
                  value={newBlog.title} 
                  onChange={e => setNewBlog({ ...newBlog, title: e.target.value })} 
                />
              </div>
              
              {/* Subheading */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Subheading</label>
                <input 
                  className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  placeholder="Brief description or subtitle" 
                  value={newBlog.subheading} 
                  onChange={e => setNewBlog({ ...newBlog, subheading: e.target.value })} 
                />
              </div>
              
              {/* Image URL */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Image URL</label>
                <input 
                  className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  placeholder="https://example.com/image.jpg (Recommended: 1200x630px)" 
                  value={newBlog.image} 
                  onChange={e => setNewBlog({ ...newBlog, image: e.target.value })} 
                />
                <p className="text-xs text-slate-500 mt-1">💡 Recommended size: 1200x630px for best display</p>
              </div>
              
              {/* Date */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Date</label>
                <input 
                  className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  type="date" 
                  value={newBlog.date} 
                  onChange={e => setNewBlog({ ...newBlog, date: e.target.value })} 
                />
              </div>
              
              {/* Content with Markdown tips */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Content *</label>
                <div className="mb-2 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-slate-700">
                  <p className="font-bold text-blue-900 mb-3">📝 How to Format Your Blog Post:</p>
                  
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold text-slate-900">✅ Create Paragraphs:</p>
                      <p className="text-xs ml-4 mt-1">Press <kbd className="px-2 py-0.5 bg-white border rounded shadow-sm font-mono">Enter</kbd> <strong>TWICE</strong> to start a new paragraph.</p>
                      <div className="ml-4 mt-2 p-2 bg-white rounded border text-xs font-mono">
                        First paragraph here.<br/>
                        <span className="text-slate-400">[Press Enter twice]</span><br/>
                        <br/>
                        Second paragraph here.
                      </div>
                    </div>
                    
                    <div>
                      <p className="font-semibold text-slate-900">✅ Line Breaks Within Paragraph:</p>
                      <p className="text-xs ml-4 mt-1">Press <kbd className="px-2 py-0.5 bg-white border rounded shadow-sm font-mono">Enter</kbd> <strong>ONCE</strong> to break to a new line within the same paragraph.</p>
                    </div>
                    
                    <div>
                      <p className="font-semibold text-slate-900">✅ Make It Engaging:</p>
                      <ul className="text-xs ml-4 mt-1 space-y-1">
                        <li>• Use emojis: ✨ 🔥 💡 ❤️ 🙏 📖 ⛪</li>
                        <li>• Keep paragraphs short (3-5 lines max)</li>
                        <li>• Use Bible verses with quotes</li>
                        <li>• End with a call to action</li>
                      </ul>
                    </div>
                    
                    <div>
                      <p className="font-semibold text-slate-900">✅ Images:</p>
                      <p className="text-xs ml-4 mt-1">Upload images at <strong>1200 x 630 pixels</strong> for best quality on all devices.</p>
                    </div>
                    
                    <div className="pt-2 border-t border-blue-200">
                      <p className="font-semibold text-slate-900 text-xs">💡 Quick Tip:</p>
                      <p className="text-xs ml-4 mt-1 italic">Write naturally as you would in a document. The system will automatically format it beautifully on the website!</p>
                    </div>
                  </div>
                </div>
                <textarea 
                  className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-sans text-sm leading-relaxed" 
                  placeholder="Example:&#10;&#10;Welcome to our church! ⛪&#10;&#10;This is the first paragraph. It's short and easy to read.&#10;&#10;This is the second paragraph. Notice how we pressed Enter twice to create a new paragraph.&#10;&#10;'For God so loved the world...' - John 3:16&#10;&#10;Join us this Sunday! 🙏" 
                  rows={14} 
                  value={newBlog.content} 
                  onChange={e => setNewBlog({ ...newBlog, content: e.target.value })} 
                />
                <p className="text-xs text-slate-500 mt-1">{newBlog.content.length} characters • {newBlog.content.split('\n\n').filter(p => p.trim()).length} paragraphs</p>
              </div>
            </div>
            
            <div className="flex gap-3 justify-end mt-6 pt-4 border-t">
              <button 
                className="bg-slate-100 hover:bg-slate-200 px-6 py-2.5 rounded-lg font-semibold transition" 
                onClick={() => setShowModal(false)} 
                disabled={submitting}
              >
                Cancel
              </button>
              <button 
                className="bg-blue-900 hover:bg-blue-800 text-white px-6 py-2.5 rounded-lg font-bold transition disabled:opacity-50" 
                onClick={handleAdd} 
                disabled={submitting}
              >
                {submitting ? "Adding..." : "Add Blog"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
