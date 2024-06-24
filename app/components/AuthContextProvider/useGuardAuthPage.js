import { useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useGuardAuthPage = () => {
  const { isSignedIn, isInitialized } = useAuthContext();
  const [isEnableShowPage, setIsEnableShowPage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isInitialized) return;
    if (isSignedIn) {
      setIsEnableShowPage(true);
    } else {
      setIsEnableShowPage(false);
      navigate("/");
    }
  }, [isInitialized, isSignedIn, navigate]);
  return isEnableShowPage;
};
