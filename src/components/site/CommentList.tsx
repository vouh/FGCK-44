"use client";

import { Comment } from "@/lib/firestore/types";

interface CommentListProps {
  comments: Comment[];
  isLoading?: boolean;
}

export function CommentList({ comments, isLoading = false }: CommentListProps) {
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="text-center py-4 text-slate-500 text-sm">
        Loading comments...
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <div className="text-center py-8 text-slate-500">
        <p>No comments yet. Be the first to comment!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="rounded-lg border border-slate-200 bg-slate-50 p-4"
        >
          <div className="flex items-start justify-between gap-4 mb-2">
            <div>
              <p className="font-semibold text-slate-900">{comment.authorName}</p>
              <p className="text-xs text-slate-500">{formatDate(comment.createdAt)}</p>
            </div>
          </div>
          <p className="text-slate-700 whitespace-pre-wrap">{comment.content}</p>
        </div>
      ))}
    </div>
  );
}
