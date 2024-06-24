import { useEffect, useState } from "react";
import { AuthContext, authContextInitialState } from "./useAuthContext";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useState(authContextInitialState);
  useEffect(() => {
    const authService = getAuth();
    const unsubscribe = onAuthStateChanged(authService, (user) => {
      if (user) {
        setAuth({
          isInitialized: true,
          isSignedIn: Boolean(user.uid),
          user,
        });
      } else {
        setAuth({
          isInitialized: true,
          isSignedIn: false,
          user: null,
        });
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
