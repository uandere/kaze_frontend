import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { getAuth, onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import app from "../../firebase/firebaseConfig";

interface UserDIIAAuth {
  user: string | null;
}

interface UserContextType {
  user: FirebaseUser | null;
  diiaAuth: UserDIIAAuth | null;
}

interface UserProviderProps {
  children: ReactNode;
}
const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [diiaAuth, setDiiaAuth] = useState<UserDIIAAuth | null>(null);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        try {
          const encodedUid = encodeURIComponent(firebaseUser.uid);
          
          const requestUrl = `https://kazeapi.uk/user/is_authorized?id=${encodedUid}`;
          console.log("Request URL:", requestUrl);

          const response = await fetch(requestUrl, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (!response.ok) {
            throw new Error(`Failed to fetch DIIA auth status. Status: ${response.body}`);
          }

          const contentType = response.headers.get("Content-Type");
          if (contentType && contentType.includes("application/json")) {
            const data: UserDIIAAuth = await response.json();
            setDiiaAuth(data);
          } else {
            throw new Error("Response is not in JSON format");
          }
        } catch (error) {
          console.log("Error fetching DIIA auth status:", error);
          setDiiaAuth(null);
        }
      } else {
        setDiiaAuth(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user, diiaAuth }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
