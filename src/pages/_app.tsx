import { UserProvider } from "@/context/context"; // Import your UserProvider
import { AppProps } from "next/app"; // Import AppProps type from Next.js
import "@/styles/globals.css"; // Import global styles

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
