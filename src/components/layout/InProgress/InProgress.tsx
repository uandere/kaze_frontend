import React from "react";

const InProgress = () => (
  <div className="relative flex flex-col items-center justify-center h-screen text-white">
    <img
      src="/fixkey.svg"
      alt="Background"
      className="absolute w-[900px] h-[800px] opacity-60"
    />
    <div className="flex flex-col justify-start z-10">
      <h1 className="text-6xl font-bold">OOPS!</h1>
      <h2 className="text-5xl font-bold">This page is still in the workshop</h2>
      <p className="text-4xl font-thin italic">
        This page isn’t ready yet, but we’re working on something awesome!
      </p>
    </div>
  </div>
);

export default InProgress;
