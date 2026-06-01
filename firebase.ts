import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import firebaseConfig from "./firebase-applet-config.json";

// Guard: Check if we have real Firebase configuration keys
export const isFirebaseConfigured = !!(
  firebaseConfig &&
  firebaseConfig.apiKey &&
  firebaseConfig.apiKey !== "" &&
  firebaseConfig.projectId
);

let firebaseApp;
let firebaseAuth: any = null;
let firebaseDb: any = null;

if (isFirebaseConfigured) {
  try {
    firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    firebaseAuth = getAuth(firebaseApp);
    firebaseDb = getFirestore(firebaseApp, firebaseConfig.firestoreDatabaseId || undefined);
  } catch (error) {
    console.error("Firebase Initialization failed, using local fallback state:", error);
  }
}

export { firebaseAuth as auth, firebaseDb as db };
