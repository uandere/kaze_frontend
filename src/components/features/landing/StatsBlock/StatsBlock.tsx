import React from "react";

const StatsBlock = () => (
  <div className="flex flex-col justify-center items-center bg-black text-white md:my-36 px-5">
    <div className="text-4xl md:text-6xl font-bold mb-10">Kaze in numbers</div>
    <div className="flex flex-col md:flex-row md:flex-wrap md:justify-center gap-11">
      <div className="m-0 flex flex-col md:justify-center bg-gray-500 items-start md:bg-transparent p-8 md:p-0 rounded-lg">
        <p className="font-bold text-[#ffd700] text-4xl md:text-6xl m-0">2K</p>
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
);

export default StatsBlock;
