// src/pages/_app.tsx
import { Amplify } from 'aws-amplify';        // ← correct package
import outputs from '../../amplify_outputs.json';

import { Authenticator, ThemeProvider } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import "@/styles/globals.css";

Amplify.configure(outputs);                  // ← now Auth sees the config

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Authenticator.Provider>               {/* keeps auth context everywhere */}
        <Component {...pageProps} />
      </Authenticator.Provider>
    </ThemeProvider>
  );
}
