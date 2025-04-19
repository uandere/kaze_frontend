import React from "react";
//import Footer from "@/components/footer/footer";
import Header from "@/components/header";
import PropertyCard from "@/components/estateCard";
import { useUser } from "@/context/context";
import PopoutWindow from "@/components/popout";
import { useState, useEffect } from "react";
//import MobileSidebar from "@/components/mobileHeader";
import data from "../../public/data.json"; // Adjust the path as necessary

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => setIsMobile(window.innerWidth < breakpoint);
      handleResize(); // Set initial value

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [breakpoint]);

  return isMobile;
}

const Index = () => {
  const { user,  diiaAuth } = useUser();
  const isMobile = useIsMobile();

  return (
    <div className="overflow-x-hidden bg-black flex justify-center flex-col">
      {/* Header or Mobile Sidebar */}
      {/* {!isMobile ? <Header /> : <MobileSidebar />} */}
      <Header/>
      {!diiaAuth ? <PopoutWindow /> : null}

      {/* Main Content */}
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

      {/* Tagline */}
      <div className="flex-col absolute bottom-20 left-0 right-0 flex justify-center text-center text-3xl md:text-6xl font-bold z-20 md:mb-20">
        <div>Rent your housing easily</div>
        <div>
          <span className="text-[#ffd700]">Without</span> real-estate agents.
        </div>
      </div>

      {/* Best Choices Section */}
      <div className="bg-black pb-10">
        <p className="font-bold text-4xl md:text-6xl text-white flex justify-center">
          Best choices right now
        </p>
        <div className="flex justify-center mt-5">
          <div
            style={{
              width: "300px", // Adjusted for mobile view
              height: "10px",
              backgroundColor: "gold",
              justifyContent: "center",
              display: "flex",
              borderRadius: "5px",
            }}
          />
        </div>
        <div className="flex justify-center my-10 mx-4">
          {/* <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <PropertyCard propertyData={data} />
            <PropertyCard propertyData={data} />
            <PropertyCard propertyData={data} />
            <PropertyCard propertyData={data} />
          </div> */}
        </div>
        <div className="flex justify-center">
          <div
            style={{
              width: "300px", // Adjusted for mobile view
              height: "10px",
              backgroundColor: "gold",
              justifyContent: "center",
              display: "flex",
              borderRadius: "5px",
            }}
          />
        </div>
      </div>

      {/* Stats Section */}
      <div className="flex flex-col justify-center items-center bg-black text-white md:my-36 px-5">
        <div className="text-4xl md:text-6xl font-bold mb-10">
          Kaze in numbers
        </div>
        <div className="flex flex-col md:flex-row md:flex-wrap md:justify-center gap-11">
          <div className="m-0 flex flex-col md:justify-center bg-gray-500 items-start md:bg-transparent p-8 md:p-0 rounded-lg">
            <p className="font-bold text-[#ffd700] text-4xl md:text-6xl m-0">
              2K
            </p>
            <p className="font-bold m-0 text-3xl md:text-4xl">
              rental agreements <br /> signed in 2025
            </p>
          </div>
          <div className="w-[10px] h-[300px] bg-yellow-500 justify-center rounded-[5px] hidden md:block" />
          <div className="flex flex-col justify-between h-full ">
            <div className="flex flex-col mb-5 bg-gray-500 justify-start md:bg-transparent p-8 md:p-0 rounded-lg">
              <p className="text-5xl md:text-6xl m-0 font-bold">10000</p>
              <p className="font-thin text-3xl md:text-4xl">
                active users on the <br /> website
              </p>
            </div>
            <div className="flex flex-col mt-6 bg-gray-500 justify-start md:bg-transparent p-8 md:p-0 rounded-lg">
              <p className="text-5xl md:text-6xl font-bold m-0">3</p>
              <p className="font-thin text-3xl md:text-4xl">
                business partners in <br /> cleaning & repair
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-between">
            <div className="w-[10px] h-[130px] bg-white justify-center md:flex rounded-[5px] hidden" />
            <div className="w-[10px] h-[130px] bg-white justify-center md:flex rounded-[5px]  hidden" />
          </div>
          <div className="justify-between flex-col hidden md:flex">
            <div>
              <p className="text-5xl md:text-6xl m-0 font-bold">430</p>
              <p className="font-thin text-3xl md:text-4xl">
                apartments are waiting <br /> for your review
              </p>
            </div>
            <div>
              <p className="text-5xl md:text-6xl font-bold m-0 mt-6">$13k</p>
              <p className="font-thin text-3xl md:text-4xl">
                average savings <br /> per rental agreement
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-center md:mb-10 bg-black">
        <div
          style={{
            width: "300px", // Adjusted for mobile view
            height: "10px",
            backgroundColor: "gold",
            justifyContent: "center",
            display: "flex",
            borderRadius: "5px",
          }}
        />
      </div>

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

      {/* Copyright and Legal Information */}
      <div className="font-thin text-white flex flex-row px-5 md:px-[104px] my-8 justify-center md:justify-between">
        <p>Copyright © 2025 Kaze Inc. All rights reserved.</p>
        <div className="flex-row gap-14 hidden md:flex">
          <p>Privacy Policy</p>
          <p>Terms of Use</p>
          <p>Sales and Refunds</p>
          <p>Legal Site</p>
          <p>Map</p>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Index;
