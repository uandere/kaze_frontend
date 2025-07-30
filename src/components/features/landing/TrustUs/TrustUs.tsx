import React from "react";
import Image from "next/image";

const TrustUs = () => {
  return (
    <>
      <section className="hidden md:flex w-full flex-col md:flex-row items-center px-4 md:px-30 py-12 text-white my-16">
        <div className="md:w-1/2 w-full mb-12 md:mb-0">
          <h1 className="unbounded-custom text-3xl md:text-5xl mb-16">
            WHY YOU CAN TRUST US
          </h1>
          <div className="space-y-12 text-2xl font-thin">
            <p>
              Renta is an innovative product that relieves tenants and
              <br />
              landlords of the worst pain of renting process — real estate
              <br />
              agents.
            </p>
            <p>
              With us, you can find or rent out a housing with zero realtor
              <br />
              fees and zero middlemen. Search for apartments, schedule
              <br />
              tours, and sign agreements — just using your phone.
            </p>
          </div>
        </div>

        <div className="relative w-full md:w-1/2">
          <Image
            src="/TrustUs.svg"
            alt="Trust Us"
            width={1000}
            height={1000}
            className="w-full h-auto object-contain relative z-0 rounded-4xl"
          />
        </div>
      </section>

      <section className="flex md:hidden flex-col items-center px-4 py-12 text-white my-8">
        <div className="flex flex-wrap justify-between text-4xl font-extrabold unbounded-custom leading-tight w-full">
          <span className="block">WHY YOU CAN</span>
          <span className="block text-right w-full sm:w-auto">TRUST US</span>
        </div>
        <div className="space-y-8 mt-8 text-lg font-thin">
          <p className="text-xl">
            Renta is an innovative product that relieves tenants and landlords
            of the worst pain of renting process — real estate agents.
          </p>
          <p className="text-xl">
            With us, you can find or rent out a housing with zero realtor fees
            and zero middlemen. Search for apartments, schedule tours, and sign
            agreements — just using your phone.
          </p>
        </div>
        <Image
          src="/TrustUs.svg"
          alt="Trust Us"
          height={500}
          width={500}
          className="w-full h-auto mt-8 rounded-4xl object-contain"
        />
      </section>
    </>
  );
};

export default TrustUs;
