import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAVcj8l0u_xsAXvVyjE-TwkcyD7YD30wJk",
  authDomain: "kaze-frontend.firebaseapp.com",
  projectId: "kaze-frontend",
  storageBucket: "kaze-frontend.firebasestorage.app",
  messagingSenderId: "532287761589",
  appId: "1:532287761589:web:337f389774f6b41511a2fc",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default app;
