import { useEffect, useState } from "react";

interface Message {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  createdAt: string;
}

export default function InboxPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with real API call or data fetch
    setTimeout(() => {
      setMessages([
        {
          id: "1",
          name: "Jane Doe",
          email: "jane@example.com",
          phone: "+254 712 345 678",
          message: "How can I join your church?",
          createdAt: "2025-12-23 10:00",
        },
        {
          id: "2",
          name: "John Smith",
          email: "john@example.com",
          message: "I would like to volunteer.",
          createdAt: "2025-12-22 15:30",
        },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  const handleDelete = (id: string) => {
    setMessages((msgs) => msgs.filter((msg) => msg.id !== id));
  };

  return (
    <div className="space-y-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-blue-950 mb-1">Inbox</h1>
          <p className="text-slate-600">View and manage contact messages.</p>
        </div>
      </div>
      <div className="overflow-x-auto rounded-2xl border border-blue-900/10 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-blue-100">
          <thead className="bg-blue-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-bold text-blue-900 uppercase">Name</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-blue-900 uppercase">Email</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-blue-900 uppercase">Phone</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-blue-900 uppercase">Message</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-blue-900 uppercase">Received</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-blue-50">
            {loading ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-slate-400">Loading...</td>
              </tr>
            ) : messages.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-slate-400">No messages found.</td>
              </tr>
            ) : (
              messages.map((msg) => (
                <tr key={msg.id} className="hover:bg-blue-50/40 transition">
                  <td className="px-4 py-3 font-semibold text-blue-950">{msg.name}</td>
                  <td className="px-4 py-3 text-blue-900">{msg.email}</td>
                  <td className="px-4 py-3 text-blue-900">{msg.phone || <span className='text-slate-400'>—</span>}</td>
                  <td className="px-4 py-3 text-slate-700 max-w-xs truncate">{msg.message}</td>
                  <td className="px-4 py-3 text-xs text-slate-500">{msg.createdAt}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleDelete(msg.id)}
                      className="rounded-md bg-red-50 px-3 py-1.5 text-xs font-bold text-red-700 hover:bg-red-100 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
