import {Amplify} from 'aws-amplify';
import outputs from '../../amplify_outputs.json';

import {Authenticator, ThemeProvider} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import "@/styles/globals.css";

Amplify.configure(outputs);

// @ts-ignore
export default function MyApp({Component, pageProps}) {
  return (
    <ThemeProvider>
      <Authenticator.Provider>
        <Component {...pageProps} />
      </Authenticator.Provider>
    </ThemeProvider>
  );
}
