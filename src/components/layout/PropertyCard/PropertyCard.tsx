import React from "react";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import BedOutlinedIcon from '@mui/icons-material/BedOutlined';
import StairsOutlinedIcon from '@mui/icons-material/StairsOutlined';
import Image from "next/image";
import Button from "@/components/layout/Button"; 

type PropertyCardProps = {
  imageUrl: string;
  address: string;
  district: string;
  roomCount: number;
  floor: number;
  area: number;
  price: number;
  onLearnMore?: () => void;
};

const PropertyCard: React.FC<PropertyCardProps> = ({
  imageUrl,
  address,
  district,
  roomCount,
  floor,
  area,
  price,
  onLearnMore,
}) => {
  return (
    <div className="bg-[#242424] rounded-2xl overflow-hidden w-full  text-white">
      <img src={imageUrl} alt="Property" className="w-full h-60 object-cover" />

      <div className="p-6">
        <div className="flex items-top gap-2 text-white py-4">
          <RoomOutlinedIcon />
          <div>
            <span className="font-thin font-nunito text-xl md:text-2xl">{address}</span>

            <p className="text-gray-400 text-xl mb-4 font-nunito font-thin">
              {district}
            </p>
          </div>
        </div>

        <div className="flex justify-between text-sm py-4">
          <div className="flex items-center gap-2 md:text-2xl text-xl font-nunito font-thin">
            <BedOutlinedIcon /> <span>{roomCount} room</span>
          </div>
          <div className="flex items-center gap-2 md:text-2xl text-xl font-nunito font-thin">
            <StairsOutlinedIcon /> <span>{floor}th floor</span>
          </div>
          <div className="flex items-center gap-2 md:text-2xl text-xl font-nunito font-thin">
            <Image src="size.svg" width={25} height={25} alt="" /> <span>{area} m²</span>
          </div>
        </div>

        <div className="flex items-center justify-between py-4 gap-2">
          <div>
            <span className="md:text-4xl text-2xl font-bold unbounded-custom">
              {price.toLocaleString("uk-UA")}₴
            </span>
            <span className="ml-1 text-gray-400 md:text-2xl text-xl font-thin font-nunito">/month</span>
          </div>
          <Button
            text="LEARN MORE"
            className="unbounded-custom md:px-6 md:py-4 px-3 py-2 rounded-md bg-gradient-to-r text-sm from-[#FCBF29] to-[#ED8F03] font-thin"
          />
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
