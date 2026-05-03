import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Log for debugging (only in development or if you need to see what's happening)
if (typeof window !== "undefined") {
  console.log("Initializing Firebase with Key:", firebaseConfig.apiKey ? "PRESENT" : "MISSING");
}

let app: any;
try {
  app = (typeof window !== "undefined" && firebaseConfig.apiKey) 
    ? (!getApps().length ? initializeApp(firebaseConfig) : getApp())
    : null;
} catch (e) {
  console.error("Firebase App Init Error:", e);
  app = null;
}

const auth = app ? getAuth(app) : null;
const db = app ? getFirestore(app) : null;
const googleProvider = new GoogleAuthProvider();

let analytics: any = null;
if (typeof window !== "undefined" && app) {
  isSupported().then((supported) => {
    if (supported && firebaseConfig.measurementId) {
      try {
        analytics = getAnalytics(app);
      } catch (e) {
        // Silently ignore analytics failures
      }
    }
  });
}

// Export the functions directly from Firebase so they are guaranteed to be the right versions
export { 
  app, 
  auth, 
  db, 
  googleProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged 
};
