import { UserProvider } from "@/context/context"; // Import your UserProvider
import { AppProps } from "next/app"; // Import AppProps type from Next.js
import "@/styles/globals.css"; // Import global styles
import { IntlWrapper } from "@/components/IntlWraper";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <IntlWrapper>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </IntlWrapper>
  );
}

export default MyApp;
