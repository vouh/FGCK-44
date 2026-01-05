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
import { Event } from "./types";
import { COLLECTIONS } from "./collections";

const eventsRef = collection(db, COLLECTIONS.EVENTS);

// Create a new event
export async function createEvent(event: Omit<Event, "id" | "createdAt" | "updatedAt">): Promise<string> {
  const now = Date.now();
  const docRef = await addDoc(eventsRef, {
    ...event,
    createdAt: now,
    updatedAt: now,
  });
  return docRef.id;
}

// Get all events
export async function getEvents(): Promise<Event[]> {
  const q = query(eventsRef, orderBy("date", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Event[];
}

// Get upcoming events
export async function getUpcomingEvents(count: number = 6): Promise<Event[]> {
  const today = new Date().toISOString().split("T")[0];
  const q = query(eventsRef, where("date", ">=", today), orderBy("date", "asc"), limit(count));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Event[];
}

// Get a single event by ID
export async function getEventById(id: string): Promise<Event | null> {
  const docRef = doc(db, COLLECTIONS.EVENTS, id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Event;
  }
  return null;
}

// Update an event
export async function updateEvent(id: string, updates: Partial<Omit<Event, "id" | "createdAt">>): Promise<void> {
  const docRef = doc(db, COLLECTIONS.EVENTS, id);
  await updateDoc(docRef, {
    ...updates,
    updatedAt: Date.now(),
  });
}

// Delete an event
export async function deleteEvent(id: string): Promise<void> {
  const docRef = doc(db, COLLECTIONS.EVENTS, id);
  await deleteDoc(docRef);
}

// Get recent events
export async function getRecentEvents(count: number = 3): Promise<Event[]> {
  const q = query(eventsRef, orderBy("date", "desc"), limit(count));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Event[];
}
