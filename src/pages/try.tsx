import React, { useState } from "react";
import CustomCheckbox from "@/components/CCheckbox";
import CDropbox from "@/components/CDropbox";

const RentalAgreementForm: React.FC = () => {
  // Form state
  const [tenantPhone, setTenantPhone] = useState("+380973848216");
  const [landlordPhone, setLandlordPhone] = useState("+380973848216");
  const [tenantEmail, setTenantEmail] = useState("example@gmail.com");
  const [landlordEmail, setLandlordEmail] = useState("example@gmail.com");
  const [startDate, setStartDate] = useState("2025-01-01");
  const [endDate, setEndDate] = useState("2026-01-01");
  const [requisites, setRequisites] = useState("4441 0998 9888 6969");
  const [paymentDelay, setPaymentDelay] = useState("10");
  const [paymentDay, setPaymentDay] = useState("1");
  const [minNotice, setMinNotice] = useState("3");
  const [additionalTenants, setAdditionalTenants] = useState<string[]>([]);
  const [newTenant, setNewTenant] = useState("");
  const [animals, setAnimals] = useState<string[]>([]);
  const [newAnimal, setNewAnimal] = useState("");
  const [hasInsurance, setHasInsurance] = useState(false);
  const [hasUtilities, setHasUtilities] = useState(false);

  // Handle file uploads
  const handleFilesChange = (files: File[]) => {
    console.log("Files uploaded:", files);
  };

  // Add additional tenant
  const addTenant = () => {
    if (newTenant.trim()) {
      setAdditionalTenants([...additionalTenants, newTenant]);
      setNewTenant("");
    }
  };

  // Add animal
  const addAnimal = () => {
    if (newAnimal.trim()) {
      setAnimals([...animals, newAnimal]);
      setNewAnimal("");
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    console.log("Generate agreement");
    // Handle form submission logic here
  };

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Left side - Form */}
      <div className="w-2/5 p-8">
        <div className="flex items-center mb-8">
          <button className="flex items-center text-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back
          </button>
          <h1 className="text-2xl font-bold text-center flex-grow">Generate Agreement</h1>
        </div>

        {/* Contact Details */}
        <div className="mb-8">
          <h2 className="text-lg font-medium border-b border-gray-600 pb-2 mb-4">Contact Details</h2>
          
          <div className="mb-4">
            <label className="block text-white mb-2">Tenant phone</label>
            <input
              type="text"
              value={tenantPhone}
              onChange={(e) => setTenantPhone(e.target.value)}
              className="w-full bg-gray-800 rounded p-2 text-white"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-white mb-2">Landlord phone</label>
            <input
              type="text"
              value={landlordPhone}
              onChange={(e) => setLandlordPhone(e.target.value)}
              className="w-full bg-gray-800 rounded p-2 text-white"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-white mb-2">Tenant email</label>
            <input
              type="email"
              value={tenantEmail}
              onChange={(e) => setTenantEmail(e.target.value)}
              className="w-full bg-gray-800 rounded p-2 text-white"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-white mb-2">Landlord email</label>
            <input
              type="email"
              value={landlordEmail}
              onChange={(e) => setLandlordEmail(e.target.value)}
              className="w-full bg-gray-800 rounded p-2 text-white"
            />
          </div>
        </div>

        {/* Renting Period */}
        <div className="mb-8">
          <h2 className="text-lg font-medium border-b border-gray-600 pb-2 mb-4">Renting Period</h2>
          
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-white mb-2">Start</label>
              <input
                type="text"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full bg-gray-800 rounded p-2 text-white"
              />
            </div>
            
            <div className="flex-1">
              <label className="block text-white mb-2">End</label>
              <input
                type="text"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full bg-gray-800 rounded p-2 text-white"
              />
            </div>
          </div>
        </div>

        {/* Payments */}
        <div className="mb-8">
          <h2 className="text-lg font-medium border-b border-gray-600 pb-2 mb-4">Payments</h2>
          
          <div className="mb-4">
            <label className="block text-white mb-2">Requisites</label>
            <input
              type="text"
              value={requisites}
              onChange={(e) => setRequisites(e.target.value)}
              className="w-full bg-gray-800 rounded p-2 text-white"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-white mb-2">Rental payment delay limit</label>
            <input
              type="text"
              value={paymentDelay}
              onChange={(e) => setPaymentDelay(e.target.value)}
              className="w-24 bg-gray-800 rounded p-2 text-white"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-white mb-2">Payment day number</label>
            <input
              type="text"
              value={paymentDay}
              onChange={(e) => setPaymentDay(e.target.value)}
              className="w-24 bg-gray-800 rounded p-2 text-white"
            />
          </div>
        </div>

        {/* Additional */}
        <div className="mb-8">
          <h2 className="text-lg font-medium border-b border-gray-600 pb-2 mb-4">Additional</h2>
          
          <div className="mb-4 flex items-center">
            <label className="block text-white mb-2 mr-2">Min. notice days for visit</label>
            <div className="relative inline-block ml-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              value={minNotice}
              onChange={(e) => setMinNotice(e.target.value)}
              className="w-24 bg-gray-800 rounded p-2 text-white ml-auto"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-white mb-2">Additional tenants</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Full name"
                value={newTenant}
                onChange={(e) => setNewTenant(e.target.value)}
                className="flex-grow bg-gray-800 rounded p-2 text-white"
              />
              <button 
                onClick={addTenant}
                className="bg-gray-700 rounded p-2 text-white font-bold"
              >
                +
              </button>
            </div>
            {additionalTenants.map((tenant, index) => (
              <div key={index} className="bg-gray-700 rounded p-2 text-white mb-1">{tenant}</div>
            ))}
          </div>
          
          <div className="mb-4">
            <label className="block text-white mb-2">Allowed animals</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Breed name"
                value={newAnimal}
                onChange={(e) => setNewAnimal(e.target.value)}
                className="flex-grow bg-gray-800 rounded p-2 text-white"
              />
              <button 
                onClick={addAnimal}
                className="bg-gray-700 rounded p-2 text-white font-bold"
              >
                +
              </button>
            </div>
            {animals.map((animal, index) => (
              <div key={index} className="bg-gray-700 rounded p-2 text-white mb-1">{animal}</div>
            ))}
          </div>
          
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-yellow-500 text-black font-bold py-3 px-4 rounded"
        >
          Generate!
        </button>
      </div>
      
      {/* Right side - Black box for preview */}
      <div className="w-3/5 bg-black">
        {/* Preview will go here */}
      </div>
    </div>
  );
};

export default RentalAgreementForm;