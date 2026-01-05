"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, X, Image as ImageIcon, Calendar, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const dummyEvents = [
	{
		id: 1,
		title: "Christmas Service",
		image: "https://placehold.co/600x300",
		date: "2025-12-25",
		description: "Join us for our Christmas service and celebration! We will have carols, prayer, and a special message."
	},
	{
		id: 2,
		title: "New Year Prayer Night",
		image: "https://placehold.co/600x300",
		date: "2025-12-31",
		description: "All-night prayer to welcome the new year. Starting at 9 PM till dawn."
	}
];

export default function EventsAdminPage() {
	const [events, setEvents] = useState(dummyEvents);
	const [showModal, setShowModal] = useState(false);
	const [newEvent, setNewEvent] = useState({
		title: "",
		image: "",
		date: "",
		description: ""
	});

	const handleDelete = (id: number) => {
		setEvents(events.filter((e) => e.id !== id));
	};

	const handleAdd = () => {
		if (!newEvent.title) return;
		setEvents([
			...events,
			{ ...newEvent, id: Date.now() }
		]);
		setShowModal(false);
		setNewEvent({ title: "", image: "", date: "", description: "" });
	};

	const handeFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setNewEvent({ ...newEvent, image: reader.result as string });
			};
			reader.readAsDataURL(file);
		}
	};

	return (
		<div className="space-y-8 animate-fade-in">
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
				<div>
					<h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Manage Events</h1>
					<p className="text-slate-600 dark:text-slate-400">Schedule and update upcoming church events.</p>
				</div>
				<button
					onClick={() => setShowModal(true)}
					className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-all hover:scale-105 shadow-md hover:shadow-lg"
				>
					<Plus className="w-5 h-5" />
					Add New Event
				</button>
			</div>

			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{events.map((event) => (
					<div key={event.id} className="group relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden">
						<div className="aspect-video w-full bg-slate-100 dark:bg-slate-800 relative overflow-hidden">
							{event.image ? (
								// eslint-disable-next-line @next/next/no-img-element
								<img
									src={event.image}
									alt={event.title}
									className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
								/>
							) : (
								<div className="w-full h-full flex items-center justify-center text-slate-400">
									<Calendar className="w-10 h-10 opacity-50" />
								</div>
							)}
							<div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold shadow-sm shadow-black/5 flex flex-col items-center leading-tight">
								<span className="text-red-500 uppercase text-[10px]">DEC</span>
								<span className="text-lg font-black text-slate-900 dark:text-white">
									{event.date ? new Date(event.date).getDate() : "00"}
								</span>
							</div>
						</div>

						<div className="p-5 flex flex-col flex-1">
							<h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 line-clamp-1">{event.title}</h3>
							<div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 mb-3">
								<Calendar className="w-3.5 h-3.5" />
								{event.date || "Date TBA"}
							</div>
							<p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-3 mb-4 flex-1">
								{event.description}
							</p>

							<div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100 dark:border-slate-800 mt-auto">
								<button className="flex-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 py-2 rounded-lg text-sm font-semibold transition-colors">
									View Details
								</button>
								<button
									onClick={() => handleDelete(event.id)}
									className="bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 p-2 rounded-lg transition-colors"
								>
									<Trash2 className="w-5 h-5" />
								</button>
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
							<h2 className="text-xl font-bold text-slate-900 dark:text-white">Add New Event</h2>
							<button
								onClick={() => setShowModal(false)}
								className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors"
							>
								<X className="w-5 h-5" />
							</button>
						</div>

						<div className="p-6 overflow-y-auto space-y-4">
							<div className="space-y-1.5">
								<label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Event Title</label>
								<input
									className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-blue-500 dark:text-white placeholder:text-slate-400 transition-all"
									placeholder="e.g. Easter Sunday"
									value={newEvent.title}
									onChange={e => setNewEvent({ ...newEvent, title: e.target.value })}
								/>
							</div>

							<div className="space-y-1.5">
								<label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Event Image</label>
								<div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-4 flex flex-col items-center justify-center text-center hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer relative bg-slate-50 dark:bg-slate-800/50">
									<input
										type="file"
										accept="image/*"
										className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
										onChange={handeFileChange}
									/>
									{newEvent.image ? (
										<div className="relative w-full aspect-video rounded-lg overflow-hidden">
											{/* eslint-disable-next-line @next/next/no-img-element */}
											<img src={newEvent.image} alt="Preview" className="w-full h-full object-cover" />
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

							<div className="space-y-1.5">
								<label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Date</label>
								<input
									type="date"
									className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-blue-500 dark:text-white text-slate-600 transition-all"
									value={newEvent.date}
									onChange={e => setNewEvent({ ...newEvent, date: e.target.value })}
								/>
							</div>

							<div className="space-y-1.5">
								<label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Description</label>
								<textarea
									className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-blue-500 dark:text-white placeholder:text-slate-400 transition-all min-h-[100px]"
									placeholder="Event details..."
									value={newEvent.description}
									onChange={e => setNewEvent({ ...newEvent, description: e.target.value })}
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
								Add Event
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}