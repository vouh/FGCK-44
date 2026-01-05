"use client";

import { useState, useEffect } from "react";
import { Trash2, Phone, Mail, Clock, Loader2, CheckCircle, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  getInboxMessages,
  deleteInboxMessage,
  markMessageAsRead,
  InboxMessage,
} from "@/lib/firestore";

export default function InboxPage() {
  const [messages, setMessages] = useState<InboxMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMessages();
  }, []);

  async function loadMessages() {
    try {
      setLoading(true);
      const data = await getInboxMessages();
      setMessages(data);
    } catch (error) {
      console.error("Error loading messages:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    try {
      await deleteInboxMessage(id);
      setMessages(messages.filter((msg) => msg.id !== id));
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      await markMessageAsRead(id);
      setMessages(messages.map((msg) => (msg.id === id ? { ...msg, read: true } : msg)));
    } catch (error) {
      console.error("Error marking message as read:", error);
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Inbox</h1>
        <p className="text-slate-600 dark:text-slate-400">View and manage contact messages.</p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Sender</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Message</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Received</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500 dark:text-slate-400">
                    <div className="flex justify-center items-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Loading messages...</span>
                    </div>
                  </td>
                </tr>
              ) : messages.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500 dark:text-slate-400">
                    No messages found.
                  </td>
                </tr>
              ) : (
                messages.map((msg) => (
                  <tr
                    key={msg.id}
                    className={cn(
                      "group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors",
                      !msg.read && "bg-blue-50/30 dark:bg-blue-900/10"
                    )}
                  >
                    <td className="px-6 py-4">
                      <button
                        onClick={() => msg.id && !msg.read && handleMarkAsRead(msg.id)}
                        className="p-1"
                        title={msg.read ? "Read" : "Mark as read"}
                      >
                        {msg.read ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <Circle className="w-5 h-5 text-blue-500" />
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-sm">
                          {msg.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="font-semibold text-slate-900 dark:text-white">{msg.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1 text-sm">
                        <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                          <Mail className="w-3 h-3 text-slate-400" />
                          {msg.email}
                        </div>
                        {msg.phone && (
                          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs">
                            <Phone className="w-3 h-3" />
                            {msg.phone}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-slate-600 dark:text-slate-400 text-sm max-w-sm line-clamp-2 group-hover:line-clamp-none transition-all duration-200">
                        {msg.message}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-500 whitespace-nowrap">
                        <Clock className="w-3 h-3" />
                        {formatDate(msg.createdAt)}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => msg.id && handleDelete(msg.id)}
                        className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        title="Delete Message"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
