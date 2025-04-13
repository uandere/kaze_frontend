import React, { useState, useEffect } from "react";
import Header from "@/components/header";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { User } from "firebase/auth";
import { useRouter } from "next/router";
import { auth } from "../../firebase/firebaseConfig";

const signUp = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const HandleGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Error signing in with Google: ", err.message);
      } else {
        console.error("An unknown error occurred");
      }
    }
  };
  const HandleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Error signing out: ", err.message);
      } else {
        console.error("An unknown error occurred during sign out");
      }
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const unsubscribe = auth.onAuthStateChanged(setUser);
      return () => unsubscribe();
    }
  }, []);

  const handleNavigate = (route: string) => {
    router.push(route);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Header />
      <h1 className="">
        {!user ? (
          <div>
            <div className="w-[582px] bg-neutral-600 h-[263px] flex flex-col items-center justify-center rounded-xl">
              <h1 className="font-bold text-white text-3xl">Sign Up</h1>
              <button
                onClick={HandleGoogle}
                className="mt-4 bg-black text-white flex flex-row items-center justify-center rounded-lg px-6 py-2"
              >
                <img
                  src="image_google.svg"
                  alt="Google Icon"
                  className="w-7 h-7 mr-4"
                />
                <div className="text-xl">Sign in with Google</div>
              </button>
              <div className="flex flex-row items-center justify-center text-xl font-thin mt-10">
                <p className="text-white">Already have an account?</p>
                <button
                  className="underline text-yellow-400 ml-2"
                  onClick={() => handleNavigate("/signIn")}
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <p>Welcome, {user.displayName} from signUp</p>
            <button
              onClick={() => handleNavigate("/diia")}
              className="mt-4 bg-black text-white flex flex-row items-center justify-center rounded-lg px-6 py-2"
            >
              <div className="text-xl">diia</div>
            </button>
            <button
              onClick={HandleLogout}
              className="mt-4 bg-gray-300 text-black p-3 rounded-lg"
            >
              Logout
            </button>
          </div>
        )}
      </h1>
    </div>
  );
};

export default signUp;
