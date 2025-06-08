import React, { useState, useEffect } from "react";
import PropertyCard from "@/components/estateCard";
import Base64ToPDF from "@/components/base64ToPdf";
import { getAuth } from "firebase/auth";
import Header from "@/components/header";
import { db } from "../../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

interface FormData {
  lastNameUA: string;
  firstNameUA: string;
  middleNameUA: string;
  birthday: string;
  genderUA: string;
}

interface RentingData {
  start: string;
  end: string;
  price: number;
  currency: string;
  destination: string;
  rental_payment_delay_limit: number;
  payment_day_number: number;
  min_notice_days_for_visit: number;
  additional_tenants: string[];
  allowed_animals: string[];
}

const UserForm: React.FC = () => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [res, setRes] = useState<any>(null);
  const [firstProperty, setFirstProperty] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchFirstProperty = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "listings"));

        const firstDoc = querySnapshot.docs[0];
        if (firstDoc) {
          const property = {
            id: firstDoc.id,
            ...firstDoc.data(),
          };
          setFirstProperty(property);
          console.log("First property:", JSON.stringify(property, null, 2));
        } else {
          console.log("No documents found");
        }
      } catch (error) {
        console.error("Error fetching data from Firestore:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFirstProperty();
  }, []);
  const [tenantFormData, setTenantFormData] = useState<FormData>({
    lastNameUA: "Дія",
    firstNameUA: "Надія",
    middleNameUA: "Володимирівна",
    birthday: "1997-01-17",
    genderUA: "Ж",
  });

  const [landlordFormData, setLandlordFormData] = useState<FormData>({
    lastNameUA: "Дія",
    firstNameUA: "Надія",
    middleNameUA: "Володимирівна",
    birthday: "1997-01-17",
    genderUA: "Ж",
  });

  const [rentingFormData, setRentingFormData] = useState<RentingData>({
    start: "2025-04-06",
    end: "2025-04-06",
    price: 0,
    currency: "UAH",
    destination: "1234567891234567",
    rental_payment_delay_limit: 5,
    payment_day_number: 4,
    min_notice_days_for_visit: 2,
    additional_tenants: [],
    allowed_animals: [],
  });

  const handleTenantChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setTenantFormData({ ...tenantFormData, [e.target.name]: e.target.value });
  };

  const handleLandlordChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setLandlordFormData({ ...landlordFormData, [e.target.name]: e.target.value }); 
  };
  
  const handleRentingChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setRentingFormData({ ...rentingFormData, [e.target.name]: e.target.value }); 
  };

  const handleSubmit = async (e: React.FormEvent) => {
    console.log(firstProperty.additionalInfo)
    e.preventDefault();

    const formatDate = (date: string) => {
      const [year, month, day] = date.split("-");
      return `${day}.${month}.${year}`;
    };

    const jsonOutput = {
      housing_data: {
        address: {
          region: firstProperty.region,
          city: firstProperty.city,
          district: "",
          street: firstProperty.street,
          apartment_number: firstProperty.apartmentNumber,
        },
        type: firstProperty.houseType,
        area: firstProperty.area,
      },
      rent_data: {
        start: rentingFormData.start + "T00:00:00",
        end:  rentingFormData.end + "T00:00:00",
        currency: firstProperty.currency,
        price: firstProperty.price,
        rental_payment_delay_limit: rentingFormData.rental_payment_delay_limit,
        destination: rentingFormData.destination,
        payment_day_number: rentingFormData.payment_day_number,
        min_notice_days_for_visit: rentingFormData.min_notice_days_for_visit,
        additional_tenants: [],
        allowed_animals: [],
        additional_property: firstProperty.additionalInfo,
        meter_readings: {
          electricity: {
            type: "SingleRate",
            readings: [0.0],
          },
          water: {
            type: "SingleRate",
            readings: [0.0],
          },
          heating: {
            type: "SingleRate",
            readings: [0.0],
          },
          gas: {
            type: "SingleRate",
            readings: [0.0],
          },
        },
      },
      tenant: {
        "taxpayer-card": {
          creationDate: "",
          docNumber: "",
          lastNameUA: tenantFormData.lastNameUA,
          firstNameUA: tenantFormData.firstNameUA,
          middleNameUA: tenantFormData.middleNameUA,
          birthday: formatDate(tenantFormData.birthday),
          fileName: "",
        },
        "internal-passport": {
          taxpayerNumber: "",
          residenceUA: "",
          docNumber: "",
          genderUA: tenantFormData.genderUA,
          nationalityUA: "",
          lastNameUA: tenantFormData.lastNameUA,
          firstNameUA: tenantFormData.firstNameUA,
          middleNameUA: tenantFormData.middleNameUA,
          birthday: formatDate(tenantFormData.birthday),
          birthPlaceUA: "",
          issueDate: "",
          expirationDate: "",
          recordNumber: "",
          department: "",
          genderEN: "",
          id: "",
          lastNameEN: "",
          firstNameEN: "",
          fileName: "",
        },
      },
      landlord: {
        "taxpayer-card": {
          creationDate: "",
          docNumber: "",
          lastNameUA: landlordFormData.lastNameUA,
          firstNameUA: landlordFormData.firstNameUA,
          middleNameUA: landlordFormData.middleNameUA,
          birthday: formatDate(landlordFormData.birthday),
          fileName: "",
        },
        "internal-passport": {
          taxpayerNumber: "",
          residenceUA: "",
          docNumber: "",
          genderUA: landlordFormData.genderUA,
          nationalityUA: "",
          lastNameUA: landlordFormData.lastNameUA,
          firstNameUA: landlordFormData.firstNameUA,
          middleNameUA: landlordFormData.middleNameUA,
          birthday: formatDate(landlordFormData.birthday),
          birthPlaceUA: "",
          issueDate: "",
          expirationDate: "",
          recordNumber: "",
          department: "",
          genderEN: "",
          id: "",
          lastNameEN: "",
          firstNameEN: "",
          fileName: "",
        },
      },
      requisites_data: {
        tenant_phone: "",
        tenant_email: "",
        landlord_phone: "",
        landlord_email: "",
      },
      ownership_data: {
        record_number: "",
        date: "1970-01-01T00:00:00",
      },
    };

    console.log("Sending JSON:", JSON.stringify(jsonOutput, null, 2));

    try {
      const response = await fetch("https://kazeapi.uk/agreement/demo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonOutput),
      });
      console.log(response);
      if (response.ok) {
        const pdfBlob = await response.blob();
        const pdfUrl = URL.createObjectURL(pdfBlob);
        setPdfUrl(pdfUrl);
      } else {
        const errorText = await response.text(); 
        console.error("API Error:", errorText);
        throw new Error(`Failed to fetch PDF: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };    

  return (
    <div>
      <Header />
      <div className="mt-20 p-10">
        <div className="mt-20 border border-[#ffd700] rounded-xl relative">
          <div className="absolute -inset-4 rounded-xl bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 opacity-65 blur"></div>
          <div className="relative rounded-xl bg-black p-8 text-white">
            <div className="flex items-center justify-center">
              <div className="flex-grow border-t border-[#ffd700]"></div>
              <h3 className="text-2xl font-extrabold text-custom mx-4 text-center">
                Tenant Form
              </h3>
              <div className="flex-grow border-t border-[#ffd700]"></div>
            </div>
            <form className=" flex flex-row justify-evenly my-10">
              <div className="space-y-4 flex flex-col items-end">
                <div className="flex flex-row items-center space-x-4">
                  <p className="text-xl font-thin">First Name</p>
                  <input
                    type="text"
                    name="firstNameUA"
                    value={tenantFormData.firstNameUA}
                    onChange={handleTenantChange}
                    className="p-2 border rounded bg-gray-800 border-gray-800"
                    placeholder="Ім'я"
                  />
                </div>
                <div className="flex flex-row items-center space-x-4">
                  <p className="text-xl font-thin">Last Name</p>
                  <input
                    type="text"
                    name="lastNameUA"
                    value={tenantFormData.lastNameUA}
                    onChange={handleTenantChange}
                    className="p-2 border rounded bg-gray-800 border-gray-800"
                    placeholder="Прізвище"
                  />
                </div>
                <div className="flex flex-row items-center space-x-4">
                  <p className="text-xl font-thin">Patronymic</p>
                  <input
                    type="text"
                    name="patronymicUA"
                    onChange={handleTenantChange}
                    className="p-2 border rounded bg-gray-800 border-gray-800"
                    placeholder=""
                  />
                </div>
              </div>
              <div className="space-y-4 flex flex-col items-end">
                <div className="flex flex-row items-center space-x-4">
                  <p className="text-xl font-thin">Date of Birth</p>
                  <input
                    type="date"
                    name="birthday"
                    value={tenantFormData.birthday}
                    onChange={handleTenantChange}
                    className="p-2 border rounded bg-gray-800 border-gray-800"
                  />
                </div>
                <div className="flex flex-row items-center space-x-4">
                  <p className="text-xl font-thin">Gender</p>
                  <select
                    name="genderUA"
                    value={tenantFormData.genderUA}
                    onChange={handleTenantChange}
                    className="p-3 pr-9 border rounded bg-gray-800 border-gray-800"
                  >
                    <option value="Ч">Чоловіча</option>
                    <option value="Ж">Жіноча</option>
                  </select>
                </div>
              </div>
            </form>
            <div className="flex items-center justify-center">
              <div className="flex-grow border-t border-[#ffd700]"></div>
              <h3 className="text-2xl font-extrabold text-custom mx-4 text-center">
                Landlord Form
              </h3>
              <div className="flex-grow border-t border-[#ffd700]"></div>
            </div>
            <form className=" flex flex-row justify-evenly my-10">
              <div className="space-y-4 flex flex-col items-end">
                <div className="flex flex-row items-center space-x-4">
                  <p className="text-xl font-thin">First Name</p>
                  <input
                    type="text"
                    name="firstNameUA"
                    value={landlordFormData.firstNameUA}
                    onChange={handleLandlordChange}
                    className="p-2 border rounded bg-gray-800 border-gray-800"
                    placeholder="Ім'я"
                  />
                </div>
                <div className="flex flex-row items-center space-x-4">
                  <p className="text-xl font-thin">Last Name</p>
                  <input
                    type="text"
                    name="lastNameUA"
                    value={landlordFormData.lastNameUA}
                    onChange={handleLandlordChange}
                    className="p-2 border rounded bg-gray-800 border-gray-800"
                    placeholder="Прізвище"
                  />
                </div>
                <div className="flex flex-row items-center space-x-4">
                  <p className="text-xl font-thin">Patronymic</p>
                  <input
                    type="text"
                    name="patronymicUA"
                    onChange={handleLandlordChange}
                    className="p-2 border rounded bg-gray-800 border-gray-800"
                    placeholder=""
                  />
                </div>
              </div>
              <div className="space-y-4 flex flex-col items-end">
                <div className="flex flex-row items-center space-x-4">
                  <p className="text-xl font-thin">Date of Birth</p>
                  <input
                    type="date"
                    name="birthday"
                    value={landlordFormData.birthday}
                    onChange={handleLandlordChange}
                    className="p-2 border rounded bg-gray-800 border-gray-800"
                  />
                </div>
                <div className="flex flex-row items-center space-x-4">
                  <p className="text-xl font-thin">Gender</p>
                  <select
                    name="genderUA"
                    value={landlordFormData.genderUA}
                    onChange={handleLandlordChange}
                    className="p-3 pr-9 border rounded bg-gray-800 border-gray-800"
                  >
                    <option value="Ч">Чоловіча</option>
                    <option value="Ж">Жіноча</option>
                  </select>
                </div>
              </div>
            </form>
            <div className="flex items-center justify-center">
              <div className="flex-grow border-t border-[#ffd700]"></div>
              <h3 className="text-2xl font-extrabold text-custom mx-4 text-center">
                Card of the Rental Object
              </h3>
              <div className="flex-grow border-t border-[#ffd700]"></div>
            </div>
            <div className="flex items-center justify-center my-10">
              <PropertyCard propertyData={firstProperty} />
            </div>
            {/* TODO: Add card after implementation */}
            <div className="flex items-center justify-center">
              <div className="flex-grow border-t border-[#ffd700]"></div>
              <h3 className="text-2xl font-extrabold text-custom mx-4 text-center">
                Additional information <br /> (rent data)
              </h3>
              <div className="flex-grow border-t border-[#ffd700]"></div>
            </div>
            <form className="my-10 flex flex-col space-y-4">
              <div className="flex flex-col space-y-4">
                <div className="flex flex-row items-center space-x-4">
                  <p className="text-xl font-thin">Start renting</p>
                  <input
                    type="date"
                    // name="birthday"
                    value={rentingFormData.start}
                    onChange={handleRentingChange}
                    className="p-2 border rounded bg-gray-800 border-gray-800"
                  />
                </div>
                <div className="flex flex-row items-center space-x-4">
                  <p className="text-xl font-thin">End renting</p>
                  <input
                    type="date"
                    // name="birthday"
                    value={rentingFormData.end}
                    onChange={handleRentingChange}
                    className="p-2 border rounded bg-gray-800 border-gray-800"
                  />
                </div>
              </div>
              <div className="flex flex-row gap-x-4 justify-between">
                <div className="flex flex-row items-center space-x-4">
                  <p className="text-xl font-thin">Price</p>
                  <input
                    type="text"
                    value={rentingFormData.price}
                    onChange={handleRentingChange}
                    className="p-2 border rounded bg-gray-800 border-gray-800"
                    placeholder=""
                  />
                </div>
                <div className="flex flex-row items-center space-x-4">
                  <p className="text-xl font-thin">Currency</p>
                  <select
                    className="p-3 pr-9 border rounded bg-gray-800 border-gray-800"
                    value={rentingFormData.currency}
                    name="currency"
                    onChange={handleRentingChange}
                  >
                    <option value="Ч">UAH</option>
                    <option value="Ж">USD</option>
                    <option value="Ч">EUR</option>
                  </select>
                </div>
                <div className="flex flex-row items-center space-x-4">
                  <p className="text-xl font-thin">Destination</p>
                  <input
                    type="text"
                    className="p-2 border rounded bg-gray-800 border-gray-800"
                    placeholder=""
                    value={rentingFormData.destination}
                    onChange={handleRentingChange}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-x-4 space-y-4">
                <div className="flex flex-row items-start space-x-4">
                  <p className="text-xl font-thin w-1/5">
                    Rental payment delay limit
                  </p>
                  <input
                    type="text"
                    className="p-2 border rounded bg-gray-800 border-gray-800"
                    placeholder=""
                    value={rentingFormData.rental_payment_delay_limit}
                    onChange={handleRentingChange}
                  />
                </div>
                <div className="flex flex-row items-start space-x-4">
                  <p className="text-xl font-thin w-1/5">Payment day number</p>
                  <input
                    type="text"
                    className="p-2 border rounded bg-gray-800 border-gray-80"
                    placeholder=""
                    value={rentingFormData.payment_day_number}
                    onChange={handleRentingChange}
                  />
                </div>
                <div className="flex flex-row items-start space-x-4">
                  <p className="text-xl font-thin w-1/5">
                    Min notice days for visit
                  </p>
                  <input
                    type="text"
                    className="p-2 border rounded bg-gray-800 border-gray-800"
                    placeholder=""
                    value={rentingFormData.min_notice_days_for_visit}
                    onChange={handleRentingChange}
                  />
                </div>
              </div>

              <div className="flex flex-row items-start space-x-4">
                <p className="text-xl font-thin w-1/5">Additional tenants</p>
                <input
                  type="text"
                  className="p-2 border rounded bg-gray-800 border-gray-800 "
                  placeholder="First name"
                />
                <input
                  type="text"
                  className="p-2 border rounded bg-gray-800 border-gray-800"
                  placeholder="Last name"
                />
              </div>

              <div className="flex flex-row items-start space-x-4">
                <p className="text-xl font-thin w-1/5">Allowed animals</p>
                <input
                  type="text"
                  className="p-2 border rounded bg-gray-800 border-gray-800"
                  placeholder=""
                />
                <input
                  type="text"
                  className="p-2 border rounded bg-gray-800 border-gray-800"
                  placeholder=""
                />
              </div>
            </form>
            <div className="flex items-center justify-center">
              <button
                onClick={handleSubmit}
                className="flex justify-center p-5 px-16 text-2xl mt-4 border-[#ffd700] bg-gray-600 border-2 bg-opacity-35 text-white rounded"
              >
                Apply
              </button>
            </div>
            {pdfUrl && (
              <div className="pdf-preview mt-4">
                <h3 className="text-xl font-bold">PDF Preview</h3>
                <iframe
                  src={pdfUrl}
                  width="100%"
                  height="600px"
                  title="PDF Preview"
                  frameBorder="0"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    // <div className="">
    //   <h2 className="text-xl font-bold mb-4">Tenant Form</h2>
    //   <form className="space-y-4">
    //     <input
    //       type="text"
    //       name="lastNameUA"
    //       value={tenantFormData.lastNameUA}
    //       onChange={handleTenantChange}
    //       className="w-full p-2 border rounded border-[#ffd700] bg-black"
    //       placeholder="Прізвище"
    //     />
    //     <input
    //       type="text"
    //       name="firstNameUA"
    //       value={tenantFormData.firstNameUA}
    //       onChange={handleTenantChange}
    //       className="w-full p-2 border rounded border-[#ffd700] bg-black"
    //       placeholder="Ім'я"
    //     />
    //     <input
    //       type="text"
    //       name="middleNameUA"
    //       value={tenantFormData.middleNameUA}
    //       onChange={handleTenantChange}
    //       className="w-full p-2 border rounded border-[#ffd700] bg-black"
    //       placeholder="По батькові"
    //     />
    //     <input
    //       type="date"
    //       name="birthday"
    //       value={tenantFormData.birthday}
    //       onChange={handleTenantChange}
    //       className="w-full p-2 border rounded border-[#ffd700] bg-black"
    //     />
    //     <select
    //       name="genderUA"
    //       value={tenantFormData.genderUA}
    //       onChange={handleTenantChange}
    //       className="w-full p-2 border rounded border-[#ffd700] bg-black"
    //     >
    //       <option value="Ч">Чоловіча</option>
    //       <option value="Ж">Жіноча</option>
    //     </select>
    //   </form>

    //   <h2 className="text-xl font-bold mt-6 mb-4">Landlord Form</h2>
    //   <form className="space-y-4">
    //     <input
    //       type="text"
    //       name="lastNameUA"
    //       value={landlordFormData.lastNameUA}
    //       onChange={handleLandlordChange}
    //       className="w-full p-2 border rounded border-[#ffd700] bg-black"
    //       placeholder="Прізвище"
    //     />
    //     <input
    //       type="text"
    //       name="firstNameUA"
    //       value={landlordFormData.firstNameUA}
    //       onChange={handleLandlordChange}
    //       className="w-full p-2 border rounded border-[#ffd700] bg-black"
    //       placeholder="Ім'я"
    //     />
    //     <input
    //       type="text"
    //       name="middleNameUA"
    //       value={landlordFormData.middleNameUA}
    //       onChange={handleLandlordChange}
    //       className="w-full p-2 border rounded border-[#ffd700] bg-black"
    //       placeholder="По батькові"
    //     />
    //     <input
    //       type="date"
    //       name="birthday"
    //       value={landlordFormData.birthday}
    //       onChange={handleLandlordChange}
    //       className="w-full p-2 border rounded border-[#ffd700] bg-black"
    //     />
    //     <select
    //       name="genderUA"
    //       value={landlordFormData.genderUA}
    //       onChange={handleLandlordChange}
    //       className="w-full p-2 border rounded border-[#ffd700] bg-black"
    //     >
    //       <option value="Ч">Чоловіча</option>
    //       <option value="Ж">Жіноча</option>
    //     </select>
    //   </form>

    //   <button
    //     onClick={handleSubmit}
    //     className="w-full p-2 mt-4 bg-blue-500 text-white rounded"
    //   >
    //     Submit
    //   </button>
    //   {pdfUrl && (
    //     <div className="pdf-preview mt-4">
    //       <h3 className="text-xl font-bold">PDF Preview</h3>
    //       <iframe
    //         src={pdfUrl}
    //         width="100%"
    //         height="600px"
    //         title="PDF Preview"
    //         frameBorder="0"
    //       />
    //     </div>
    //   )}
    // </div>
  );
};

export default UserForm;
