"use client";
import React, { useState, useEffect } from "react";
import Header from "@/components/header";
import { useRouter } from "next/router";
import EstateCard from "@/components/estateCard";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import { useUser } from "@/context/context";
import getUserTokens from "@/utils/jwt";

const Chatroom = () => {
  const router = useRouter();
  const { listing_id, tenant_id, landlord_id } = router.query;
  const { user } = useUser();
  const [isDiiaAuthenticated, setIsDiiaAuthenticated] = useState(false);
  const [houses, setHouses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [responseData, setResponseData] = useState<any | null>(null);
  const [info, setParsedInfo] = useState<{
    listingId: string;
    tenant: string;
    landlord: string;
  } | null>(null);
  const extractIds = (chatId: string | undefined | string[]) => {
    if (!chatId || typeof chatId !== "string") {
      return { listingId: "", tenant: "", landlord: "" };
    }

    const parts = chatId.split("_");
    if (parts.length !== 3) {
      console.warn("Invalid chatId format:", chatId);
      return { listingId: "", tenant: "", landlord: "" };
    }

    const [listingId, tenant, landlord] = parts;
    return { listingId, tenant, landlord };
  };

  useEffect(() => {
    const checkDiiaAuth = async () => {
      if (user) {
        try {
          // Get the Firebase JWT token (ID Token)
          const {idToken, userId} = await getUserTokens();

          // Send the JWT token as Authorization Bearer token to the Diia API
          const authResponse = await fetch(
            `https://kazeapi.uk/user/is_authorized?id=${user.uid}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${idToken}`, // Use JWT token here
              },
            }
          );
          
          const data = await authResponse.json();
          setIsDiiaAuthenticated(data.isAuthorized); // Assuming the response contains `isAuthorized`
        } catch (error) {
          console.error("Error checking Diia authentication:", error);
        }
      }
    };

    if (user) {
      checkDiiaAuth(); // Check Diia auth after the user is logged in
    }
  }, [user]);

  useEffect(() => {
    if (listing_id && tenant_id && landlord_id) {
      setParsedInfo({
        listingId: listing_id as string,
        tenant: tenant_id as string,
        landlord: landlord_id as string,
      });
    }
  }, [listing_id, tenant_id, landlord_id]);
  

  console.log("Chat ID:", info);

  // Fetch all houses
  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "listings"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Fetched houses:", data);
        setHouses(data);
      } catch (err) {
        console.error("Failed to fetch houses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHouses();
  }, []);

  const matchedHouse = houses.find((house) => house.id === info?.listingId);

  useEffect(() => {
    if (!info) return;
    const intervalId = setInterval(fetchAgreementStatus, 1000);
    return () => clearInterval(intervalId);
  }, [info]);

  const fetchAgreementStatus = async () => {
    if (!info) return;
    try {
      const response = await fetch(
        `https://kazeapi.uk/agreement/status?tenant_id=${info.tenant}&landlord_id=${info.landlord}&housing_id=${info.listingId}`
      );
      const data = await response.json();
      console.log("Agreement Status:", data);
      setResponseData(data);
    } catch (error) {
      console.error("Error fetching agreement status:", error);
    }
  };

  const generateCall = async () => {
    try {
      const {idToken, userId} = await getUserTokens();

      const tenantId = user?.uid;
      console.log("Tenant ID:", tenantId);
      console.log("Matched House:", matchedHouse);
      console.log("Matched House User ID:", matchedHouse?.userId);
      if (!info?.landlord || !info?.tenant) {
        console.error("Missing landlord_id or tenant_id");
        return;
      }

      const response = await fetch("https://kazeapi.uk/agreement/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          tenant_id: info.tenant,
          landlord_id: info.landlord,
          housing_id: info.listingId,
        }),
      });

      const contentType = response.headers.get("content-type");
      const rawText = await response.text();
      console.log("Raw response:", rawText);

      if (contentType?.includes("application/json")) {
        const data = JSON.parse(rawText);
        setResponseData(data);
      } else {
        console.error("Unexpected response type:", contentType);
      }
    } catch (error) {
      console.error("Error generating agreement:", error);
    }
  };

  // Poll the agreement status every second
  useEffect(() => {
    const intervalId = setInterval(fetchAgreementStatus, 1000);

    // Cleanup the interval when component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const handleViewAgreement = () => {
    if (!info) return;

    router.push({
      pathname: "/agreement",
      query: {
        listingId: info.listingId,
        tenant: info.tenant,
        landlord: info.landlord,
      },
    });
  };

  const seePDF = async () => {
    if (!info?.tenant || !info?.landlord || !info?.listingId || !user) return;

    try {
      setLoading(true);
      const {idToken, userId} = await getUserTokens();

      const url = `https://kazeapi.uk/agreement/get?tenant_id=${info.tenant}&landlord_id=${info.landlord}&housing_id=${info.listingId}`;

      const res = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch agreement");

      const blob = await res.blob();
      const pdfBlobUrl = URL.createObjectURL(blob);

      // Store it temporarily
      localStorage.setItem("pdfBlobUrl", pdfBlobUrl);

      // Redirect
      router.push("/preview");
    } catch (err) {
      console.error("Error fetching agreement:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="flex flex-row w-screen h-full min-h-screen">
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
            <div className="flex justify-center items-center w-1/2 h-full bg-[#131314] rounded-lg flex-col gap-32">
              <h1 className="text-4xl font-bold">Rental agreement</h1>

              {responseData?.status === "NotInitiated" && (
                <div className="flex flex-col items-center justify-center space-y-10 ">
                  <p className="font-thin text-3xl flex text-center justify-center px-16">
                    You hadn’t generated any agreements yet.
                  </p>
                  <button
                    className=" bg-[#2c2c2c] rounded-lg text-3xl px-4 py-2 mt-4 hover:border-[#ffd700] hover:text-[#ffd700]"
                    onClick={generateCall}
                  >
                    Generate
                  </button>
                </div>
              )}

              {responseData?.status?.Initiated?.confirmed_by === user?.uid && (
                <div className="flex flex-col items-center justify-center">
                  <p className="font-thin text-3xl flex text-center justify-center px-16">
                    <span className="font-bold mr-1">You</span>requested to
                    generate a rental agreement.
                  </p>
                  <p className="font-thin text-2xl mt-10 p-5 text-center">
                    Waiting for confirmation from other party...
                  </p>
                  <button className="border border-white rounded-lg text-3xl px-4 py-2 mt-10 hover:border-[#ffd700] hover:text-[#ffd700]">
                    Cancel
                  </button>
                </div>
              )}
              {responseData?.status?.Initiated?.confirmed_by !== user?.uid &&
                responseData?.status?.Initiated?.confirmed_by !== undefined &&
                responseData?.status?.Initiated?.confirmed_by !== null && (
                  <div className="flex flex-col items-center justify-center gap-10 text-3xl">
                    <p className=" text-center">
                      You are requested to generate a rental agreement.
                    </p>
                    <p>Do you agree?</p>
                    <div className="flex flex-row gap-10 justify-center">
                      <button
                        className="border border-white rounded-lg text-3xl px-4 py-2 mt-10 hover:border-[#ffd700] hover:text-[#ffd700]"
                        onClick={generateCall}
                      >
                        Yes
                      </button>
                      <button className="text-red-600 border border-red-600 rounded-lg text-3xl px-4 py-2 mt-10 hover:border-[#ffd700] hover:text-[#ffd700]">
                        No
                      </button>
                    </div>
                  </div>
                )}

              {responseData?.status === "Rejected" && (
                <div className="flex flex-col items-center justify-center">
                  <p className="font-thin text-3xl flex text-center justify-center px-16">
                    <span className="font-bold mr-1">You</span> requested to
                    generate a rental agreement.
                  </p>
                  <p className="font-thin text-2xl mt-10 text-red-600">
                    Other party rejected the request
                  </p>
                  <button className="border border-white rounded-lg text-3xl px-4 py-2 mt-10 hover:border-[#ffd700] hover:text-[#ffd700]">
                    Generate
                  </button>
                </div>
              )}

              {responseData?.status === "Generated" && (
                <div className="flex flex-col items-center justify-center gap-16">
                  <p className="font-thin text-3xl flex text-center justify-center px-16">
                    Rental agreement was generated successfully!
                  </p>
                  <button
                    className="border border-white rounded-lg text-3xl px-4 py-2 mt-4 hover:border-[#ffd700] hover:text-[#ffd700]"
                    onClick={handleViewAgreement}
                  >
                    View and Sign
                  </button>
                </div>
              )}
              {responseData?.status?.HalfSigned?.signed_by !== user?.uid &&
                responseData?.status?.HalfSigned?.signed_by !== undefined &&
                responseData?.status?.HalfSigned?.signed_by !== null && (
                  <div className="flex flex-col items-center justify-center ">
                    <p className="font-thin text-3xl flex text-center justify-center px-16">
                      Rental agreement was generated successfully!
                    </p>
                    <p className="font-thin text-2xl mt-10 text-green-600 text-center p-5 ">
                      Other party already signed the agreement and waits for
                      you!
                    </p>
                    <button
                      className="border border-white rounded-lg text-3xl px-4 py-2 mt-10 hover:border-[#ffd700] hover:text-[#ffd700]"
                      onClick={handleViewAgreement}
                    >
                      View and Sign
                    </button>
                  </div>
                )}
              {responseData?.status?.HalfSigned?.signed_by === user?.uid && (
                <div className="flex flex-col items-center justify-center ">
                  <p className="font-thin text-3xl flex text-center justify-center px-16">
                    Rental agreement was generated successfully!
                  </p>
                  <p className="font-thin text-2xl mt-10 text-green-600 text-center p-5 ">
                    You already signed the agreement and wait for other party!
                  </p>
                  <button
                    className="border border-white rounded-lg text-3xl px-4 py-2 mt-10 hover:border-[#ffd700] hover:text-[#ffd700]"
                    onClick={handleViewAgreement}
                  >
                    View and Sign
                  </button>
                </div>
              )}
              {responseData?.status === "Signed" && (
                <div className="flex flex-col items-center justify-center ">
                  <p className="font-thin text-3xl flex text-center justify-center px-16">
                    Rental agreement was generated and signed successfully!
                  </p>
                  <button
                    className="border border-white rounded-lg text-3xl px-4 py-2 mt-10 hover:border-[#ffd700] hover:text-[#ffd700]"
                    onClick={seePDF}
                  >
                    Get PDF
                  </button>
                  <button className="border border-white rounded-lg text-3xl px-4 py-2 mt-10 hover:border-[#ffd700] hover:text-[#ffd700]">
                    Get Signed PDF
                  </button>
                </div>
              )}
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
