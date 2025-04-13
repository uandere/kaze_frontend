// components/StartChatButton.tsx
"use client";

import { useState } from "react";
import  createOrGetChat from "@/utils/chat"; // adjust path if needed
import { useRouter } from "next/navigation";

type StartChatButtonProps = {
  landlordId: string;
  tenantId: string;
  listingId: string;
};

export default function StartChatButton({ landlordId, tenantId, listingId }: StartChatButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleStartChat = async () => {
    setLoading(true);
    try {
      const chatId = await createOrGetChat(landlordId, listingId, tenantId);
      router.push(`/chat/${chatId}`); // navigate to chat page
    } catch (error) {
      console.error("Error starting chat:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      onClick={handleStartChat}
      disabled={loading}
    >
      {loading ? "Starting Chat..." : "Message Landlord"}
    </button>
  );
}
