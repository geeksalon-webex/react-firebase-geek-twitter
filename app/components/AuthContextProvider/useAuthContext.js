import { createContext, useContext } from "react";

export const authContextInitialState = {
  isInitialized: false,
  isSignedIn: false,
  user: null,
};
export const AuthContext = createContext(authContextInitialState);
export const useAuthContext = () => useContext(AuthContext);
