import React, { useState, useEffect, useRef } from "react";
import { db } from "../../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import PropertyCard from "@/components/layout/PropertyCard";
import Header from "@/components/layout/Header";
import { useRouter } from "next/router";
import { useUser } from "@/context/context"; // Use the user context
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";

const HousesPage: React.FC = () => {
  const [houses, setHouses] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const itemsPerPage = 2;
  const router = useRouter();
  //const { user, isAuthViaDiia } = useUser(); // Access user and Diia authentication status from context
  const { user } = useUser(); // Access user from context
  const [clickCount, setClickCount] = useState(0);
  const clickTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleHouseClick = (house: any) => {
    setClickCount((prevClickCount) => {
      const newCount = prevClickCount + 1;

      if (clickTimeout.current) {
        clearTimeout(clickTimeout.current);
      }

      clickTimeout.current = setTimeout(() => {
        if (newCount === 1) {
          handleCardOneClick(house);
        } else if (newCount === 2) {
          handleCardClick(house.id);
        }
        setClickCount(0);
      }, 300);

      return newCount;
    });
  };

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

  const handleCardOneClick = (house: any) => {
    const { city, street, streetNumber } = house;
    if (city && street && streetNumber) {
      const address = `${city}, ${street} ${streetNumber}`;
      setSelectedAddress(address);
    }
  };

  const handleCardClick = (id: string) => {
    router.push(`/houses/${id}`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Google sign-in handler
  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Error signing in with Google: ", err.message);
      } else {
        console.error("An unknown error occurred");
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Error signing out: ", err.message);
      } else {
        console.error("An unknown error occurred during sign out");
      }
    }
  };

  // Check if the user is authenticated via Diia

  // If the user is not logged in, display login UI
  // if (!user && !isAuthViaDiia) {
  // if (!user) {
  //   return (
  //     <div className="min-h-screen flex flex-col items-center justify-center">
  //       <Header />
  //       <div>
  //         <div className="w-[582px] bg-neutral-600 h-[263px] flex flex-col items-center justify-center rounded-xl">
  //           <h1 className="font-bold text-white text-3xl">Sign Up</h1>
  //           <button
  //             onClick={handleGoogleSignIn}
  //             className="mt-4 bg-black text-white flex flex-row items-center justify-center rounded-lg px-6 py-2"
  //           >
  //             <img
  //               src="image_google.svg"
  //               alt="Google Icon"
  //               className="w-7 h-7 mr-4"
  //             />
  //             <div className="text-xl">Sign in with Google</div>
  //           </button>
  //           <div className="flex flex-row items-center justify-center text-xl font-thin mt-10">
  //             <p className="text-white">Already have an account?</p>
  //             <button
  //               className="underline text-yellow-400 ml-2"
  //               onClick={() => router.push("/signIn")}
  //             >
  //               Sign In
  //             </button>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  if (false && user) {
    return (
      <div>
        <Header />
        <div className="min-h-screen flex flex-col items-center justify-center">
          <h1 className="font-bold text-4xl">
            Next, verify your profile using Diia
          </h1>
          <p className="font-thin text-4xl">
            ... so that we can do everything to make your rent easier 👌
          </p>
          <button
            className="border border-[#ffd700] rounded-lg px-12 mt-4 flex flex-row items-center justify-center gap-4"
            onClick={() => router.push("/diia")}
          >
            <img src="diia.svg" />
            Verificate using Diia
          </button>
          <a
            href="/"
            className="mt-16 font-thin text-[#ffd700] hover:underline text-xl"
          >
            No, take me to the home page
          </a>
        </div>
      </div>
    );
  }

  // Pagination logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentHouses = houses.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(houses.length / itemsPerPage);

  if (loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <Header />
        <div className="flex flex-row w-full mt-36">
          <div className="w-1/2 p-5">
            <div className="flex flex-col space-y-4 mt-20 justify-center">
              <div className="w-full">
                <div className="flex flex-row items-center space-x-4 justify-center">
                  <p className="text-xl w-1/3">With price range: </p>
                  <input
                    type="text"
                    className="p-2 border rounded bg-gray-800 border-gray-800 w-1/4"
                  />
                  <p className="text-xl">to</p>
                  <input
                    type="text"
                    className="p-2 border rounded bg-gray-800 border-gray-800 w-1/4"
                  />
                  <select className="p-3 pr-9 border rounded bg-gray-800 border-gray-800 w-1/4">
                    <option value="Ч">UAH</option>
                    <option value="Ж">USD</option>
                    <option value="Ч">EUR</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-row items-center space-x-4 w-full">
                <select className="p-3 border rounded bg-gray-800 border-gray-800 w-1/3 text-white">
                  <option>All filters</option>
                  <option value="Ч">UAH</option>
                  <option value="Ж">USD</option>
                  <option value="Ч">EUR</option>
                </select>

                <select className="p-3 border rounded bg-gray-800 border-gray-800 w-1/3 text-white">
                  <option value="Ч">Sort by: time</option>
                  <option value="Ж">Sort by: price</option>
                  <option value="Ч">Sort by: number of rooms</option>
                </select>

                <button className="p-2 border rounded bg-gray-800 border-gray-800 w-1/3 flex items-center justify-center gap-2 text-white">
                  <img src="bell.svg" className="w-6" />
                  <p>Create notification</p>
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 p-5">
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
            <div className="flex justify-center mt-6">
              <div className="flex space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded ${
                    currentPage === 1 ? "hidden" : "bg-[#ffd700] text-black"
                  }`}
                >
                  Prev
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => handlePageChange(index + 1)}
                    className={`px-3 py-1 rounded ${
                      currentPage === index + 1
                        ? "bg-[#ffd700] text-black"
                        : "border border-[#ffd700] text-[#ffd700]"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded ${
                    currentPage === totalPages
                      ? "hidden"
                      : "bg-[#ffd700] text-black"
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          </div>

          {/* Sticky map iframe */}
          <div className="w-1/2 p-5 sticky top-20 h-screen overflow-hidden">
            <div className="flex justify-center h-full">
              <div className="relative w-full h-full">
                {/* Custom styled container with rounded corners and dark overlay */}
                <div className="absolute inset-0 bg-gray-900 rounded-3xl overflow-hidden shadow-2xl">
                  <iframe
                    className="h-full w-full"
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBVGbMD3oScLkBQdjrj38lZqwGPm9UfsTU&q=Lviv+${encodeURIComponent(
                      selectedAddress ||
                        "https://www.google.com/maps/embed/v1/place?key=AIzaSyBVGbMD3oScLkBQdjrj38lZqwGPm9UfsTU&q=Lviv"
                    )}`}
                    style={{
                      filter:
                        "invert(90%) hue-rotate(180deg) saturate(0.8) brightness(0.9)",
                      borderRadius: "24px",
                    }}
                  />
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default HousesPage;
