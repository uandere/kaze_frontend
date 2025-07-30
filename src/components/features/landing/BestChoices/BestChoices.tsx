import React from "react";
import PropertyCard from "@/components/layout/PropertyCard";

const BestChoices = () => {
  return (
    <section className="px-4 md:px-30">
      <div className="flex flex-col gap-6 md:flex-row md:gap-10 w-full">
        <div className="md:hidden">
          <div className="w-full bg-black text-white py-6">
            <div className="flex flex-wrap justify-between text-3xl font-extrabold unbounded-custom leading-tight w-full">
              <span className="block">BEST CHOICES</span>
              <span className="block text-right w-full sm:w-auto">
                RIGHT NOW
              </span>
            </div>
          </div>
          <p className="font-nunito text-xl my-5">
            Looking for something great?
          </p>
          <p className="font-nunito text-xl">
            Here are the top apartment listings available
            at the moment — selected based on
            popularity, price, and overall quality
          </p>
        </div>
        <PropertyCard
          imageUrl="/image1.png"
          address="Pymonenka Mykoly, 25a"
          district="Lviv, Sykhivskyi District"
          roomCount={1}
          floor={5}
          area={47}
          price={19000}
          onLearnMore={() => console.log("Redirect to property details")}
        />
        <PropertyCard
          imageUrl="/image1.png"
          address="Pymonenka Mykoly, 25a"
          district="Lviv, Sykhivskyi District"
          roomCount={1}
          floor={5}
          area={47}
          price={19000}
          onLearnMore={() => console.log("Redirect to property details")}
        />
        <PropertyCard
          imageUrl="/image1.png"
          address="Pymonenka Mykoly, 25a"
          district="Lviv, Sykhivskyi District"
          roomCount={1}
          floor={5}
          area={47}
          price={19000}
          onLearnMore={() => console.log("Redirect to property details")}
        />
      </div>
    </section>
  );
};

export default BestChoices;
