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
  where,
} from "firebase/firestore";
import { db } from "@/features/firebase/firebaseConfig";
import { InboxMessage } from "./types";
import { COLLECTIONS } from "./collections";

const inboxRef = collection(db, COLLECTIONS.INBOX);

// Create a new inbox message (from contact form)
export async function createInboxMessage(message: Omit<InboxMessage, "id" | "createdAt" | "read">): Promise<string> {
  const docRef = await addDoc(inboxRef, {
    ...message,
    createdAt: Date.now(),
    read: false,
  });
  return docRef.id;
}

// Get all inbox messages
export async function getInboxMessages(): Promise<InboxMessage[]> {
  const q = query(inboxRef, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as InboxMessage[];
}

// Get unread messages
export async function getUnreadMessages(): Promise<InboxMessage[]> {
  const q = query(inboxRef, where("read", "==", false), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as InboxMessage[];
}

// Get a single message by ID
export async function getInboxMessageById(id: string): Promise<InboxMessage | null> {
  const docRef = doc(db, COLLECTIONS.INBOX, id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as InboxMessage;
  }
  return null;
}

// Mark message as read
export async function markMessageAsRead(id: string): Promise<void> {
  const docRef = doc(db, COLLECTIONS.INBOX, id);
  await updateDoc(docRef, { read: true });
}

// Delete a message
export async function deleteInboxMessage(id: string): Promise<void> {
  const docRef = doc(db, COLLECTIONS.INBOX, id);
  await deleteDoc(docRef);
}

// Get unread count
export async function getUnreadCount(): Promise<number> {
  const messages = await getUnreadMessages();
  return messages.length;
}
