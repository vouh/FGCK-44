"use client";

import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? "AIzaSyDUilPMCxN0TKAlm95e6nCFbIeGyGqeTF0",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? "fgck44-a89a0.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "fgck44-a89a0",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? "fgck44-a89a0.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? "93588370898",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? "1:93588370898:web:b5dc3735525a12485c040b",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID ?? "G-H0VBR1Z7HQ",
};

function isConfigured() {
  return Boolean(
    firebaseConfig.apiKey &&
      firebaseConfig.authDomain &&
      firebaseConfig.projectId &&
      firebaseConfig.storageBucket &&
      firebaseConfig.messagingSenderId &&
      firebaseConfig.appId,
  );
}

export const firebaseConfigured = isConfigured();

export function getFirebaseApp() {
  if (!firebaseConfigured) return null;
  if (getApps().length) return getApp();
  return initializeApp(firebaseConfig);
}

export function getClientAuth() {
  const app = getFirebaseApp();
  if (!app) return null;
  return getAuth(app);
}
