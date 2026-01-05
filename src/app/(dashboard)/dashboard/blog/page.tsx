"use client";

import { useState, useRef } from "react";
import { Plus, Pencil, Trash2, X, Image as ImageIcon, Calendar, Type } from "lucide-react";
import { cn } from "@/lib/utils";

const dummyBlogs = [
	{
		id: 1,
		title: "Welcome to FGCK Blog",
		subheading: "Our first post!",
		image: "https://placehold.co/600x300",
		date: "2025-12-01",
		content: "This is the first blog post for FGCK admin dashboard."
	},
	{
		id: 2,
		title: "Christmas Service",
		subheading: "Join us for Christmas!",
		image: "https://placehold.co/600x300",
		date: "2025-12-20",
		content: "Details about our Christmas service and celebrations."
	}
];

export default function BlogAdminPage() {
	const [blogs, setBlogs] = useState(dummyBlogs);
	const [showModal, setShowModal] = useState(false);
	const [newBlog, setNewBlog] = useState({
		title: "",
		subheading: "",
		image: "",
		date: "",
		content: ""
	});

	const handleDelete = (id: number) => {
		setBlogs(blogs.filter((b) => b.id !== id));
	};

	const handleAdd = () => {
		if (!newBlog.title) return;
		setBlogs([
			...blogs,
			{ ...newBlog, id: Date.now() }
		]);
		setShowModal(false);
		setNewBlog({ title: "", subheading: "", image: "", date: "", content: "" });
	};

	const handeFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setNewBlog({ ...newBlog, image: reader.result as string });
			};
			reader.readAsDataURL(file);
		}
	};

	return (
		<div className="space-y-8 animate-fade-in">
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
				<div>
					<h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Manage Blogs</h1>
					<p className="text-slate-600 dark:text-slate-400">Create, edit, and remove blog posts.</p>
				</div>
				<button
					onClick={() => setShowModal(true)}
					className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-all hover:scale-105 shadow-md hover:shadow-lg"
				>
					<Plus className="w-5 h-5" />
					Add New Blog
				</button>
			</div>

			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{blogs.map((blog) => (
					<div key={blog.id} className="group relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden">
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
									<button className="flex-1 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white py-2 rounded-lg text-sm font-semibold transition-colors">
										Edit
									</button>
									<button
										onClick={() => handleDelete(blog.id)}
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
							<p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-3 mb-4 flex-1">
								{blog.content}
							</p>
						</div>
					</div>
				))}
			</div>

			{/* Modal */}
			{showModal && (
				<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
					<div
						className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
						onClick={() => setShowModal(false)}
					/>
					<div className="relative bg-white dark:bg-slate-900 rounded-2xl w-full max-w-lg shadow-2xl border border-slate-200 dark:border-slate-800 animate-fade-in-up flex flex-col max-h-[90vh]">
						<div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800">
							<h2 className="text-xl font-bold text-slate-900 dark:text-white">Add New Blog</h2>
							<button
								onClick={() => setShowModal(false)}
								className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors"
							>
								<X className="w-5 h-5" />
							</button>
						</div>

						<div className="p-6 overflow-y-auto space-y-4">
							<div className="space-y-1.5">
								<label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Title</label>
								<div className="relative">
									<Type className="absolute left-3 top-2.5 w-5 h-5 text-slate-400" />
									<input
										className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-blue-500 dark:text-white placeholder:text-slate-400 transition-all"
										placeholder="Blog title"
										value={newBlog.title}
										onChange={e => setNewBlog({ ...newBlog, title: e.target.value })}
									/>
								</div>
							</div>

							<div className="space-y-1.5">
								<label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Subheading</label>
								<input
									className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-blue-500 dark:text-white placeholder:text-slate-400 transition-all"
									placeholder="Short description"
									value={newBlog.subheading}
									onChange={e => setNewBlog({ ...newBlog, subheading: e.target.value })}
								/>
							</div>

							<div className="space-y-1.5">
								<label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Cover Image</label>
								<div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-4 flex flex-col items-center justify-center text-center hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer relative bg-slate-50 dark:bg-slate-800/50">
									<input
										type="file"
										accept="image/*"
										className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
										onChange={handeFileChange}
									/>
									{newBlog.image ? (
										<div className="relative w-full aspect-video rounded-lg overflow-hidden">
											{/* eslint-disable-next-line @next/next/no-img-element */}
											<img src={newBlog.image} alt="Preview" className="w-full h-full object-cover" />
											<div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-xs font-semibold opacity-0 hover:opacity-100 transition-opacity">
												Click to change
											</div>
										</div>
									) : (
										<div className="py-4">
											<ImageIcon className="w-8 h-8 text-slate-400 mx-auto mb-2" />
											<p className="text-sm text-slate-500">Click to upload image</p>
											<p className="text-xs text-slate-400">PNG, JPG up to 5MB</p>
										</div>
									)}
								</div>
							</div>

							<div className="space-y-1.5">
								<label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Date</label>
								<input
									type="date"
									className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-blue-500 dark:text-white text-slate-600 transition-all"
									value={newBlog.date}
									onChange={e => setNewBlog({ ...newBlog, date: e.target.value })}
								/>
							</div>

							<div className="space-y-1.5">
								<label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Content</label>
								<textarea
									className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-blue-500 dark:text-white placeholder:text-slate-400 transition-all min-h-[120px]"
									placeholder="Write your blog content here..."
									value={newBlog.content}
									onChange={e => setNewBlog({ ...newBlog, content: e.target.value })}
								/>
							</div>
						</div>

						<div className="p-6 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
							<button
								onClick={() => setShowModal(false)}
								className="px-5 py-2.5 rounded-xl font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
							>
								Cancel
							</button>
							<button
								onClick={handleAdd}
								className="px-5 py-2.5 rounded-xl font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 transition-all hover:scale-105"
							>
								Publish Post
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}