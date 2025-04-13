import React, { useState, useEffect } from "react";
import { useUser } from "../context/context";
import QRCode from "react-qr-code";
import Header from "@/components/header";
import { useRouter } from "next/router";
import { db } from "../../firebase/firebaseConfig";
import { doc, setDoc, updateDoc } from "firebase/firestore";

const SharingLinkFetcher: React.FC = () => {
  const { user } = useUser();
  const router = useRouter();
  const [responseData, setResponseData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [authorized, setAuthorized] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");

  const fetchSharingLink = async () => {
    if (user) {
      setLoading(true);
      setError(null);
      try {
        const token = await user.getIdToken();
        const response = await fetch(
          "https://kazeapi.uk/user/get_sharing_link",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(
            `Failed to fetch sharing link. Status: ${response.status}`
          );
        }
        const data = await response.json();
        setResponseData(data);
      } catch (error) {
        console.error("Error fetching sharing link:", error);
        setError("Failed to fetch sharing link. Please try again later.");
      } finally {
        setLoading(false);
      }
    } else {
      setError("You must be logged in to fetch the sharing link.");
    }
  };

  const saveUserToFirestore = async (uid: string, name: string) => {
    try {
      await setDoc(
        doc(db, "users", uid),
        {
          uid,
          name,
          role: "tenant",
        },
        { merge: true }
      );
      console.log("User saved to Firestore (merged as tenant)");
    } catch (error) {
      console.error("Error saving user to Firestore:", error);
    }
  };

  const becomeLandlord = async () => {
    if (user) {
      try {
        await updateDoc(doc(db, "users", user.uid), {
          role: "landlord",
        });
        console.log("User updated to landlord");
        router.push("/profile");
      } catch (error) {
        console.error("Error updating user role:", error);
      }
    }
  };

  const becomeTenant = async () => {
    if (user) {
      try {
        await updateDoc(doc(db, "users", user.uid), {
          role: "tenant",
        });
        console.log("User updated to tenant");
        router.push("/profile");
      } catch (error) {
        console.error("Error updating user role to tenant:", error);
      }
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const checkAuthorization = async () => {
      if (!user) return;
      try {
        const idToken = await user.getIdToken();
        const response = await fetch(
          `https://kazeapi.uk/user/is_authorized?id=${user.uid}`,
          {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          }
        );
        console.log("Authorization response:", response);
        if (response.ok) {
          const data = await response.json();
          if (data?.name) {
            setAuthorized(true);
            setUserName(data.name);
            await saveUserToFirestore(user.uid, data.name);
            clearInterval(interval);
          }
        }
      } catch (err) {
        console.error("Authorization check failed:", err);
      }
    };

    if (user) {
      interval = setInterval(checkAuthorization, 1000);
    }

    return () => clearInterval(interval);
  }, [user]);

  useEffect(() => {
    fetchSharingLink();
  }, [user]);

  return (
    <div>
      <Header />
      <div className="mt-20 text-center">
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {!authorized && responseData?.deeplink && (
          <div className="flex  justify-center items-center flex-col h-[90vh] gap-10">
            <h1 className="text-6xl font-bold">
              Please, verify your profile using Diia
            </h1>
            <h2 className="text-4xl font-thin">
              Scan this QR-code using or click it
            </h2>
            <a href={responseData.deeplink}>
              <QRCode
                value={responseData.deeplink}
                className="border-[5px] border-[#ffd700] rounded"
                size={360}
              />
            </a>

            <a
              className="underlined text-2xl font-thin underline text-[#ffd700]"
              href="/"
            >
              No, take me to the home page
            </a>
          </div>
        )}

        {authorized && (
          <div className="space-x-4 flex  justify-center items-center flex-col h-[90vh] gap-10">
            <h1 className="text-4xl font-bold">Sign In as:</h1>
            <div className="flex flex-row gap-4">
              <button
                className="bg-[#1c1c1d] text-white px-4 py-2  w-80 h-80 rounded-3xl flex flex-col items-center justify-center hover:border-[#ffd700] hover:border-2"
                onClick={becomeTenant}
              >
                <img src="/search.svg" width={202}/>
                <p className="text-2xl font-thin">As Tenant</p>
              </button>
              <button
                className="bg-[#1c1c1d] text-white px-4 py-2  w-80 h-80 rounded-3xl flex flex-col items-center justify-center hover:border-[#ffd700] hover:border-2"
                onClick={becomeLandlord}
              >
                <img src="/landlord.svg" />
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
