"use client";

import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  limit,
  where,
} from "firebase/firestore";
import { db } from "@/features/firebase/firebaseConfig";
import { Blog } from "./types";
import { COLLECTIONS } from "./collections";

const blogsRef = collection(db, COLLECTIONS.BLOGS);

// Create a new blog post
export async function createBlog(blog: Omit<Blog, "id" | "createdAt" | "updatedAt">): Promise<string> {
  const now = Date.now();
  const docRef = await addDoc(blogsRef, {
    ...blog,
    createdAt: now,
    updatedAt: now,
  });
  return docRef.id;
}

// Get all blog posts
export async function getBlogs(): Promise<Blog[]> {
  const q = query(blogsRef, orderBy("date", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Blog[];
}

// Get a single blog post by ID
export async function getBlogById(id: string): Promise<Blog | null> {
  const docRef = doc(db, COLLECTIONS.BLOGS, id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Blog;
  }
  return null;
}

// Get a blog by slug (title converted to slug)
export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  const blogs = await getBlogs();
  return blogs.find((blog) => slugify(blog.title) === slug) || null;
}

// Update a blog post
export async function updateBlog(id: string, updates: Partial<Omit<Blog, "id" | "createdAt">>): Promise<void> {
  const docRef = doc(db, COLLECTIONS.BLOGS, id);
  await updateDoc(docRef, {
    ...updates,
    updatedAt: Date.now(),
  });
}

// Delete a blog post
export async function deleteBlog(id: string): Promise<void> {
  const docRef = doc(db, COLLECTIONS.BLOGS, id);
  await deleteDoc(docRef);
}

// Get recent blogs for homepage
export async function getRecentBlogs(count: number = 3): Promise<Blog[]> {
  const q = query(blogsRef, orderBy("date", "desc"), limit(count));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Blog[];
}

// Utility function to create slug from title
export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
