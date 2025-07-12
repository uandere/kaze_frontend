import React from 'react';

const Achievements = () => {
  return (
    <div className="m-16">
      <h1 className="text-5xl unbounded-custom mb-16">OUR ACHIEVEMENTS</h1>

      <div className="flex flex-col md:flex-row justify-between gap-8">
        <div className="relative w-full md:w-1/3">
          <img src="/Achive1.svg" alt="Achievement 1" className="w-full h-auto object-cover rounded-2xl" />
          <div className="absolute inset-0  flex flex-col justify-end items-left text-left pl-16 pb-32">
            <h2 className="text-7xl font-bold unbounded-custom">2K</h2>
            <p className="mt-2 text-lg font-light">rental agreements<br/>signed in 2025</p>
          </div>
        </div>

        <div className="relative w-full md:w-1/3">
          <img src="/Achive2.svg" alt="Achievement 2" className="w-full h-auto object-cover rounded-2xl" />
          <div className="absolute inset-0  flex flex-col justify-end items-left text-left pl-16 pb-32">
            <h2 className="text-7xl  unbounded-custom font-extrabold">10K</h2>
            <p className="mt-2 text-lg font-light">active users on the<br/>website</p>
          </div>
        </div>

        <div className="relative w-full md:w-1/3">
          <img src="/Achive3.svg" alt="Achievement 3" className="w-full h-auto object-cover rounded-2xl" />
          <div className="absolute inset-0  flex flex-col justify-end items-left text-left pl-16 pb-32">
            <h2 className="text-7xl font-black unbounded-custom">430</h2>
            <p className="mt-2 text-lg font-light">apartments are waiting<br/>for your review</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Achievements;
