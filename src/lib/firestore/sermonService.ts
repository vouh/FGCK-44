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
} from "firebase/firestore";
import { db } from "@/features/firebase/firebaseConfig";
import { Sermon } from "./types";
import { slugify } from "./utils";
import { COLLECTIONS } from "./collections";

const sermonsRef = collection(db, COLLECTIONS.SERMONS);

// Create a new sermon
export async function createSermon(sermon: Omit<Sermon, "id" | "createdAt" | "updatedAt">): Promise<string> {
  const now = Date.now();
  const docRef = await addDoc(sermonsRef, {
    ...sermon,
    createdAt: now,
    updatedAt: now,
  });
  return docRef.id;
}

// Get all sermons
export async function getSermons(): Promise<Sermon[]> {
  const q = query(sermonsRef, orderBy("date", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Sermon[];
}

// Get a single sermon by ID
export async function getSermonById(id: string): Promise<Sermon | null> {
  const docRef = doc(db, COLLECTIONS.SERMONS, id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Sermon;
  }
  return null;
}

// Get a sermon by slug
export async function getSermonBySlug(slug: string): Promise<Sermon | null> {
  const sermons = await getSermons();
  return sermons.find((sermon) => slugify(sermon.title) === slug) || null;
}

// Update a sermon
export async function updateSermon(id: string, updates: Partial<Omit<Sermon, "id" | "createdAt">>): Promise<void> {
  const docRef = doc(db, COLLECTIONS.SERMONS, id);
  await updateDoc(docRef, {
    ...updates,
    updatedAt: Date.now(),
  });
}

// Delete a sermon
export async function deleteSermon(id: string): Promise<void> {
  const docRef = doc(db, COLLECTIONS.SERMONS, id);
  await deleteDoc(docRef);
}

// Get recent sermons
export async function getRecentSermons(count: number = 6): Promise<Sermon[]> {
  const q = query(sermonsRef, orderBy("date", "desc"), limit(count));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Sermon[];
}
