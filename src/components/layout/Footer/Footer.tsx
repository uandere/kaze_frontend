import React from "react";

const Footer = () => (
  <>
    <div className="flex justify-center items-center flex-col my-12 md:my-48 text-4xl md:text-6xl font-bold text-center">
      <p className="text-white font-bold bg-black px-6 text-[50px] md:text-[60px]">
        Your <span className="text-[#ffd700]">key</span> to better renting
      </p>
      <img
        src="/KazeLogo.svg"
        alt="Kaze Logo"
        className="z-10 h-32 md:h-96 mt-8 md:hidden`"
      />
    </div>
    <footer className="text-white font-thin flex justify-between px-[104px] my-8">
      <p>Copyright © 2025 Kaze Inc.</p>
      <div className="flex gap-14">
        <p>Privacy Policy</p>
        <p>Terms of Use</p>
        <p>Sales and Refunds</p>
        <p>Legal Site</p>
        <p>Map</p>
      </div>
    </footer>
  </>
);

export default Footer;
