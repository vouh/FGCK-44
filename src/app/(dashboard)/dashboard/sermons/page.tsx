"use client";

import { useState } from "react";
import { Plus, Trash2, Calendar, Link as LinkIcon, Youtube, Play, X, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const dummySermons = [
	{
		id: 1,
		title: "Sunday Service",
		description: "Watch our latest Sunday service where Pastor John speaks about Faith.",
		youtube: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
		thumbnail: "",
		date: "2025-12-21"
	},
	{
		id: 2,
		title: "Christmas Message",
		description: "Special Christmas sermon celebrating the birth of Jesus.",
		youtube: "https://www.youtube.com/watch?v=3GwjfUFyY6M",
		thumbnail: "",
		date: "2025-12-20"
	}
];

function getYoutubeId(url: string) {
	const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/);
	return match ? match[1] : null;
}

export default function SermonsAdminPage() {
	const [sermons, setSermons] = useState(dummySermons);
	const [showModal, setShowModal] = useState(false);
	const [newSermon, setNewSermon] = useState({
		title: "",
		description: "",
		youtube: "",
		thumbnail: "",
		date: ""
	});

	const handleDelete = (id: number) => {
		setSermons(sermons.filter((s) => s.id !== id));
	};

	const handleAdd = () => {
		if (!newSermon.title) return;
		setSermons([
			...sermons,
			{ ...newSermon, id: Date.now() }
		]);
		setShowModal(false);
		setNewSermon({ title: "", description: "", youtube: "", thumbnail: "", date: "" });
	};

	const handeFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setNewSermon({ ...newSermon, thumbnail: reader.result as string });
			};
			reader.readAsDataURL(file);
		}
	};

	return (
		<div className="space-y-8 animate-fade-in">
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
				<div>
					<h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Manage Sermons</h1>
					<p className="text-slate-600 dark:text-slate-400">Upload and manage church sermons and videos.</p>
				</div>
				<button
					onClick={() => setShowModal(true)}
					className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-all hover:scale-105 shadow-md hover:shadow-lg"
				>
					<Plus className="w-5 h-5" />
					Add New Sermon
				</button>
			</div>

			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{sermons.map((sermon) => {
					const videoId = getYoutubeId(sermon.youtube);
					const displayImage = sermon.thumbnail || (videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null);

					return (
						<div key={sermon.id} className="group relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden">
							<div className="aspect-video w-full bg-slate-900 relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
								{displayImage ? (
									// eslint-disable-next-line @next/next/no-img-element
									<img
										src={displayImage}
										alt={sermon.title}
										className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
									/>
								) : (
									<div className="w-full h-full flex items-center justify-center text-slate-500">
										<Youtube className="w-12 h-12 opacity-50" />
									</div>
								)}

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
										<button className="text-blue-600 hover:text-blue-700 font-medium transition-colors">Edit</button>
										<button
											onClick={() => handleDelete(sermon.id)}
											className="text-red-500 hover:text-red-700 font-medium transition-colors"
										>
											<Trash2 className="w-4 h-4" />
										</button>
									</div>
								</div>
							</div>
						</div>
					);
				})}
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
							<h2 className="text-xl font-bold text-slate-900 dark:text-white">Add New Sermon</h2>
							<button
								onClick={() => setShowModal(false)}
								className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors"
							>
								<X className="w-5 h-5" />
							</button>
						</div>

						<div className="p-6 overflow-y-auto space-y-4">
							<div className="space-y-1.5">
								<label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Sermon Title</label>
								<input
									className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-red-500 dark:text-white placeholder:text-slate-400 transition-all"
									placeholder="e.g. The Power of Prayer"
									value={newSermon.title}
									onChange={e => setNewSermon({ ...newSermon, title: e.target.value })}
								/>
							</div>

							<div className="space-y-1.5">
								<label className="text-sm font-semibold text-slate-700 dark:text-slate-300">YouTube Link</label>
								<div className="relative">
									<LinkIcon className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
									<input
										className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-red-500 dark:text-white placeholder:text-slate-400 transition-all"
										placeholder="https://youtube.com/watch?v=..."
										value={newSermon.youtube}
										onChange={e => setNewSermon({ ...newSermon, youtube: e.target.value })}
									/>
								</div>
							</div>

							<div className="space-y-1.5">
								<label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Custom Thumbnail (Optional)</label>
								<div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-4 flex flex-col items-center justify-center text-center hover:border-red-500 dark:hover:border-red-500 transition-colors cursor-pointer relative bg-slate-50 dark:bg-slate-800/50">
									<input
										type="file"
										accept="image/*"
										className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
										onChange={handeFileChange}
									/>
									{newSermon.thumbnail ? (
										<div className="relative w-full aspect-video rounded-lg overflow-hidden">
											{/* eslint-disable-next-line @next/next/no-img-element */}
											<img src={newSermon.thumbnail} alt="Preview" className="w-full h-full object-cover" />
											<div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-xs font-semibold opacity-0 hover:opacity-100 transition-opacity">
												Click to change
											</div>
										</div>
									) : (
										<div className="py-4">
											<ImageIcon className="w-8 h-8 text-slate-400 mx-auto mb-2" />
											<p className="text-sm text-slate-500">Click to upload custom cover</p>
										</div>
									)}
								</div>
							</div>

							<div className="space-y-1.5">
								<label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Date</label>
								<input
									type="date"
									className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-red-500 dark:text-white text-slate-600 transition-all"
									value={newSermon.date}
									onChange={e => setNewSermon({ ...newSermon, date: e.target.value })}
								/>
							</div>

							<div className="space-y-1.5">
								<label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Description</label>
								<textarea
									className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-red-500 dark:text-white placeholder:text-slate-400 transition-all min-h-[100px]"
									placeholder="Sermon summary..."
									value={newSermon.description}
									onChange={e => setNewSermon({ ...newSermon, description: e.target.value })}
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
								className="px-5 py-2.5 rounded-xl font-bold bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-500/20 transition-all hover:scale-105"
							>
								Add Sermon
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}