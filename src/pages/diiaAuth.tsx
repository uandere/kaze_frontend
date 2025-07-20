import React, { useState, useEffect } from "react";
import { useUser } from "../context/context";
import QRCode from "react-qr-code";
import Header from "@/components/header";
import { useRouter } from "next/router";
import { db } from "../../firebase/firebaseConfig";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import Timer from "@/components/timer";
import Image from "next/image";
import getUserTokens from "@/utils/jwt";

const SharingLinkFetcher: React.FC = () => {
  const { user } = useUser();
  const router = useRouter();
  const backlink = router.query.backlink as string

  const [responseData, setResponseData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>("");
  const [isDiiaAuth, setIsDiiaAuth] = useState<boolean>(false);
  

  const fetchSharingLink = async () => {
    if (!user) {
      setError("You must be logged in to fetch the sharing link.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const {idToken, userId} = await getUserTokens();

      const response = await fetch("https://kazeapi.uk/user/get_sharing_link", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Status: ${response.status}`);
      }

      const data = await response.json();
      setResponseData(data);
    } catch (error) {
      console.error("Error fetching sharing link:", error);
      setError("Failed to fetch sharing link. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const saveUserToFirestore = async (uid: string, name: string) => {
    try {
      await setDoc(
        doc(db, "users", uid),
        {
          uid,
          role: "tenant",
        },
        { merge: true }
      );
    } catch (error) {
      console.error("Error saving user to Firestore:", error);
    }
  };

  const becomeLandlord = async () => {
    if (!user) return;
    try {
      await updateDoc(doc(db, "users", user.uid), {
        role: "landlord",
      });
      router.push(backlink || "/");
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  const becomeTenant = async () => {
    if (!user) return;
    try {
      await updateDoc(doc(db, "users", user.uid), {
        role: "tenant",
      });
      router.push(backlink || "/");
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const checkAuthorization = async () => {
      if (!user) return;

      try {
        const {idToken, userId} = await getUserTokens();

        const authResponse = await fetch(
          `https://kazeapi.uk/user/is_authorized?id=${userId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          }
        );

        if (authResponse.ok) {
          const authData = await authResponse.json();
          console.log("Authorization Data:", authData);
          setIsDiiaAuth(authData?.result === true);

          if (authData?.result === true) {
            const nameResponse = await fetch(
              `https://kazeapi.uk/user/name?id=${user.uid}`,
              {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${idToken}`,
                },
              }
            );

            if (nameResponse.ok) {
              const nameData = await nameResponse.json();
              const name = nameData.name;
              setUserName(name);

              await saveUserToFirestore(user.uid, name);

              clearInterval(interval);
            }
          }
        } else {
          setIsDiiaAuth(false);
        }
      } catch (err) {
        console.error("Authorization check failed:", err);
        setIsDiiaAuth(false);
      }
    };

    if (user) {
      interval = setInterval(checkAuthorization, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchSharingLink();
    }
  }, [user]);

  return (
    <div>
      <Header />
      <div className="mt-20 text-center">
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!user || !isDiiaAuth ? (
          <div className="flex flex-col justify-center items-center h-[90vh] gap-10">
            <h1 className="text-6xl font-bold">
              Please, verify your profile using Diia
            </h1>
            <h2 className="text-4xl font-thin">
              Scan this QR-code with Diia in-app scanner or just click on it
            </h2>
            <Timer />
            <a href={responseData?.deeplink}>
              <QRCode
                value={responseData?.deeplink || ""}
                className="border-[5px] border-[#ffd700] rounded"
                size={360}
              />
            </a>
            <a
              className="underline text-2xl font-thin text-[#ffd700]"
              href="/"
            >
              No, take me to the home page
            </a>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center h-[90vh] gap-10">
            <h1 className="text-4xl font-bold">Sign In as:</h1>
            <div className="flex flex-row gap-4">
              <button
                onClick={becomeTenant}
                className="bg-[#1c1c1d] text-white px-4 py-2 w-80 h-80 rounded-3xl flex flex-col items-center justify-center hover:border-[#ffd700] hover:border-2"
              >
                <Image src="/search.svg" width={202} height={202} alt="Tenant Icon" />

                <p className="text-2xl font-thin">As Tenant</p>
              </button>
              <button
                onClick={becomeLandlord}
                className="bg-[#1c1c1d] text-white px-4 py-2 w-80 h-80 rounded-3xl flex flex-col items-center justify-center hover:border-[#ffd700] hover:border-2"
              >
                 <Image src="/landlord.svg" width={202} height={202} alt="Tenant Icon" />
                <p className="text-2xl font-thin">As Landlord</p>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SharingLinkFetcher;
