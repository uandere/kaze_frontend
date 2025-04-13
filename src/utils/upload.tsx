import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { storage } from "../../firebase/firebaseConfig";

export const uploadFileToStorage = async (file: File, path: string): Promise<string> => {
  const fileRef = ref(storage, `${path}/${uuidv4()}-${file.name}`);
  await uploadBytes(fileRef, file);
  return getDownloadURL(fileRef);
};
