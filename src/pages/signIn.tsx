import React, { useState, useEffect } from "react";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { User } from "firebase/auth";
import { useRouter } from "next/router";
import Header from "@/components/header";

const SignIn = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const HandleGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);

      router.push("/diiaAuth");
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
      {!user ? (
        <div className="w-[582px] bg-neutral-600 h-[263px] flex flex-col items-center justify-center rounded-xl">
          <h1 className="font-bold text-white text-3xl">Sign In</h1>
          <div>
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
              <p className="text-white">Don’t have an account?</p>
              <button
                className="underline text-[#ffd700] ml-2"
                onClick={() => handleNavigate("/signUp")}
              >
                Sign up
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-10">
          <h1 className="text-4xl font-bold">
            Next, verify your profile using Diia
          </h1>
          <h2 className="text-4xl font-thin">
            ... so that we can do everything to make your rent easier 👌
          </h2>
          <button
            onClick={() => handleNavigate("/diiaAuth")}
            className="mt-4 text-2xl bg-[#131314] text-white p-1 rounded-lg flex flex-row items-center justify-center gap-10 px-16 border"
          >
            <img src="/diiaStroke.svg" width={"24px"} />
            Verificate using Diia
          </button>
          <button className="text-[#ffd700] underline text-xl" onClick={()=>handleNavigate("/")}>No, take me to the home page</button>
          <button
            onClick={HandleLogout}
            className="mt-4 text-gray-300  p-3 rounded-lg underline"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default SignIn;
