import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useUser } from "@/context/context";
import QRCode from "react-qr-code";

const SignPage = () => {
  const router = useRouter();
  const { tenant, landlord, listingId } = router.query;
  const { user } = useUser();

  const [error, setError] = useState(false);
  const [deeplink, setDeeplink] = useState<string | null>(null);

  // Poll for agreement status every 2 seconds.
  useEffect(() => {
    let interval: NodeJS.Timeout;

    const fetchAgreementStatus = async () => {
      if (!tenant || !landlord || !listingId || !user) return;
      try {
        const token = await user.getIdToken();
        const response = await fetch(
            `https://kazeapi.uk/agreement/status?tenant_id=${tenant}&landlord_id=${landlord}&housing_id=${listingId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
        );
        if (response.ok) {
          const data = await response.json();
          // Assuming the response contains a "status" field.
          if (data.status === "HalfSigned" || data.status === "Signed") {
            // Chat ID is built using the format: landlord_listingId_tenant.
            const chatId = `${landlord}_${listingId}_${tenant}`;
            router.push(`/chat/${chatId}`);
          }
        }
      } catch (err) {
        console.error("Error fetching agreement status:", err);
      }
    };

    interval = setInterval(fetchAgreementStatus, 2000);

    return () => clearInterval(interval);
  }, [tenant, landlord, listingId, user, router]);

  // Fetch the signing link for the QR code.
  useEffect(() => {
    const startSigning = async () => {
      if (!tenant || !landlord || !listingId || !user) {
        setError(true);
        return;
      }
      try {
        const token = await user.getIdToken();
        const url = `https://kazeapi.uk/agreement/get_sign_link?landlord_id=${landlord}&tenant_id=${tenant}&housing_id=${listingId}`;
        const res = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) throw new Error("Failed to get signing link");
        const data = await res.json();
        setDeeplink(data.deeplink || data.link);
      } catch (err) {
        console.error("Signing error:", err);
        setError(true);
      }
    };

    startSigning();
  }, [tenant, landlord, listingId, user]);

  // Manual redirection in case polling fails.
  const redirectToChat = () => {
    if (!tenant || !landlord || !listingId) return;
    const chatId = `${landlord}_${listingId}_${tenant}`;
    router.push(`/chat/${chatId}`);
  };

  if (error) return <div>Invalid request or signing failed.</div>;

  return (
      <div className="flex flex-col items-center gap-6">
        <h2 className="text-xl font-semibold">Scan this QR to sign</h2>
        {deeplink ? (
            <QRCode
                value={deeplink}
                className="border-[5px] border-[#ffd700] rounded"
                size={360}
            />
        ) : (
            <p>Generating QR code...</p>
        )}
        <div className="mt-4 text-center">
          <p className="text-sm">
            If auto-redirection doesn’t happen (or if your device is being stubborn),
            <span
                className="text-blue-500 underline cursor-pointer ml-1"
                onClick={redirectToChat}
            >
            click here to go to your chat.
          </span>
          </p>
        </div>
      </div>
  );
};

export default SignPage;
