import React, { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/features/landing/HeroSection";
import PopoutWindow from "@/components/features/auth/PopoutWindow";
import { checkDiiaAuth } from "@/lib/api/diia";
import TrustUs from "@/components/features/landing/TrustUs";
import Achivements from "@/components/features/landing/Achivements";
import ContactsSection from "@/components/features/landing/Contact";
import {useAuthenticator} from "@aws-amplify/ui-react";

const Home = () => {
  const [isDiiaAuthenticated, setIsDiiaAuthenticated] = useState(false);

  const { authStatus, user } =
    useAuthenticator(ctx => [ctx.authStatus, ctx.user]);

  useEffect(() => {
    if (authStatus === 'authenticated') {
      console.log('Signed‑in user:', user);
      checkDiiaAuth()
        .then(setIsDiiaAuthenticated)
        .catch(console.error);
    }
  }, [authStatus, user]);

  return (
    <div>
      <Header />
      {user && !isDiiaAuthenticated && (
        <PopoutWindow
          title="Looks like you didn’t complete your registration"
          text="Please, finish it to have full experience ❤️"
        />
      )}
      <HeroSection />
      <TrustUs/>
      <Achivements/>
      <ContactsSection/>
      <Footer />
    </div>
  );
};

export default Home;
