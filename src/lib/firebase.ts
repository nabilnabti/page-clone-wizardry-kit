
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDX9CdSlVPg-KGQi84inmCE2ucdoq7IK1k",
  authDomain: "colive-a8a2b.firebaseapp.com",
  projectId: "colive-a8a2b",
  storageBucket: "colive-a8a2b.appspot.com",
  messagingSenderId: "505821964760",
  appId: "1:505821964760:web:15527e6f32781e71332aad"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
