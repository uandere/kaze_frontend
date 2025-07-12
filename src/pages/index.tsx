import React, { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/features/landing/HeroSection";
import BestChoices from "@/components/features/property/BestChoices";
import StatsBlock from "@/components/features/landing/StatsBlock";
import PopoutWindow from "@/components/features/auth/PopoutWindow";
import { useUser } from "@/context/context";
import { checkDiiaAuth } from "@/lib/api/diia";
import TrustUs from "@/components/features/landing/TrustUs";
import Achivements from "@/components/features/landing/Achivements";
import ContactsSection from "@/components/features/landing/Contact";

const Home = () => {
  const { user } = useUser();
  const [isDiiaAuthenticated, setIsDiiaAuthenticated] = useState(false);

  useEffect(() => {
    if (user) {
      checkDiiaAuth(user).then(setIsDiiaAuthenticated).catch(console.error);
    }
  }, [user]);

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
