"use client";

import { useState, useEffect } from "react";
import { getBlogs, Blog } from "@/lib/firestore";
import { getCommentsByBlogId, deleteComment } from "@/lib/firestore/commentService";
import { Comment } from "@/lib/firestore/types";
import { Loader2, Trash2, MessageSquare } from "lucide-react";

interface CommentWithBlog extends Comment {
  blogTitle: string;
}

export default function CommentsPage() {
  const [comments, setComments] = useState<CommentWithBlog[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    async function loadComments() {
      try {
        const blogs = await getBlogs();
        const allComments: CommentWithBlog[] = [];

        // Fetch comments for each blog
        for (const blog of blogs) {
          if (blog.id) {
            const blogComments = await getCommentsByBlogId(blog.id);
            allComments.push(
              ...blogComments.map((c) => ({
                ...c,
                blogTitle: blog.title,
              }))
            );
          }
        }

        // Sort by newest first
        allComments.sort((a, b) => b.createdAt - a.createdAt);
        setComments(allComments);
      } catch (error) {
        console.error("Error loading comments:", error);
      } finally {
        setLoading(false);
      }
    }

    loadComments();
  }, []);

  const handleDelete = async (commentId: string) => {
    if (!window.confirm("Delete this comment?")) return;

    setDeleting(commentId);
    try {
      await deleteComment(commentId);
      setComments((prev) => prev.filter((c) => c.id !== commentId));
    } catch (error) {
      console.error("Error deleting comment:", error);
      alert("Failed to delete comment");
    } finally {
      setDeleting(null);
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Comments</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          Manage and moderate {comments.length} blog comment{comments.length !== 1 ? 's' : ''}
        </p>
      </div>

      {comments.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-dashed border-slate-300 dark:border-slate-600">
          <MessageSquare className="w-10 h-10 text-slate-400 dark:text-slate-600 mb-3" />
          <p className="text-slate-600 dark:text-slate-400 font-medium">No comments yet</p>
          <p className="text-sm text-slate-500 dark:text-slate-500 mt-1">Comments from blog posts will appear here</p>
        </div>
      ) : (
        <div className="grid gap-3 sm:gap-4">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="group border border-slate-200 dark:border-slate-700 rounded-lg p-3 sm:p-4 bg-white dark:bg-slate-800 hover:shadow-md dark:hover:bg-slate-700/50 transition-all duration-200"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                <div className="flex-1 min-w-0">
                  {/* Author & Blog Info */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3 mb-2">
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white text-sm sm:text-base break-words">
                        {comment.authorName}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 sm:mt-0">
                        on <span className="font-medium truncate max-w-xs">"{comment.blogTitle}"</span>
                      </p>
                    </div>
                  </div>

                  {/* Comment Content */}
                  <p className="text-sm text-slate-700 dark:text-slate-300 mb-2 leading-relaxed break-words whitespace-pre-wrap">
                    {comment.content}
                  </p>

                  {/* Timestamp */}
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {formatDate(comment.createdAt)}
                  </p>
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => comment.id && handleDelete(comment.id)}
                  disabled={deleting === comment.id}
                  className="flex-shrink-0 flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Delete comment"
                >
                  {deleting === comment.id ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
