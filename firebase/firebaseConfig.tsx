import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut  } from "firebase/auth";
import { getFirestore,  collection, addDoc, query, orderBy, onSnapshot, serverTimestamp  } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBVGbMD3oScLkBQdjrj38lZqwGPm9UfsTU",
  authDomain: "kaze-frontend.firebaseapp.com",
  projectId: "kaze-frontend",
  storageBucket: "kaze-frontend.firebasestorage.app",
  messagingSenderId: "532287761589",
  appId: "1:532287761589:web:337f389774f6b41511a2fc"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export const storage = getStorage(app);
export { db };
export default app;
export {provider, signInWithPopup, signOut, collection, addDoc, query, orderBy, onSnapshot, serverTimestamp };
