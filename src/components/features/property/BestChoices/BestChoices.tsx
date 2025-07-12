import React from "react";
import PropertyCard from "@/components/estateCard"; // Assuming this exists

const BestChoices = () => {
  return (
    <section className="bg-black pb-10 text-white">
      <p className="font-bold text-6xl text-center">Best choices right now</p>
      <div className="h-2 w-[300px] bg-yellow-500 mx-auto my-5 rounded-md" />
      <div className="grid grid-cols-2 gap-4 justify-center my-10 mx-4">
        {/* <PropertyCard propertyData={data[0]} /> */}
      </div>
      <div className="h-2 w-[300px] bg-yellow-500 mx-auto mt-10 rounded-md" />
    </section>
  );
};

export default BestChoices;
