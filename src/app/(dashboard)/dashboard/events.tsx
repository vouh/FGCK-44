"use client";

import { useState } from "react";

const dummyEvents = [
  {
    id: 1,
    title: "Christmas Service",
    image: "https://placehold.co/600x300",
    date: "2025-12-25",
    description: "Join us for our Christmas service and celebration!"
  },
  {
    id: 2,
    title: "New Year Prayer Night",
    image: "https://placehold.co/600x300",
    date: "2025-12-31",
    description: "All-night prayer to welcome the new year."
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
    setEvents([
      ...events,
      { ...newEvent, id: Date.now() }
    ]);
    setShowModal(false);
    setNewEvent({ title: "", image: "", date: "", description: "" });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-black text-blue-950">Manage Events</h1>
        <button className="bg-blue-900 text-white px-4 py-2 rounded-lg font-bold" onClick={() => setShowModal(true)}>
          Add New Event
        </button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <div key={event.id} className="rounded-xl border bg-white p-4 shadow-sm flex flex-col gap-2">
            <img src={event.image} alt={event.title} className="rounded-lg h-40 object-cover mb-2" />
            <div className="font-bold text-lg">{event.title}</div>
            <div className="text-slate-500 text-xs mb-2">{event.date}</div>
            <div className="text-sm mb-2 line-clamp-3">{event.description}</div>
            <div className="flex gap-2 mt-auto">
              <button className="bg-yellow-100 text-yellow-900 px-3 py-1 rounded font-bold text-xs">Edit</button>
              <button className="bg-red-100 text-red-900 px-3 py-1 rounded font-bold text-xs" onClick={() => handleDelete(event.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 w-full max-w-md shadow-lg">
            <h2 className="text-xl font-bold mb-4">Add New Event</h2>
            <input className="w-full border rounded-lg px-3 py-2 mb-2" placeholder="Title" value={newEvent.title} onChange={e => setNewEvent({ ...newEvent, title: e.target.value })} />
            <input className="w-full border rounded-lg px-3 py-2 mb-2" placeholder="Image URL" value={newEvent.image} onChange={e => setNewEvent({ ...newEvent, image: e.target.value })} />
            <input className="w-full border rounded-lg px-3 py-2 mb-2" placeholder="Date" type="date" value={newEvent.date} onChange={e => setNewEvent({ ...newEvent, date: e.target.value })} />
            <textarea className="w-full border rounded-lg px-3 py-2 mb-2" placeholder="Description" rows={3} value={newEvent.description} onChange={e => setNewEvent({ ...newEvent, description: e.target.value })} />
            <div className="flex gap-2 justify-end mt-2">
              <button className="bg-slate-100 px-4 py-2 rounded" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="bg-blue-900 text-white px-4 py-2 rounded font-bold" onClick={handleAdd}>Add Event</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
