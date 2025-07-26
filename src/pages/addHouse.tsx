import React, { useState, useEffect } from "react";
import Header from "@/components/layout/Header/Header";
import CustomInput from "@/components/CInput";
import CustomCheckbox from "@/components/CCheckbox";
import CustomDropdown from "@/components/CDropdown";
import CustomDropbox from "@/components/CDropbox";
import { uploadFileToStorage } from "@/utils/upload";
import { db } from "../../firebase/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import useDiiaAuth from "@/hooks/isAuthorized";
import { useRouter } from "next/router";

// Initial form state remains the same
const initialFormData = {
  description: "",
  isForRent: false,
  isPetFriendly: false,
  isChildrenFriendly: false,
  houseType: "",
  isDishwasher: false,
  isWashingMashine: false,
  isMicrowave: false,
  isGasStove: false,
  isWiFi: false,
  isTV: false,
  isParking: false,
  isBalcony: false,
  isAirConditioning: false,
  isRefrigerator: false,
  isOven: false,
  isFilteredWater: false,
  isGasHeating: false,
  titleImage: null as File | null,
  images: [] as File[],
  city: "",
  region: "",
  street: "",
  houseNumber: "",
  floorNumber: "",
  apartmentNumber: "",
  price: 0,
  currency: "",
  frequency: "",
  numberOfRooms: "",
  area: 0,
  livingComplex: "",
  additionalInfo: [] as { name: string; price: string; currency: string }[],
  userId: "",
};

const AddHouse: React.FC = () => {
  const [formData, setFormData] = useState(initialFormData);
  const currencies = ["USD", "EUR", "GBP"];
  const frequencies = ["Monthly", "Yearly"];
  const { user } = useUser();
  const isDiiaAuthenticated = useDiiaAuth();
  const [isChecking, setIsChecking] = useState(true);
  const [hasRedirected, setHasRedirected] = useState(false);
  const router = useRouter();
  
  // Set user ID when available
  useEffect(() => {
    if (user?.uid) {
      setFormData(prev => ({...prev, userId: user.uid}));
    }
  }, [user]);

  // Handle Diia authentication check and redirect only once
  useEffect(() => {
    // Skip check if we've already redirected
    if (hasRedirected) return;
    
    // Only proceed if authentication status is determined (not initial loading)
    if (isDiiaAuthenticated === false && user && !isChecking) {
      setHasRedirected(true);
      router.push({
        pathname: "/diiaAuth",
        query: { backlink: router.asPath },
      });
    } else if (isDiiaAuthenticated === true) {
      // Authentication confirmed, stop checking
      setIsChecking(false);
    } else if (isDiiaAuthenticated === false && user) {
      // We know the status now, stop checking on next render
      setIsChecking(false);
    }
  }, [isDiiaAuthenticated, user, isChecking, hasRedirected, router]);

  // Rest of your component remains the same
  // Handle input field changes, etc.
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target as
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle additional info changes
  const handleAdditionalInfoChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const newAdditionalInfo = [...formData.additionalInfo];
    newAdditionalInfo[index] = {
      ...newAdditionalInfo[index],
      [field]: value,
    };

    setFormData({
      ...formData,
      additionalInfo: newAdditionalInfo,
    });
  };

  // Add new additional info field
  const handleAddAdditionalInfo = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent form submission
    setFormData({
      ...formData,
      additionalInfo: [
        ...formData.additionalInfo,
        { name: "", price: "", currency: "USD" },
      ],
    });
  };

  // Remove additional info field
  const handleRemoveAdditionalInfo = (indexToRemove: number) => {
    setFormData({
      ...formData,
      additionalInfo: formData.additionalInfo.filter(
        (_, index) => index !== indexToRemove
      ),
    });
  };

  // Update title image upload
  const handleTitleImageUpload = (files: File[]) => {
    if (files && files.length > 0) {
      setFormData({
        ...formData,
        titleImage: files[0],
      });
    }
  };

  // Update gallery images upload
  const handleImagesUpload = (files: File[]) => {
    if (files && files.length > 0) {
      setFormData({
        ...formData,
        images: [...formData.images, ...files],
      });
    }
  };

  // Remove image
  const removeImage = (indexToRemove: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, index) => index !== indexToRemove),
    });
  };

  // Remove title image
  const removeTitleImage = (e: React.MouseEvent) => {
    e.preventDefault();
    setFormData({
      ...formData,
      titleImage: null,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Upload title image if exists
      let titleImageUrl = "";
      if (formData.titleImage) {
        titleImageUrl = await uploadFileToStorage(
          formData.titleImage,
          "title-images"
        );
      }

      // Upload gallery images
      const imageUrls = await Promise.all(
        formData.images.map((file) =>
          uploadFileToStorage(file, "gallery-images")
        )
      );

      // Filter out empty additional info items
      const validAdditionalInfo = formData.additionalInfo.filter(
        (item) => item.name.trim() !== "" && item.price.trim() !== ""
      );

      // Create data object for Firestore
      const firestoreData = {
        description: formData.description,
        isForRent: formData.isForRent,
        isPetFriendly: formData.isPetFriendly,
        isChildrenFriendly: formData.isChildrenFriendly,
        houseType: formData.houseType,
        isDishwasher: formData.isDishwasher,
        isWashingMashine: formData.isWashingMashine,
        isMicrowave: formData.isMicrowave,
        isGasStove: formData.isGasStove,
        isWiFi: formData.isWiFi,
        isTV: formData.isTV,
        isParking: formData.isParking,
        isBalcony: formData.isBalcony,
        isAirConditioning: formData.isAirConditioning,
        isRefrigerator: formData.isRefrigerator,
        isOven: formData.isOven,
        isFilteredWater: formData.isFilteredWater,
        isGasHeating: formData.isGasHeating,
        city: formData.city,
        region: formData.region,
        street: formData.street,
        houseNumber: formData.houseNumber,
        floorNumber: formData.floorNumber,
        apartmentNumber: formData.apartmentNumber,
        price: formData.price,
        currency: formData.currency,
        frequency: formData.frequency,
        numberOfRooms: formData.numberOfRooms,
        area: formData.area,
        livingComplex: formData.livingComplex,
        titleImage: titleImageUrl,
        images: imageUrls,
        additionalInfo: validAdditionalInfo,
        createdAt: new Date(),
        userId: formData.userId,
      };

      // Add to Firestore
      await addDoc(collection(db, "listings"), firestoreData);
      console.log("Listing saved successfully!");
      
      // Maybe redirect to listings page after success
      // router.push('/listings');
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  // Show loading state while checking authentication
  if (isChecking && !isDiiaAuthenticated) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white">Checking authentication...</h2>
            <p className="text-white mt-2">Please wait while we verify your Diia authorization.</p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen">
      <Header />
        <div className="p-20">
          <div className="mt-20 border border-[#ffd700] rounded-xl relative">
            <div className="absolute -inset-4 rounded-xl bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 opacity-65 blur"></div>
            <div className="relative rounded-xl bg-black p-8 text-white">
              <form onSubmit={handleSubmit}>
                <div className="flex items-center justify-center">
                  <div className="flex-grow border-t border-[#ffd700]"></div>
                  <h3 className="text-2xl font-extrabold text-custom mx-4 text-center">
                    Location
                  </h3>
                  <div className="flex-grow border-t border-[#ffd700]"></div>
                </div>
                <div className="grid grid-flow-col grid-rows-2 gap-6 gap-y-8 my-8 items-center w-full">
                  <CustomInput
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-1/2"
                  />
                  <CustomInput
                    label="House Number"
                    name="houseNumber"
                    value={formData.houseNumber}
                    onChange={handleInputChange}
                    className="w-1/5"
                  />
                  <CustomInput
                    label="Region"
                    name="region"
                    value={formData.region}
                    onChange={handleInputChange}
                    className="w-1/2"
                  />
                  <CustomInput
                    label="Floor Number"
                    name="floorNumber"
                    value={formData.floorNumber}
                    onChange={handleInputChange}
                    className="w-1/5"
                  />
                  <CustomInput
                    label="Street"
                    name="street"
                    value={formData.street}
                    onChange={handleInputChange}
                    className="w-1/2"
                  />
                  <CustomInput
                    label="Apartment Number"
                    name="apartmentNumber"
                    value={formData.apartmentNumber}
                    onChange={handleInputChange}
                    className="w-1/5"
                  />
                </div>

                <div className="flex items-center justify-center">
                  <div className="flex-grow border-t border-[#ffd700]"></div>
                  <h3 className="text-2xl font-extrabold text-custom mx-4 text-center">
                    Price
                  </h3>
                  <div className="flex-grow border-t border-[#ffd700]"></div>
                </div>
                <div className="items-center gap-4 my-8 w-full grid grid-flow-col">
                  <CustomInput
                    label="Price"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleInputChange}
                  />
                  <CustomDropdown
                    label="Currency"
                    name="currency"
                    value={formData.currency}
                    onChange={handleInputChange}
                    options={currencies}
                  />
                  <CustomDropdown
                    label="Frequency"
                    name="frequency"
                    value={formData.frequency}
                    onChange={handleInputChange}
                    options={frequencies}
                  />
                </div>

                <div className="flex items-center justify-center">
                  <div className="flex-grow border-t border-[#ffd700]"></div>
                  <h3 className="text-2xl font-extrabold text-custom mx-4 text-center">
                    Apartment Characteristics
                  </h3>
                  <div className="flex-grow border-t border-[#ffd700]"></div>
                </div>
                <div className="grid grid-flow-col grid-rows-2 justify-around items-center gap-2 my-8 gap-y-8">
                  <CustomInput
                    label="Number of Rooms"
                    name="numberOfRooms"
                    value={formData.numberOfRooms}
                    onChange={handleInputChange}
                    className="w-1/3"
                  />
                  <CustomCheckbox
                    label="First-time Rental"
                    name="isForRent"
                    checked={formData.isForRent}
                    onChange={handleInputChange}
                  />
                  <CustomInput
                    label="Area (m²)"
                    name="area"
                    value={formData.area}
                    onChange={handleInputChange}
                    className="w-1/3"
                  />
                  <CustomCheckbox
                    label="Pet-friendly"
                    name="isPetFriendly"
                    checked={formData.isPetFriendly}
                    onChange={handleInputChange}
                  />
                  <CustomInput
                    label="Living Complex"
                    name="livingComplex"
                    value={formData.livingComplex}
                    onChange={handleInputChange}
                    className="w-1/3"
                  />
                  <CustomCheckbox
                    label="Children-friendly"
                    name="isChildrenFriendly"
                    checked={formData.isChildrenFriendly}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="grid grid-flow-col grid-rows-3 ml-1 gap-2 my-8 gap-y-8 justify-around items-center">
                  <CustomCheckbox
                    label="Dishwasher"
                    name="isDishwasher"
                    checked={formData.isDishwasher}
                    onChange={handleInputChange}
                    iconPath="dishwasher.svg"
                  />
                  <CustomCheckbox
                    label="Washing Machine"
                    name="isWashingMashine"
                    checked={formData.isWashingMashine}
                    onChange={handleInputChange}
                    iconPath="washer.svg"
                  />
                  <CustomCheckbox
                    label="Microwave"
                    name="isMicrowave"
                    checked={formData.isMicrowave}
                    onChange={handleInputChange}
                    iconPath="microwave.svg"
                  />
                  <CustomCheckbox
                    label="Gas Stove"
                    name="isGasStove"
                    checked={formData.isGasStove}
                    onChange={handleInputChange}
                    iconPath="gasStove.svg"
                  />
                  <CustomCheckbox
                    label="WiFi"
                    name="isWiFi"
                    checked={formData.isWiFi}
                    onChange={handleInputChange}
                    iconPath="WiFi.svg"
                  />
                  <CustomCheckbox
                    label="TV"
                    name="isTV"
                    checked={formData.isTV}
                    onChange={handleInputChange}
                    iconPath="TV.svg"
                  />
                  <CustomCheckbox
                    label="Refrigerator"
                    name="isRefrigerator"
                    checked={formData.isRefrigerator}
                    onChange={handleInputChange}
                    iconPath="refrigerator.svg"
                  />
                  <CustomCheckbox
                    label="Oven"
                    name="isOven"
                    checked={formData.isOven}
                    onChange={handleInputChange}
                    iconPath="oven.svg"
                  />
                  <CustomCheckbox
                    label="Filtered Water"
                    name="isFilteredWater"
                    checked={formData.isFilteredWater}
                    onChange={handleInputChange}
                    iconPath="filtered_water.svg"
                  />
                </div>
                <div className="flex flex-row justify-around items-center gap-2 my-8">
                  <CustomCheckbox
                    label="Gas Heating"
                    name="isGasHeating"
                    checked={formData.isGasHeating}
                    onChange={handleInputChange}
                    iconPath="gas_heating.svg"
                  />
                  <CustomCheckbox
                    label="Parking lot"
                    name="isParking"
                    checked={formData.isParking}
                    onChange={handleInputChange}
                    iconPath="parking.svg"
                  />
                  <CustomCheckbox
                    label="Balcony"
                    name="isBalcony"
                    checked={formData.isBalcony}
                    onChange={handleInputChange}
                    iconPath="balcony.svg"
                  />
                  <CustomCheckbox
                    label="Air Conditioning"
                    name="isAirConditioning"
                    checked={formData.isAirConditioning}
                    onChange={handleInputChange}
                    iconPath="air-conditioner.svg"
                  />
                </div>

                <div className="p-5 bg-[#1E1E1E]">
                  <h3 className="text-2xl font-extrabold text-custom mx-4 text-center">
                    Additional information
                  </h3>
                  <button
                    className="w-10 h-10 bg-[#ffd700] rounded-lg flex items-center justify-center mt-4"
                    onClick={handleAddAdditionalInfo}
                    type="button"
                  >
                    +
                  </button>
                  {formData.additionalInfo.map((info, index) => (
                    <div key={index} className="mt-4 p-4 flex gap-4 relative">
                      <div className="flex-1">
                        <CustomInput
                          label="Name"
                          name={`additionalInfo-name-${index}`}
                          value={info.name}
                          onChange={(e) =>
                            handleAdditionalInfoChange(
                              index,
                              "name",
                              e.target.value
                            )
                          }
                          placeholder="Enter name"
                        />
                      </div>

                      <div className="flex-1">
                        <CustomInput
                          label="Price"
                          name={`additionalInfo-price-${index}`}
                          type="number"
                          value={info.price}
                          onChange={(e) =>
                            handleAdditionalInfoChange(
                              index,
                              "price",
                              e.target.value
                            )
                          }
                          placeholder="Enter price"
                        />
                      </div>

                      <div className="flex-1">
                        <CustomDropdown
                          label="Currency"
                          name={`additionalInfo-currency-${index}`}
                          value={info.currency}
                          options={currencies}
                          onChange={(e) =>
                            handleAdditionalInfoChange(
                              index,
                              "currency",
                              e.target.value
                            )
                          }
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRemoveAdditionalInfo(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-center my-8">
                  <div className="flex-grow border-t border-[#ffd700]"></div>
                  <h3 className="text-2xl font-extrabold text-custom mx-4 text-center">
                    Images
                  </h3>
                  <div className="flex-grow border-t border-[#ffd700]"></div>
                </div>
                <div className="flex flex-row gap-16">
                  <div className="w-1/3">
                    <h4 className="text-lg mb-2">Title Image</h4>
                    <CustomDropbox
                      multiple={false}
                      onFilesChange={handleTitleImageUpload}
                    />

                    {formData.titleImage && (
                      <div className="mt-4 relative w-40 h-40">
                        <img
                          src={URL.createObjectURL(formData.titleImage)}
                          alt="Title"
                          className="w-full h-full object-cover rounded-lg shadow"
                        />
                        <button
                          onClick={removeTitleImage}
                          className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded-full shadow"
                          type="button"
                        >
                          ✕
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="w-2/3">
                    <h4 className="text-lg mb-2">Gallery Images</h4>
                    <CustomDropbox
                      multiple={true}
                      onFilesChange={handleImagesUpload}
                    />

                    <div className="mt-4 flex flex-wrap gap-2">
                      {formData.images.map((file, index) => (
                        <div key={index} className="relative w-20 h-20">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`Uploaded ${index}`}
                            className="w-full h-full object-cover rounded-lg shadow"
                          />
                          <button
                            onClick={() => removeImage(index)}
                            className="absolute top-0.5 right-0.5 bg-red-500 text-white text-xs px-1 rounded-full"
                            type="button"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center mt-8">
                  <div className="flex-grow border-t border-[#ffd700]"></div>
                  <h3 className="text-2xl font-extrabold text-custom mx-4 text-center">
                    Description
                  </h3>
                  <div className="flex-grow border-t border-[#ffd700]"></div>
                </div>

                <CustomInput
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  isTextArea={true}
                  className="h-[25vh] bg-black border border-[#ffd700] mt-8 text-white"
                />

                <button
                  type="submit"
                  className="mt-6 bg-yellow-500 text-white px-6 py-2 rounded-md hover:bg-yellow-600 focus:outline-none"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
    </div>
  );
};

export default AddHouse;
