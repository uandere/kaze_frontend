import React from "react";
import { Carousel } from "antd";
import Image from "next/image";

const imagePaths = ["/estate1.jpg", "/estate2.jpg", "/estate3.jpg"];

const PropertyCard = () => {
  return (
    <div className="flex flex-row p-4 border rounded-lg border-[#ffd700]">
      <div className="flex justify-center items-center">
        <div className="w-80 h-72">
          <Carousel autoplay arrows={true} adaptiveHeight={true}>
            {imagePaths.map((photo, index) => (
              <div key={index} className="flex justify-center items-center">
                <img
                  src={photo}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-80 object-contain"
                />
              </div>
            ))}
          </Carousel>
        </div>
      </div>

      {/* Text Section */}
      <div className="w-1/2 px-4">
        <h2 className="text-2xl font-bold text-[#ffd700]">25 000 ₴/month</h2>
        <p className="text-xl mt-2">Pymonenka Mykoly, 25a</p>
        <p className="font-thin mt-2">Lviv, Sykhivskyi District</p>
        <div className="grid grid-cols-2 gap-4 text-lg font-thin mt-2">
          <p className="rounded border p-0.5 text-sm flex justify-center">First-time rental</p>
          <p className="rounded border p-0.5 text-sm flex justify-center">RC Auroom City</p>
          <p className="rounded border p-0.5 text-sm flex justify-center">Pet-friendly</p>
          <p className="rounded border p-0.5 text-sm flex justify-center">Children-friendly</p>
        </div>

        <div className="flex flex-row gap-2 items-center mt-2">
          <Image src="/bad.svg" alt="Apartment" width={27} height={27} />
          <p className="font-thin">1 room</p>
        </div>
        <div className="flex flex-row gap-2 items-center mt-2">
          <Image src="/stairs.svg" alt="Apartment" width={27} height={27} />
          <p className="font-thin">5th floor</p>
        </div>
        <div className="flex flex-row gap-2 items-center mt-2">
          <Image src="/size.svg" alt="Apartment" width={27} height={27} />
          <p className="font-thin">42 m²</p>
        </div>
        <p className="font-thin mt-4">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>
      </div>
    </div>
  );
};

export default PropertyCard;
