import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthContext } from "../AuthContextProvider/useAuthContext";
import { Link, useNavigate } from "@remix-run/react";
import "./NavigationMenu.css";

export const NavigationMenu = () => {
  const { isSignedIn, user } = useAuthContext();
  const navigate = useNavigate();

  return (
    <nav className="navigation-menu">
      {user !== null && (
        <Link to="/users/setting">
          <img
            src={user.photoURL ?? "/user-icon.svg"}
            alt="ユーザーのアイコン"
            height={30}
            className="user-icon"
          />
        </Link>
      )}
      {!isSignedIn ? (
        <button
          onClick={() => {
            const auth = getAuth();
            // メモ: Firebase Consoleの「Authentication」の「ログイン方法」からGoogle認証を有効にする必要がある
            const provider = new GoogleAuthProvider();
            signInWithPopup(auth, provider);
          }}
        >
          ログイン
        </button>
      ) : (
        <button
          onClick={() => {
            const auth = getAuth();
            auth.signOut();
            // ログアウトした場合は、今いるページの表示をリフレッシュする
            navigate(".", { replace: true });
          }}
        >
          ログアウト
        </button>
      )}
    </nav>
  );
};
