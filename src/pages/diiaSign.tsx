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
        setDeeplink(data.deeplink || data.link); // safely extract string from response
      } catch (err) {
        console.error("Signing error:", err);
        setError(true);
      }
    };

    startSigning();
  }, [tenant, landlord, listingId, user]);

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
    </div>
  );
};

export default SignPage;
