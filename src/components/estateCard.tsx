import React from "react";
import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import StairsIcon from "@mui/icons-material/Stairs";
import CropFreeOutlinedIcon from "@mui/icons-material/CropFreeOutlined";

interface FirebasePropertyData {
  images: string[];
  price: number;
  currency: string;
  frequency: string;
  street: string;
  houseNumber: string;
  city: string;
  region: string;
  livingComplex: string;
  isPetFriendly: boolean;
  isChildrenFriendly: boolean;
  numberOfRooms: string;
  floorNumber: string;
  area: number;
  description: string;
}

interface PropertyCardProps {
  propertyData: FirebasePropertyData;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ propertyData }) => {
  if (!propertyData) {
    return <div>Loading...</div>;
  }

  const imagePaths = propertyData.images || [];

  return (
    <div className="flex flex-row p-4 border rounded-lg border-[#ffd700]">
      <div className="flex justify-center items-center">
        <div className="w-80 h-80">
          {/* <Carousel autoplay arrows={true} adaptiveHeight={true}>
            {imagePaths.map((photo: string, index: number) => (
              <div key={index} className="flex justify-center items-center">
                <img
                  src={photo}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-80 object-contain"
                />
              </div>
            ))}
          </Carousel> */}
        </div>
      </div>

      {/* Text Section */}
      <div className="w-1/2 px-4">
        <h2 className="text-2xl font-bold text-[#ffd700]">
          {propertyData.price} {propertyData.currency}/{propertyData.frequency}
        </h2>
        <p className="text-xl mt-2">
          {propertyData.street}, {propertyData.houseNumber}
        </p>
        <p className="font-thin mt-2">
          {propertyData.city}, {propertyData.region} District
        </p>

        <div className="grid grid-cols-2 gap-4 text-lg font-thin mt-2">
          {/* This isn't in the data, so assume it's false */}
          {/* <p className="rounded border p-0.5 text-sm flex justify-center">
            First-time rental
          </p> */}
          {propertyData.livingComplex && (
            <p className="rounded border p-0.5 text-sm flex justify-center">
              {propertyData.livingComplex}
            </p>
          )}
          {propertyData.isPetFriendly && (
            <p className="rounded border p-0.5 text-sm flex justify-center">
              Pet-friendly
            </p>
          )}
          {propertyData.isChildrenFriendly && (
            <p className="rounded border p-0.5 text-sm flex justify-center">
              Children-friendly
            </p>
          )}
        </div>

        <div className="flex flex-row gap-2 items-center mt-2">
          <BedOutlinedIcon />
          <p className="font-thin">{propertyData.numberOfRooms} room</p>
        </div>
        <div className="flex flex-row gap-2 items-center mt-2">
          <StairsIcon />
          <p className="font-thin">{propertyData.floorNumber}th floor</p>
        </div>
        <div className="flex flex-row gap-2 items-center mt-2">
          <CropFreeOutlinedIcon />
          <p className="font-thin">{propertyData.area} m²</p>
        </div>
        <p className="font-thin mt-4">
          {propertyData.description.length > 100
            ? `${propertyData.description.slice(0, 100)}...`
            : propertyData.description}
        </p>
      </div>
    </div>
  );
};

export default PropertyCard;
