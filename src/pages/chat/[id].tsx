import React, { useState, useEffect } from "react";
import Header from "@/components/header";
import { useRouter } from "next/router";
import EstateCard from "@/components/estateCard";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";

const Chatroom = () => {
  const router = useRouter();
  const { id } = router.query;

  const [houses, setHouses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Extract the prefix when `id` is available
  const getPrefix = (id: string | string[] | undefined): string | null => {
    if (!id) return null;
    const str = Array.isArray(id) ? id[0] : id;
    const index = str.indexOf("_");
    return index !== -1 ? str.substring(0, index) : str;
  };

  const houseId = getPrefix(id);

  // Fetch all houses
  useEffect(() => {
    const fetchHouses = async () => {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, "listings"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setHouses(data);
      setLoading(false);
    };

    fetchHouses();
  }, []);
  console.log("Houses:", houses);
  console.log("House ID:", houseId);
  // Find the house matching the ID prefix
  const matchedHouse = houses.find((house) => house.id === houseId);
  console.log("Matched House:", matchedHouse);

  return (
    <div>
      <Header />
      <div className="flex flex-row w-screen min-h-screen">
        {/* Left Side */}
        <div className="flex w-1/2 justify-center items-center text-6xl">
          Chat
        </div>

        {/* Right Side */}
        <div className="flex flex-col w-1/2 justify-start items-center pt-20">
          {/* Estate Card - pinned to top */}
          <div>
            {matchedHouse ? (
              <EstateCard propertyData={matchedHouse} />
            ) : (
              <div className="text-gray-400 text-xl">
                {loading ? "Loading..." : "House not found"}
              </div>
            )}
          </div>

          {/* Bottom controls */}
          <div className="flex flex-row items-center justify-center p-4 w-full mt-10 h-full">
            <div className="flex justify-center items-center w-1/2  h-full border-amber-50 border flex-col gap-32">
              <h1 className="text-4xl font-bold">Rental agreement</h1>
              <p className="font-thin text-3xl flex text-center justify-center px-16">
                You hadn’t generated any agreements yet.
              </p>
              <button className="border border-white rounded-lg  text-3xl px-4 py-2 mt-4 hover:border-[#ffd700] hover:text-[#ffd700]">
                Generate
              </button>
            </div>
            <div className="flex justify-center items-center w-1/2 text-6xl h-full border-amber-50 border">
              Calendar
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatroom;
