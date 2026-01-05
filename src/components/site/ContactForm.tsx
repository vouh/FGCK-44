"use client";

import { useState } from "react";
import { Loader2, CheckCircle } from "lucide-react";
import { createInboxMessage } from "@/lib/firestore";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await createInboxMessage({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        message: formData.message,
      });
      setSuccess(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      console.error("Error submitting form:", err);
      setError("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm text-center">
        <div className="flex justify-center mb-4">
          <CheckCircle className="w-16 h-16 text-green-500" />
        </div>
        <h3 className="text-xl font-bold text-slate-900">Message Sent!</h3>
        <p className="mt-2 text-sm text-slate-600">Thank you for reaching out. We&apos;ll get back to you soon.</p>
        <button
          onClick={() => setSuccess(false)}
          className="mt-6 rounded-lg bg-blue-900 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-800"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <h3 className="text-xl font-bold text-slate-900">Send Us a Message</h3>
      <p className="mt-2 text-sm text-slate-600">We&apos;ll get back to you as soon as possible.</p>

      {error && (
        <div className="mt-4 p-3 rounded-lg bg-red-50 text-red-600 text-sm">
          {error}
        </div>
      )}

      <div className="mt-6 space-y-5">
        <div>
          <label className="block text-sm font-semibold text-slate-700">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            placeholder="Your name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            placeholder="you@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700">Phone (optional)</label>
          <input
            type="tel"
            className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            placeholder="+254 7XX XXX XXX"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            className="mt-2 min-h-32 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            placeholder="How can we help you?"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-blue-900 py-3 text-sm font-bold text-white transition hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          {loading ? "Sending..." : "Send Message"}
        </button>
      </div>
    </form>
  );
}
