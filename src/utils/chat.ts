import { 
    doc,
    setDoc,
    serverTimestamp,
    getDoc
  } from "firebase/firestore";
  
  export function getChatDocId(landlordId: string, listingId: string, tenantId: string): string {
    // E.g. landlordId_listingId_tenantId
    return `${landlordId}_${listingId}_${tenantId}`;
  }
  import { db } from "../../firebase/firebaseConfig";
  
  /**
   * Either create the chat doc for landlord-tenant-listing, 
   * or just return the existing doc (if it exists).
   */
  export  default async function createOrGetChat(
    landlordId: string,
    listingId: string,
    tenantId: string
  ): Promise<string> {
    // 1) Generate a stable doc ID
    const chatDocId = getChatDocId(landlordId, listingId, tenantId);
  
    // 2) Reference that doc
    const chatRef = doc(db, "chats", chatDocId);
  
    // 3) Optional: Check if doc already exists
    const existingSnap = await getDoc(chatRef);
  
    if (!existingSnap.exists()) {
      // Doesn’t exist -> create it
      await setDoc(chatRef, {
        landlordId,
        listingId,
        tenantId,
        createdAt: serverTimestamp(),
        messages: [],
      });
    }
    // If it already exists, we just do nothing: 
    // we "reuse" that doc so there's only 1 chat doc for that combo
  
    return chatDocId;
  }
  