"use client";

import { useState } from "react";

const dummySermons = [
  {
    id: 1,
    title: "Sunday Service",
    description: "Watch our latest Sunday service.",
    youtube: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    date: "2025-12-21"
  },
  {
    id: 2,
    title: "Christmas Message",
    description: "Special Christmas sermon.",
    youtube: "https://www.youtube.com/watch?v=3GwjfUFyY6M",
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
    date: ""
  });

  const handleDelete = (id: number) => {
    setSermons(sermons.filter((s) => s.id !== id));
  };

  const handleAdd = () => {
    setSermons([
      ...sermons,
      { ...newSermon, id: Date.now() }
    ]);
    setShowModal(false);
    setNewSermon({ title: "", description: "", youtube: "", date: "" });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-black text-blue-950">Manage Sermons</h1>
        <button className="bg-blue-900 text-white px-4 py-2 rounded-lg font-bold" onClick={() => setShowModal(true)}>
          Add New Sermon
        </button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sermons.map((sermon) => {
          const videoId = getYoutubeId(sermon.youtube);
          return (
            <div key={sermon.id} className="rounded-xl border bg-white p-4 shadow-sm flex flex-col gap-2">
              {videoId ? (
                <iframe
                  className="rounded-lg w-full h-40 mb-2"
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title={sermon.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="rounded-lg h-40 bg-slate-100 flex items-center justify-center mb-2">No Video</div>
              )}
              <div className="font-bold text-lg">{sermon.title}</div>
              <div className="text-slate-500 text-xs mb-2">{sermon.date}</div>
              <div className="text-sm mb-2 line-clamp-3">{sermon.description}</div>
              <div className="flex gap-2 mt-auto">
                <button className="bg-yellow-100 text-yellow-900 px-3 py-1 rounded font-bold text-xs">Edit</button>
                <button className="bg-red-100 text-red-900 px-3 py-1 rounded font-bold text-xs" onClick={() => handleDelete(sermon.id)}>Delete</button>
              </div>
            </div>
          );
        })}
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 w-full max-w-md shadow-lg">
            <h2 className="text-xl font-bold mb-4">Add New Sermon</h2>
            <input className="w-full border rounded-lg px-3 py-2 mb-2" placeholder="Title" value={newSermon.title} onChange={e => setNewSermon({ ...newSermon, title: e.target.value })} />
            <input className="w-full border rounded-lg px-3 py-2 mb-2" placeholder="YouTube Link" value={newSermon.youtube} onChange={e => setNewSermon({ ...newSermon, youtube: e.target.value })} />
            <input className="w-full border rounded-lg px-3 py-2 mb-2" placeholder="Date" type="date" value={newSermon.date} onChange={e => setNewSermon({ ...newSermon, date: e.target.value })} />
            <textarea className="w-full border rounded-lg px-3 py-2 mb-2" placeholder="Description" rows={3} value={newSermon.description} onChange={e => setNewSermon({ ...newSermon, description: e.target.value })} />
            <div className="flex gap-2 justify-end mt-2">
              <button className="bg-slate-100 px-4 py-2 rounded" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="bg-blue-900 text-white px-4 py-2 rounded font-bold" onClick={handleAdd}>Add Sermon</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
