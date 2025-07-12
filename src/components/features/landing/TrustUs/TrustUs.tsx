import React from "react";
import Image from "next/image";

const TrustUs = () => {
  return (
    <section className="w-full flex flex-col md:flex-row items-center px-8 md:px-16 py-12 text-white my-16">
      <div className="md:w-1/2 w-full mb-12 md:mb-0 md:pr-12">
        <h1 className="unbounded-custom text-3xl md:text-5xl mb-8">
          WHY YOU CAN TRUST US
        </h1>
        <div className="space-y-6 text-2xl font-thin">
          <p>
            Renta is an innovative product that relieves tenants and<br />landlords
            of the worst pain of renting process — real estate<br />agents.
          </p>
          <p>
            With us, you can find or rent out a housing with zero realtor<br />
            fees and zero middlemen. Search for apartments, schedule<br />
            tours, and sign agreements — just using your phone.
          </p>
        </div>
      </div>

      {/* Image with shade effect */}
      <div className="relative w-full md:w-1/2">
        <Image
          src="/TrustUs.svg"
          alt="Trust Us"
          width={1000}
          height={1000}
          className="w-full h-auto object-contain relative z-0 rounded-4xl"
        />
        {/* Gradient overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
};

export default TrustUs;
