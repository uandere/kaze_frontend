import {useState, useEffect} from "react";
import {useUser} from "@/context/context";
import getUserTokens from "@/utils/jwt";

function useDiiaAuth(): boolean | null {
  const {user} = useUser();
  const [isDiiaAuthenticated, setIsDiiaAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    let isMounted = true;

    const checkDiiaAuth = async () => {
      try {
        if (!user) {
          if (isMounted) setIsDiiaAuthenticated(null);
          return;
        }
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

        const data = await authResponse.json();

        if (isMounted) {
          setIsDiiaAuthenticated(data.result === true);
        }
      } catch (error) {
        console.error("Diia authentication check failed:", error);
        if (isMounted) {
          setIsDiiaAuthenticated(false);
        }
      }
    };

    checkDiiaAuth();

    return () => {
      isMounted = false;
    };
  }, [user]);

  return isDiiaAuthenticated;
}

export default useDiiaAuth;