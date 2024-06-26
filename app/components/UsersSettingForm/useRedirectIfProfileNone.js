import { useEffect } from "react";
import { useAuthContext } from "../AuthContextProvider/useAuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useLocation, useNavigate } from "@remix-run/react";

export const useRefirectIfProfileNone = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkExsitsProfileAndRedirectToUsersSetting = async () => {
      if (location.pathname.startsWith("/users/setting")) return;
      if (!user?.uid) return;

      const targetUserDocRef = doc(db, "users", user.uid);
      const snapshot = await getDoc(targetUserDocRef);
      const isAlreadyExistsProfile = snapshot.exists();
      if (!isAlreadyExistsProfile) {
        navigate("/users/setting");
      }
    };
    checkExsitsProfileAndRedirectToUsersSetting();
  }, [location.pathname, navigate, user?.uid]);
};
