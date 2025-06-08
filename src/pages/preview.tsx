import { useEffect, useState } from "react";

const RenderAgreement = () => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    const url = localStorage.getItem("pdfBlobUrl");
    if (url) {
      setPdfUrl(url);
    }
  }, []);

  if (!pdfUrl) return <div>No PDF found.</div>;

  return (
    <iframe
      src={pdfUrl}
      style={{ width: "100%", height: "100vh" }}
      title="Rental Agreement"
      className="w-full h-full bg-white z-50"
    />
  );
};

export default RenderAgreement;
