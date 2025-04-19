import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "@/context/context";

const AgreementPage = () => {
  const router = useRouter();
  const { listingId, tenant, landlord } = router.query;
  const { user } = useUser();

  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!tenant || !landlord || !listingId || !user) return;

    const fetchAgreement = async () => {
      try {
        const token = await user.getIdToken();
        const url = `https://kazeapi.uk/agreement/get?tenant_id=${tenant}&landlord_id=${landlord}&housing_id=${listingId}`;

        const res = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch agreement");

        const blob = await res.blob();
        const pdfBlobUrl = URL.createObjectURL(blob);
        setPdfUrl(pdfBlobUrl);
      } catch (err) {
        console.error("Error fetching agreement:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAgreement();
  }, [tenant, landlord, listingId, user]);

  const handleRedirectToSign = () => {
    router.push({
      pathname: "/diiaSign",
      query: {
        tenant,
        landlord,
        listingId,
      },
    });
  };

  if (loading) return <div>Loading agreement...</div>;
  if (!pdfUrl) return <div>No agreement available.</div>;

  return (
    <div style={{ height: "100vh" }}>
      <div className="mb-1 р-32 flex justify-center gap-10">
        <button onClick={handleRedirectToSign} className="text-3xl border p-5 rounded-lg flex flex-row gap-5 justify-center items-center"><p>Sign with</p><img src="DiiaSignature_W.svg" className="h-10 pt-1"/></button>
        <button className="text-3xl border rounded-lg p-5">I’ll sign by hand </button>
      </div>
      <iframe
        src={pdfUrl}
        style={{ width: "100%", height: "90%" }}
        title="Rental Agreement"
      />
    </div>
  );
};

export default AgreementPage;
