"use client";

import { useState } from "react";
import { addComment } from "@/lib/firestore/commentService";
import { Loader2 } from "lucide-react";

interface CommentFormProps {
  blogId: string;
  onCommentAdded?: () => void;
}

export function CommentForm({ blogId, onCommentAdded }: CommentFormProps) {
  const [authorName, setAuthorName] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!content.trim()) {
      setError("Please write a comment");
      return;
    }

    setIsLoading(true);
    try {
      await addComment(blogId, content.trim(), authorName.trim());
      setAuthorName("");
      setContent("");
      setSuccess(true);
      onCommentAdded?.();

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to add comment. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <input
          type="text"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          placeholder="Your name (optional)"
          maxLength={100}
          disabled={isLoading}
          className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-slate-50 disabled:text-slate-500"
        />
      </div>

      <div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Share your thoughts..."
          maxLength={200}
          rows={3}
          disabled={isLoading}
          className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-slate-50 disabled:text-slate-500 resize-none"
        />
      </div>

      {error && (
        <div className="p-2 bg-red-50 border border-red-200 rounded text-xs text-red-700">
          {error}
        </div>
      )}

      {success && (
        <div className="p-2 bg-green-50 border border-green-200 rounded text-xs text-green-700">
          Comment posted!
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading || !content.trim()}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold py-2 text-sm rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-3 h-3 animate-spin" />
            Posting...
          </>
        ) : (
          "Post"
        )}
      </button>
    </form>
  );
}
