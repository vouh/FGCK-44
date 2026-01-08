import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "@/features/firebase/firebaseConfig";
import { COLLECTIONS } from "./collections";
import { Blog, Event, Project, Sermon } from "./types";
import { slugify } from "./utils";

// Helper to fetch all matches then filter (since slug is computed)
// In a refined implementation, slugs should be stored in the DB.
async function findBySlug<T extends { title: string }>(collectionName: string, slug: string): Promise<T | null> {
  try {
     const querySnapshot = await getDocs(collection(db, collectionName));
     const found = querySnapshot.docs.find(doc => slugify(doc.data().title) === slug);
     if (found) {
        return { id: found.id, ...found.data() } as unknown as T;
     }
     return null;
  } catch (e) {
      console.error(`Error fetching ${collectionName} for metadata:`, e);
      return null;
  }
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
    return findBySlug<Blog>(COLLECTIONS.BLOGS, slug);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
    return findBySlug<Project>(COLLECTIONS.PROJECTS, slug);
}

export async function getSermonBySlug(slug: string): Promise<Sermon | null> {
    return findBySlug<Sermon>(COLLECTIONS.SERMONS, slug);
}

export async function getEventById(id: string): Promise<Event | null> {
    try {
        const docRef = doc(db, COLLECTIONS.EVENTS, id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } as unknown as Event;
        }
    } catch (e) {
        console.error("Error fetching event for metadata:", e);
    }
    return null;
}
