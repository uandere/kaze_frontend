// "use client";
// import { createContext, useContext } from 'react';
// import { useAuthenticator } from '@aws-amplify/ui-react';
//
// export const AuthContext = createContext({ user: undefined });
// export const AuthProvider = ({ children }) => {
//     const { user } = useAuthenticator((c) => [c.user]);
//     return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
// };
// export const useAuth = () => useContext(AuthContext);
