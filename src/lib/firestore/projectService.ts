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
import { Project } from "./types";
import { slugify } from "./utils";
import { COLLECTIONS } from "./collections";

const projectsRef = collection(db, COLLECTIONS.PROJECTS);

// Create a new project
export async function createProject(project: Omit<Project, "id" | "createdAt" | "updatedAt">): Promise<string> {
  const now = Date.now();
  const docRef = await addDoc(projectsRef, {
    ...project,
    createdAt: now,
    updatedAt: now,
  });
  return docRef.id;
}

// Get all projects
export async function getProjects(): Promise<Project[]> {
  const q = query(projectsRef, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Project[];
}

// Get a single project by ID
export async function getProjectById(id: string): Promise<Project | null> {
  const docRef = doc(db, COLLECTIONS.PROJECTS, id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Project;
  }
  return null;
}

// Get a project by slug
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const projects = await getProjects();
  return projects.find((project) => slugify(project.title) === slug) || null;
}

// Update a project
export async function updateProject(id: string, updates: Partial<Omit<Project, "id" | "createdAt">>): Promise<void> {
  const docRef = doc(db, COLLECTIONS.PROJECTS, id);
  await updateDoc(docRef, {
    ...updates,
    updatedAt: Date.now(),
  });
}

// Delete a project
export async function deleteProject(id: string): Promise<void> {
  const docRef = doc(db, COLLECTIONS.PROJECTS, id);
  await deleteDoc(docRef);
}

// Get recent projects
export async function getRecentProjects(count: number = 3): Promise<Project[]> {
  const q = query(projectsRef, orderBy("createdAt", "desc"), limit(count));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Project[];
}
