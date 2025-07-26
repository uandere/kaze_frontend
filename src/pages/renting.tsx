// TODO: This file needs severe refactoring.

import React, { useState, useEffect, useRef } from "react";
import Header from "@/components/layout/Header/Header";
const HousesPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);

  if (loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <Header />
        {/*<div className="flex flex-row w-full">*/}
        {/*  <div className="w-1/2 p-5">*/}
        {/*    <div className="flex flex-col space-y-4 mt-20 justify-center">*/}
        {/*      <div className="w-full">*/}
        {/*        <div className="flex flex-row items-center space-x-4 justify-center">*/}
        {/*          <p className="text-xl w-1/3">With price range: </p>*/}
        {/*          <input*/}
        {/*            type="text"*/}
        {/*            className="p-2 border rounded bg-gray-800 border-gray-800 w-1/4"*/}
        {/*          />*/}
        {/*          <p className="text-xl">to</p>*/}
        {/*          <input*/}
        {/*            type="text"*/}
        {/*            className="p-2 border rounded bg-gray-800 border-gray-800 w-1/4"*/}
        {/*          />*/}
        {/*          <select className="p-3 pr-9 border rounded bg-gray-800 border-gray-800 w-1/4">*/}
        {/*            <option value="Ч">UAH</option>*/}
        {/*            <option value="Ж">USD</option>*/}
        {/*            <option value="Ч">EUR</option>*/}
        {/*          </select>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*      <div className="flex flex-row items-center space-x-4 w-full">*/}
        {/*        <select className="p-3 border rounded bg-gray-800 border-gray-800 w-1/3 text-white">*/}
        {/*          <option>All filters</option>*/}
        {/*          <option value="Ч">UAH</option>*/}
        {/*          <option value="Ж">USD</option>*/}
        {/*          <option value="Ч">EUR</option>*/}
        {/*        </select>*/}

        {/*        <select className="p-3 border rounded bg-gray-800 border-gray-800 w-1/3 text-white">*/}
        {/*          <option value="Ч">Sort by: time</option>*/}
        {/*          <option value="Ж">Sort by: price</option>*/}
        {/*          <option value="Ч">Sort by: number of rooms</option>*/}
        {/*        </select>*/}

        {/*        <button className="p-2 border rounded bg-gray-800 border-gray-800 w-1/3 flex items-center justify-center gap-2 text-white">*/}
        {/*          <img src="bell.svg" className="w-6" />*/}
        {/*          <p>Create notification</p>*/}
        {/*        </button>*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*    <div className="grid grid-cols-1 gap-4 p-5">*/}
        {/*      {currentHouses.map((house) => (*/}
        {/*        <div key={house.id} onClick={() => handleHouseClick(house)}>*/}
        {/*          <PropertyCard propertyData={house} />*/}
        {/*        </div>*/}
        {/*      ))}*/}
        {/*    </div>*/}
        {/*    <div className="flex justify-center mt-6">*/}
        {/*      <div className="flex space-x-2">*/}
        {/*        <button*/}
        {/*          onClick={() => handlePageChange(currentPage - 1)}*/}
        {/*          disabled={currentPage === 1}*/}
        {/*          className={`px-3 py-1 rounded ${*/}
        {/*            currentPage === 1 ? "hidden" : "bg-[#ffd700] text-black"*/}
        {/*          }`}*/}
        {/*        >*/}
        {/*          Prev*/}
        {/*        </button>*/}
        {/*        {Array.from({ length: totalPages }, (_, index) => (*/}
        {/*          <button*/}
        {/*            key={index + 1}*/}
        {/*            onClick={() => handlePageChange(index + 1)}*/}
        {/*            className={`px-3 py-1 rounded ${*/}
        {/*              currentPage === index + 1*/}
        {/*                ? "bg-[#ffd700] text-black"*/}
        {/*                : "border border-[#ffd700] text-[#ffd700]"*/}
        {/*            }`}*/}
        {/*          >*/}
        {/*            {index + 1}*/}
        {/*          </button>*/}
        {/*        ))}*/}
        {/*        <button*/}
        {/*          onClick={() => handlePageChange(currentPage + 1)}*/}
        {/*          disabled={currentPage === totalPages}*/}
        {/*          className={`px-3 py-1 rounded ${*/}
        {/*            currentPage === totalPages*/}
        {/*              ? "hidden"*/}
        {/*              : "bg-[#ffd700] text-black"*/}
        {/*          }`}*/}
        {/*        >*/}
        {/*          Next*/}
        {/*        </button>*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </div>*/}

        {/*  /!* Sticky map iframe *!/*/}
        {/*  <div className="w-1/2 p-5 sticky top-20 h-screen overflow-hidden">*/}
        {/*    <div className="flex justify-center h-full">*/}
        {/*      <iframe*/}
        {/*        className="h-full w-full"*/}
        {/*        loading="lazy"*/}
        {/*        allowFullScreen*/}
        {/*        referrerPolicy="no-referrer-when-downgrade"*/}
        {/*        src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBVGbMD3oScLkBQdjrj38lZqwGPm9UfsTU&q=Lviv+${encodeURIComponent(*/}
        {/*          selectedAddress ||*/}
        {/*            "https://www.google.com/maps/embed/v1/place?key=AIzaSyBVGbMD3oScLkBQdjrj38lZqwGPm9UfsTU&q=Lviv"*/}
        {/*        )}`}*/}
        {/*      />*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</div>*/}
      </div>
    );
  }
};

export default HousesPage;
