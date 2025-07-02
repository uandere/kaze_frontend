import React, { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import FooterLegal from "@/components/layout/Footer";
import HeroSection from "@/components/features/landing/HeroSection";
import BestChoices from "@/components/features/property/BestChoices";
import StatsBlock from "@/components/features/landing/StatsBlock";
import PopoutWindow from "@/components/features/auth/PopoutWindow";
import { useUser } from "@/context/context";
import { checkDiiaAuth } from "@/lib/api/diia";

const Home = () => {
  const { user } = useUser();
  const [isDiiaAuthenticated, setIsDiiaAuthenticated] = useState(false);

  useEffect(() => {
    if (user) {
      checkDiiaAuth(user).then(setIsDiiaAuthenticated).catch(console.error);
    }
  }, [user]);

  return (
    <div className="bg-black flex flex-col">
      <Header />
      {user && !isDiiaAuthenticated && <PopoutWindow />}
      <HeroSection />
      <BestChoices />
      <StatsBlock />
      <FooterLegal />
    </div>
  );
};

export default Home;
