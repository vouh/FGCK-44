"use client";

import {
  collection,
  doc,
  addDoc,
  getDocs,
  deleteDoc,
  query,
  where,
  orderBy,
  writeBatch,
} from "firebase/firestore";
import { db } from "@/features/firebase/firebaseConfig";
import { Comment } from "./types";
import { COLLECTIONS } from "./collections";

const commentsRef = collection(db, COLLECTIONS.COMMENTS);

// Add a new comment
export async function addComment(
  blogId: string,
  content: string,
  authorName?: string
): Promise<string> {
  // Validate content length
  if (content.length > 200) {
    throw new Error("Comment is too long");
  }
  if (!content.trim()) {
    throw new Error("Comment cannot be empty");
  }

  const now = Date.now();
  const docRef = await addDoc(commentsRef, {
    blogId,
    content,
    authorName: authorName?.trim() || "Anonymous",
    createdAt: now,
    updatedAt: now,
  });
  return docRef.id;
}

// Get all comments for a blog, ordered by creation date (oldest first)
export async function getCommentsByBlogId(blogId: string): Promise<Comment[]> {
  const q = query(
    commentsRef,
    where("blogId", "==", blogId),
    orderBy("createdAt", "asc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Comment[];
}

// Delete a single comment
export async function deleteComment(id: string): Promise<void> {
  const docRef = doc(db, COLLECTIONS.COMMENTS, id);
  await deleteDoc(docRef);
}

// Delete all comments for a blog (cascade delete)
export async function deleteCommentsByBlogId(blogId: string): Promise<void> {
  const q = query(commentsRef, where("blogId", "==", blogId));
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    return; // No comments to delete
  }

  const batch = writeBatch(db);
  snapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });

  await batch.commit();
}
