import React from "react";
import { signInWithRedirect, signOut } from "@aws-amplify/auth";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useRouter } from "next/router";
import Header from "@/components/header";

const SignUp = () => {
  const { user } = useAuthenticator((c) => [c.user]);
  const router = useRouter();
  const nav = (p: string) => router.push(p);

  const handleGoogle = () => signInWithRedirect({ provider: "Google" });
  const handleLogout = () => signOut();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Header />
      {!user ? (
        <div className="w-[582px] bg-neutral-600 h-[263px] flex flex-col items-center justify-center rounded-xl">
          <h1 className="font-bold text-white text-3xl">Sign Up</h1>
          <button
            onClick={handleGoogle}
            className="mt-4 bg-black text-white flex flex-row items-center justify-center rounded-lg px-6 py-2"
          >
            <img src="image_google.svg" alt="Google Icon" className="w-7 h-7 mr-4" />
            <div className="text-xl">Sign up with Google</div>
          </button>
          <div className="flex flex-row items-center justify-center text-xl font-thin mt-10">
            <p className="text-white">Already have an account?</p>
            <button className="underline text-yellow-400 ml-2" onClick={() => nav("/signIn")}>
              Sign In
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-10">
          <p className="text-2xl">Welcome, {user.username}</p>
          <button
            onClick={() => nav("/diiaAuth")}
            className="mt-4 bg-black text-white flex flex-row items-center justify-center rounded-lg px-6 py-2"
          >
            <div className="text-xl">diia</div>
          </button>
          <button
            onClick={handleLogout}
            className="mt-4 bg-gray-300 text-black p-3 rounded-lg"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default SignUp;
