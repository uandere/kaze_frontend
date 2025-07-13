import React from "react";
import Button from "@/components/layout/Button";

const HeroSection = () => (
  <section className="relative w-screen overflow-hidden">
    <img
      src="/HeroBackground.svg"
      alt="Hero background"
      className="w-screen h-auto object-contain"
    />

    <div className="absolute top-0 left-0 w-full h-full px-16 text-white">
      <h1 className="unbounded-custom text-[7rem] mt-64 leading-none m-0">
        RENT WITHOUT
      </h1>
      <h1 className="unbounded-custom text-[7rem] text-right leading-none m-0">
        REAL-ESTATE AGENTS
      </h1>
      <p className="font-nunito font-thin mt-24 text-4xl">Forget about realtor fees, constant phone<br/> calls and tedious paperwork. Meet<br/> renting done right!</p>
      <Button
            text="START RENTING NOW"
            className="unbounded-custom px-15 py-5 bg-gradient-to-r from-[#FCBF29] to-[#ED8F03] rounded-xl text-2xl mt-8"
          />
    </div>
  </section>
);

export default HeroSection;
