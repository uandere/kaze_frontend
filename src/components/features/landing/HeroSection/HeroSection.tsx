import React from "react";

const HeroSection = () => (
  <>
    <div className="bg-black h-screen md:relative">
        <div className="flex inset-0 items-center justify-center absolute">
          <img
            src="/KazeLogo.svg"
            alt="Kaze Logo"
            className="z-10 h-32 md:h-96"
          />
        </div>
        <p className="absolute z-20 text-[100px] md:text-[200px] font-bold text-white flex items-center justify-center h-screen inset-0">
          Kaze
        </p>
      </div>
      <div className="flex-col absolute bottom-20 left-0 right-0 flex justify-center text-center text-3xl md:text-6xl font-bold z-20 md:mb-20">
        <div>Rent your housing easily</div>
        <div>
          <span className="text-[#ffd700]">Without</span> real-estate agents.
        </div>
      </div>

  </>
);

export default HeroSection;
