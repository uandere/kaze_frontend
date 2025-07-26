import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import {useAuthenticator} from '@aws-amplify/ui-react';
import {
  fetchAuthSession,
  getCurrentUser,
} from '@aws-amplify/auth';

interface UserDIIAAuth {
  user: string | null;
}

type AmplifyUser = Awaited<ReturnType<typeof getCurrentUser>>;

interface UserContextType {
  user: AmplifyUser | null;
  diiaAuth: UserDIIAAuth | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({children}: { children: ReactNode }) => {
  const {user} = useAuthenticator((ctx) => [ctx.user]);
  const [diiaAuth, setDiiaAuth] = useState<UserDIIAAuth | null>(null);

  useEffect(() => {
    const checkDiia = async () => {
      if (!user) return setDiiaAuth(null);

      try {
        const {tokens} = (await fetchAuthSession());
        const idToken = tokens?.idToken?.toString();

        const url = `https://kazeapi.uk/user/is_authorized?id=${encodeURIComponent(
          user.userId,
        )}`;

        const res = await fetch(url, {
          headers: {Authorization: `Bearer ${idToken}`},
        });
        if (!res.ok) throw new Error('Diia check failed');
        setDiiaAuth(await res.json());
      } catch {
        setDiiaAuth(null);
      }
    };

    checkDiia();
  }, [user]);

  return (
    <UserContext.Provider value={{user, diiaAuth}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used within UserProvider');
  return ctx;
};
