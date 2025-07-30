import React from "react";

const Footer = () => (
  <>
    <div className="unbounded-custom text-4xl sm:text-6xl lg:text-8xl px-6 sm:px-12 lg:px-30 py-24 sm:py-48 lg:py-96 space-y-4">
      <div className="text-left">RENTA —<br className="md:hidden"/> YOUR <span className="text-[#F59E0B]">KEY</span></div>
      <div className="text-right sm:text-right">TO BETTER RENTING</div>
    </div>
    <footer className="text-white font-thin flex flex-col lg:flex-row justify-between px-6 sm:px-12 lg:px-[104px] gap-6 lg:gap-0 my-8 text-sm sm:text-base">
      <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center lg:justify-start">
        <p>Privacy Policy</p>
        <p>Terms of Use</p>
        <p>Sales and Refunds</p>
        <p>Legal Site</p>
        <p>Map</p>
      </div>
      <p className="text-center lg:text-right">© 2025 Renta Inc. All rights reserved.</p>
    </footer>
  </>
);

export default Footer;
