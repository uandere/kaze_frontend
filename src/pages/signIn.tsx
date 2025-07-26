import React, { useEffect } from "react";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import { useRouter } from "next/router";

const SignIn = () => {
  const { authStatus } = useAuthenticator();
  const router = useRouter();

  useEffect(() => {
    if (authStatus === "authenticated") {
      router.replace("/");
    }
  }, [authStatus, router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Authenticator socialProviders={["google"]} />
    </div>
  );
};

export default SignIn;