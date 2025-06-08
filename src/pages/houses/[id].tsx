// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import { doc, getDoc } from "firebase/firestore";
// import { db } from "../../../firebase/firebaseConfig";
// import Header from "@/components/header";
// import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
// import StairsIcon from "@mui/icons-material/Stairs";
// import CropFreeOutlinedIcon from "@mui/icons-material/CropFreeOutlined";
// import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
// import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
// import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";

// const featureList = [
//   { key: "dishwasher", label: "Dishwasher machine" },
//   { key: "washer", label: "Washer machine" },
//   { key: "microwave", label: "Microwave" },
//   { key: "gasStove", label: "Gas stove" },
//   { key: "WiFi", label: "Wi-Fi" },
//   { key: "TV", label: "TV" },
//   { key: "refrigerator", label: "Refrigerator" },
//   { key: "oven", label: "Oven" },
//   { key: "filtered_water", label: "Filtered water" },
//   { key: "gas_heating", label: "Gas heating" },
// ];

// const RentingPage: React.FC = () => {
//   const router = useRouter();
//   const { id } = router.query;
//   const [house, setHouse] = useState<any>(null);
//   const [user, setUser] = useState<any>(null);
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     if (id) {
//       const fetchHouseDetails = async () => {
//         setLoading(true);
//         const docRef = doc(db, "listings", id as string);
//         const docSnap = await getDoc(docRef);
//         if (docSnap.exists()) {
//           const houseData = docSnap.data();
//           setHouse(houseData);
//           console.log("Fetched House Details:", houseData);

//           const userId = houseData.userID;
//           if (userId) {
//             const userDocRef = doc(db, "users", userId);
//             const userDocSnap = await getDoc(userDocRef);
//             if (userDocSnap.exists()) {
//               setUser(userDocSnap.data());
//               console.log("Fetched User Details:", userDocSnap.data());
//             } else {
//               console.log("User not found!");
//             }
//           }
//         } else {
//           console.log("No such document!");
//         }
//         setLoading(false);
//       };

//       fetchHouseDetails();
//     }
//   }, [id]);

//   if (loading) return <div>Loading...</div>;
//   if (!house) return <div>House not found</div>;

//   return (
//      <div className="min-h-screen">
//       <Header />
//       <div className="mt-20">{user}</div>
//       <main className="mt-20">
//         <section className="flex flex-col md:flex-row max-w-full overflow-x-hidden mb-8 ml-20 border-t-[5px] border-l-[5px] border-b-[5px] border-[#ffd700] rounded-tl-lg rounded-bl-lg">
//           <div className="flex-1 h-full rounded overflow-hidden">
//             <img
//               src={house.photoGallery}
//               alt="Apartment"
//               className="w-full h-full object-cover rounded"
//             />
//           </div>
//           <div className=" rounded space-y-4 p-6">
//             <h2 className="text-4xl font-bold text-[#ffd700]">
//               {house.price} {house.currency}/month
//             </h2>
//             <p className="font-thin text-2xl">
//               {house.street}, {house.streetNumber}
//             </p>
//             <div className="flex flex-row gap-4 text-lg font-thin mt-2">
//               {house.firstTimeRental && (
//                 <p className="rounded border p-1  flex justify-center">
//                   First-time rental
//                 </p>
//               )}
//               <p className="rounded border p-1 flex justify-center">
//                 {house.apartmentComplexName}
//               </p>
//               {house.petFriendly && (
//                 <p className="rounded border p-1 flex justify-center">
//                   Pet-friendly
//                 </p>
//               )}
//               {house.childFriendly && (
//                 <p className="rounded border p-1 flex justify-center">
//                   Children-friendly
//                 </p>
//               )}
//             </div>
//             <div className="flex flex-row gap-6">
//               <div className="flex flex-row gap-2 items-center">
//                 <BedOutlinedIcon />
//                 <p className="font-thin">{house.numOfRooms} room</p>
//               </div>
//               <div className="flex flex-row gap-2 items-center">
//                 <StairsIcon />
//                 <p className="font-thin">{house.floor}th floor</p>
//               </div>
//               <div className="flex flex-row gap-2 items-center">
//                 <CropFreeOutlinedIcon />
//                 <p className="font-thin">{house.area} m^2</p>
//               </div>
//             </div>
//             <div className="border border-[#ffd700] rounded-xl p-4">
//               <div className="flex space-x-4 items-center">
//                 <img
//                   src={user.userPhoto}
//                   alt="User Avatar"
//                   width={120}
//                   height={120}
//                   className="rounded-full"
//                 />
//                 <div>
//                   <p className="font-bold">{user.userName}</p>
//                   <div className="flex flex-row gap-2">
//                     <VerifiedOutlinedIcon />
//                     <p className="font-thin">
//                       {user.successfullrentalsBefore} successful rentals before
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="flex space-x-4">
//               <button className="bg-white w-52 py-2 rounded text-black flex flex-row gap-2 justify-center">
//                 <ChatBubbleOutlineIcon />
//                 <p>Chat</p>
//               </button>
//               <button className="bg-white w-52 py-2 rounded text-black flex flex-row gap-2 justify-center">
//                 <DateRangeOutlinedIcon />
//                 <p>Book a review</p>
//               </button>
//             </div>
//           </div>
//         </section>

//         <section className=" flex flex-row p-20">
//           <div className="w-1/2">
//             <h3 className="text-3xl font-bold flex justify-center">
//               Description
//             </h3>
//             <p className="font-thin text-sm">{house.description}</p>
//             <h3 className="text-3xl font-bold flex justify-center">Details</h3>
//             <div>
//               <div className="grid grid-cols-3 gap-4 mt-8 font-bold">
//                 {featureList.map((feature) =>
//                   house && feature.key in house ? (
//                     <div
//                       key={feature.key}
//                       className="flex flex-row gap-2 mb-6 items-center"
//                     >
//                       <img src={`/${feature.key}.svg`} alt={feature.label} />
//                       <p>{feature.label}</p>
//                     </div>
//                   ) : null
//                 )}
//               </div>
//             </div>
//             <h3 className="text-3xl font-bold flex justify-center">
//               Amenities
//             </h3>
//             <div className="flex flex-row gap-4 mb-6 items-center mt-8 font-bold">
//               <img
//                 src="/parking.svg"
//                 alt="User Avatar"
//                 width={30}
//                 height={15}
//               />
//               <div className="flex flex-row gap-2">
//                 <p>Parking lot: </p>
//                 <p className="text-green-500">available</p>
//               </div>
//             </div>
//             <a href="/marketsNearby">
//               <div className="flex flex-row gap-4 mb-6 items-center font-bold">
//                 <img
//                   src="/shops.svg"
//                   alt="User Avatar"
//                   width={30}
//                   height={15}
//                 />
//                 <p className="text-[#ffd700] underline">
//                   See closest shops on the map
//                 </p>
//               </div>
//             </a>
//             <div className="flex flex-row gap-5 mb-6 items-center font-bold">
//               <img src="/food.svg" width={25} />
//               <p className="text-[#ffd700] underline">
//                 See closest restaraunts on the map
//               </p>
//             </div>
//           </div>
//           <div className="w-1/2 px-20">
//             <iframe
//               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3821.113429900473!2d24.02519045157188!3d49.81683494978086!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473ae7f32e64a0af%3A0xf03f310b5c573ded!2sUCU%20-%20Collegium%20Y.%20Slipoho!5e0!3m2!1sen!2sua!4v1735382084163!5m2!1sen!2sua"
//               width="600"
//               height="700"
//               style={{ border: 0, borderRadius: "20px" }}
//               loading="lazy"
//             ></iframe>
//           </div>
//         </section>
//         <div>
//           <div className="flex flex-row mb-6 items-center font-bold">
//             <img src="/emoji.svg" alt="User Avatar" width={240} height={15} />
//             <div className="flex flex-row gap-1 text-3xl ml-10">
//               <div>Liked the post?</div>
//               <div className="text-[#ffd700] underline">chat</div>
//               <div>with the owner or</div>
//               <div className="text-[#ffd700] underline">book a review </div>
//               <div>right away.</div>
//             </div>
//           </div>
//         </div>
//         <div>
//           <h1 className="flex justify-center text-4xl font-bold">
//             More posts like this...
//           </h1>
//         </div>
//         <div className="flex gap-8 flex-row my-8 mx-10">
//           <PropertyCard />
//           <PropertyCard />
//         </div>
//       </main>
//     </div>
//   );
// };

// export default RentingPage;

import React, { useEffect, useState } from "react";
import useDiiaAuth from "@/hooks/isAuthorized";
import { useRouter } from "next/router";
import {
  doc,
  getDoc,
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import Header from "@/components/header";
import { useUser } from "@/context/context";

const featureList = [
  { key: "isDishwasher", label: "Dishwasher machine" },
  { key: "isWasher", label: "Washer machine" },
  { key: "isMicrowave", label: "Microwave" },
  { key: "isGasStove", label: "Gas stove" },
  { key: "isWiFi", label: "Wi-Fi" },
  { key: "isTV", label: "TV" },
  { key: "isRefrigerator", label: "Refrigerator" },
  { key: "isOven", label: "Oven" },
  { key: "isFilteredWater", label: "Filtered water" },
  { key: "isGasHeating", label: "Gas heating" },
];

const RentingPage: React.FC = () => {
  const isDiiaAuthenticated = useDiiaAuth();
  const router = useRouter();
  const { id } = router.query;
  const [house, setHouse] = useState<any>(null);
  const [tenant, setTenant] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [listingId, setListingId] = useState<string | null>(null);
  const { user } = useUser();
  console.log(isDiiaAuthenticated);

  const fetchListingIdByUserId = async (
    targetUserId: string,
    currentListingId: string
  ) => {
    const db = getFirestore();
    const listingsRef = collection(db, "listings");
    const q = query(listingsRef, where("userId", "==", targetUserId));
    try {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const matchedDoc = querySnapshot.docs.find(
          (doc) => doc.id === currentListingId
        );
        return matchedDoc?.id || null;
      }
    } catch (error) {
      console.error("Error fetching listing by userId:", error);
    }
    return null;
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const docRef = doc(db, "listings", id as string);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const houseData = docSnap.data();
          setHouse(houseData);
          const userId = houseData.userId;

          if (userId) {
            const userRef = doc(db, "users", userId);
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) {
              const userData = userSnap.data();
              setTenant(userData);
              const foundListingId = await fetchListingIdByUserId(
                userId,
                id as string
              );
              setListingId(foundListingId);
            }
          }
        } else {
          console.log("No such listing document!");
        }
      } catch (error) {
        console.error("Error fetching listing details:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, [id]);

  console.log(listingId);

  if (loading) return <div>Loading...</div>;
  if (!house) return <div>House not found</div>;

  const encodedAddress = encodeURIComponent(
    `${house?.city}, ${house?.street}, ${house?.houseNumber}`
  );
  const params = new URLSearchParams({
    listingId: listingId || "",
    landlordId: house.userId,
    tenantId: user?.uid || "",
  });

  const Create_ChatId = (
    listingId: string,
    tenant: string,
    landlord: string
  ) => {
    return `${listingId}_${tenant}_${landlord}`;
  };

  const extractIds = (chatId: string) => {
    const [listingId, tenant, landlord] = chatId.split("_");
    return { listingId, tenant, landlord };
  };

  const chatID = Create_ChatId(listingId || "", user?.uid || "", house.userId);

  const handleClick = async () => {
    const docRef = doc(db, "chats", chatID);

    try {
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(docRef, {
          createdAt: new Date(),
          landlord_id: house.userId,
          listing_id: listingId,
          messages: [],
          tenant_id: user?.uid,
        });
        console.log("Updated Firestore.");
      } else {
        console.log("Chat does not exist.");
      }
      if (!isDiiaAuthenticated){
        router.push({
          pathname: "/signIn",
          query: { backlink: router.asPath },
        });
      } else {
        router.push({
          pathname: `/chat`,
          query: {
            listing_id: listingId,
            tenant_id: user?.uid,
            landlord_id: house.userId,
          },
        });
      }
      
    } catch (err) {
      console.error("Error accessing Firestore:", err);
      router.push({
        pathname: `/chat`,
        query: {
          listing_id: listingId,
          tenant_id: user?.uid,
          landlord_id: house.userId,
        },
      });
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="mt-20">
        <section className="flex flex-col md:flex-row max-w-full overflow-x-hidden mb-8 ml-20 border-t-[5px] border-l-[5px] border-b-[5px] border-[#ffd700] rounded-tl-lg rounded-bl-lg">
          <div className="flex-1 h-full rounded overflow-hidden">
            <img
              src={house.titleImage}
              alt="Apartment"
              className="w-1/2 h-full"
            />
          </div>
          <div className="rounded space-y-4 p-6">
            <h2 className="text-4xl font-bold text-[#ffd700]">
              {house.price} {house.currency} {house.frequency}
            </h2>
            <p className="font-thin text-2xl">
              {house.street}, {house.houseNumber}
            </p>
            <div className="flex flex-row gap-4 text-lg font-thin mt-2">
              {house.firstTimeRental && (
                <p className="rounded border p-1 flex justify-center">
                  First-time rental
                </p>
              )}
              {house.livingComplex && (
                <p className="rounded border p-1 flex justify-center">
                  {house.livingComplex}
                </p>
              )}
              {house.isPetFriendly && (
                <p className="rounded border p-1 flex justify-center">
                  Pet-friendly
                </p>
              )}
              {house.isChildrenFriendly && (
                <p className="rounded border p-1 flex justify-center">
                  Children-friendly
                </p>
              )}
            </div>
            <div className="flex flex-row gap-6">
              <p className="font-thin">{house.numberOfRooms} room</p>
              <p className="font-thin">{house.floorNumber}-th floor</p>
              <p className="font-thin">{house.area} m²</p>
            </div>
            <div className="border border-[#ffd700] rounded-xl p-4">
              <div className="flex space-x-4 items-center">
                <div>
                  <p className="font-bold">{tenant?.name}</p>
                  <p className="font-thin">
                    {tenant?.successfullrentalsBefore ?? 0} successful rentals
                    before
                  </p>
                </div>
              </div>
            </div>
            <div className="flex space-x-4">
              <button
                className="bg-white w-52 py-2 rounded text-black flex flex-row gap-2 justify-center"
                onClick={handleClick}
              >
                <p>Chat</p>
              </button>
              <button className="bg-white w-52 py-2 rounded text-black flex flex-row gap-2 justify-center">
                <p>Book a review</p>
              </button>
            </div>
          </div>
        </section>

        <section className="flex flex-row p-20">
          <div className="w-1/2">
            <h3 className="text-3xl font-bold flex justify-center">
              Description
            </h3>
            <p className="font-thin text-sm">{house.description}</p>
            <h3 className="text-3xl font-bold flex justify-center">Details</h3>
            <div className="grid grid-cols-3 gap-4 mt-8 font-bold">
              {featureList.map(
                (feature) =>
                  house[feature.key] && (
                    <div
                      key={feature.key}
                      className="flex flex-row gap-2 mb-6 items-center"
                    >
                      <img src={`/${feature.key}.svg`} alt={feature.label} />
                      <p>{feature.label}</p>
                    </div>
                  )
              )}
            </div>
            <h3 className="text-3xl font-bold flex justify-center">
              Amenities
            </h3>
            <div className="flex flex-row gap-4 mb-6 items-center mt-8 font-bold">
              <img src="/parking.svg" alt="Parking" width={30} />
              <p>
                Parking lot: <span className="text-green-500">available</span>
              </p>
            </div>
            <a href="/marketsNearby">
              <div className="flex flex-row gap-4 mb-6 items-center font-bold">
                <img src="/shops.svg" alt="Shops" width={30} />
                <p className="text-[#ffd700] underline">
                  See closest shops on the map
                </p>
              </div>
            </a>
            <div className="flex flex-row gap-5 mb-6 items-center font-bold">
              <img src="/food.svg" width={25} />
              <p className="text-[#ffd700] underline">
                See closest restaurants on the map
              </p>
            </div>
          </div>
          <div className="w-1/2 px-20">
            <iframe
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBVGbMD3oScLkBQdjrj38lZqwGPm9UfsTU&q=${encodedAddress}`}
              width="600"
              height="700"
              style={{ border: 0, borderRadius: "20px" }}
              loading="lazy"
            ></iframe>
          </div>
        </section>

        <div className="flex flex-row mb-6 items-center font-bold">
          <img src="/emoji.svg" alt="Emoji" width={240} />
          <div className="flex flex-row gap-1 text-3xl ml-10">
            <div>Liked the post?</div>
            <div className="text-[#ffd700] underline">chat</div>
            <div>with the owner or</div>
            <div className="text-[#ffd700] underline">book a review</div>
            <div>right away.</div>
          </div>
        </div>

        <div>
          <h1 className="flex justify-center text-4xl font-bold">
            More posts like this...
          </h1>
        </div>
      </main>
    </div>
  );
};

export default RentingPage;
