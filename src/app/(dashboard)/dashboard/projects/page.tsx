"use client";

import { useState } from "react";
import { Plus, Trash2, Calendar, Target, Image as ImageIcon, X, Hammer } from "lucide-react";
import { cn } from "@/lib/utils";

const dummyProjects = [
	{
		id: 1,
		title: "Church Renovation",
		image: "https://placehold.co/600x300",
		deadline: "2026-03-01",
		progress: 60,
		description: "Renovating the main church hall with new seating and audio systems."
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
		if (!newProject.title) return;
		setProjects([
			...projects,
			{ ...newProject, id: Date.now() }
		]);
		setShowModal(false);
		setNewProject({ title: "", image: "", deadline: "", progress: 0, description: "" });
	};

	const handeFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setNewProject({ ...newProject, image: reader.result as string });
			};
			reader.readAsDataURL(file);
		}
	};

	return (
		<div className="space-y-8 animate-fade-in">
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
				<div>
					<h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Manage Projects</h1>
					<p className="text-slate-600 dark:text-slate-400">Track and update ongoing church projects.</p>
				</div>
				<button
					onClick={() => setShowModal(true)}
					className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-all hover:scale-105 shadow-md hover:shadow-lg"
				>
					<Plus className="w-5 h-5" />
					Add New Project
				</button>
			</div>

			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{projects.map((project) => (
					<div key={project.id} className="group relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden">
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
									<button className="text-blue-600 hover:text-blue-700 font-medium transition-colors">Edit</button>
									<button
										onClick={() => handleDelete(project.id)}
										className="text-red-500 hover:text-red-700 font-medium transition-colors"
									>
										<Trash2 className="w-4 h-4" />
									</button>
								</div>
							</div>
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
							<h2 className="text-xl font-bold text-slate-900 dark:text-white">Add New Project</h2>
							<button
								onClick={() => setShowModal(false)}
								className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors"
							>
								<X className="w-5 h-5" />
							</button>
						</div>

						<div className="p-6 overflow-y-auto space-y-4">
							<div className="space-y-1.5">
								<label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Project Title</label>
								<input
									className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-blue-500 dark:text-white placeholder:text-slate-400 transition-all"
									placeholder="e.g. New Auditorium"
									value={newProject.title}
									onChange={e => setNewProject({ ...newProject, title: e.target.value })}
								/>
							</div>

							<div className="space-y-1.5">
								<label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Project Image</label>
								<div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-4 flex flex-col items-center justify-center text-center hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer relative bg-slate-50 dark:bg-slate-800/50">
									<input
										type="file"
										accept="image/*"
										className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
										onChange={handeFileChange}
									/>
									{newProject.image ? (
										<div className="relative w-full aspect-video rounded-lg overflow-hidden">
											{/* eslint-disable-next-line @next/next/no-img-element */}
											<img src={newProject.image} alt="Preview" className="w-full h-full object-cover" />
											<div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-xs font-semibold opacity-0 hover:opacity-100 transition-opacity">
												Click to change
											</div>
										</div>
									) : (
										<div className="py-4">
											<ImageIcon className="w-8 h-8 text-slate-400 mx-auto mb-2" />
											<p className="text-sm text-slate-500">Click to upload image</p>
										</div>
									)}
								</div>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-1.5">
									<label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Deadline</label>
									<div className="relative">
										<Calendar className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
										<input
											type="date"
											className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-blue-500 dark:text-white text-slate-600 transition-all"
											value={newProject.deadline}
											onChange={e => setNewProject({ ...newProject, deadline: e.target.value })}
										/>
									</div>
								</div>
								<div className="space-y-1.5">
									<label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Progress (%)</label>
									<div className="relative">
										<Target className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
										<input
											type="number"
											min="0"
											max="100"
											className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-blue-500 dark:text-white placeholder:text-slate-400 transition-all"
											value={newProject.progress}
											onChange={e => setNewProject({ ...newProject, progress: Number(e.target.value) })}
										/>
									</div>
								</div>
							</div>

							<div className="space-y-1.5">
								<label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Description</label>
								<textarea
									className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-blue-500 dark:text-white placeholder:text-slate-400 transition-all min-h-[100px]"
									placeholder="Project details..."
									value={newProject.description}
									onChange={e => setNewProject({ ...newProject, description: e.target.value })}
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
								Add Project
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}