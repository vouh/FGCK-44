// src/features/firebase/firebaseConfig.ts
// Firebase configuration and initialization for FGCK-44
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDUilPMCxN0TKAlm95e6nCFbIeGyGqeTF0",
  authDomain: "fgck44-a89a0.firebaseapp.com",
  projectId: "fgck44-a89a0",
  storageBucket: "fgck44-a89a0.appspot.com",
  messagingSenderId: "93588370898",
  appId: "1:93588370898:web:b5dc3735525a12485c040b",
  measurementId: "G-H0VBR1Z7HQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = typeof window !== "undefined" ? getAnalytics(app) : undefined;
const db = getFirestore(app);

export { app, analytics, db };