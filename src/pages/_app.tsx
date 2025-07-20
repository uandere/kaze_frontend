// src/pages/_app.tsx
import { Amplify } from "@aws-amplify/core";
import outputs from "../../amplify_outputs.json";

import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import { AuthProvider }  from "@/context/auth";
import { UserProvider }  from "@/context/context";

import type { AppProps } from "next/app";
import "@/styles/globals.css";

Amplify.configure(outputs);

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Authenticator.Provider>
      <UserProvider>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </UserProvider>
    </Authenticator.Provider>
  );
}
