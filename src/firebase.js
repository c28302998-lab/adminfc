import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAFlGoOsxQoWDJBUEE2Oxn8SJOWery5j4o",
  authDomain: "fcgb-785c2.firebaseapp.com",
  projectId: "fcgb-785c2",
  storageBucket: "fcgb-785c2.firebasestorage.app",
  messagingSenderId: "1068382030353",
  appId: "1:1068382030353:web:4b786992aa2161b6297fb0",
  measurementId: "G-7X2X25S3EC"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
