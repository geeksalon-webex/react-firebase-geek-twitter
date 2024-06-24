import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthContext } from "../AuthContextProvider/useAuthContext";
import "./NavigationMenu.css";

export const NavigationMenu = () => {
  const { isSignedIn, user } = useAuthContext();

  return (
    <nav className="navigation-menu">
      {user !== null && (
        <img
          src={user.photoURL ?? "/user-icon.svg"}
          alt="ユーザーのアイコン"
          height={30}
          className="user-icon"
        />
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
          }}
        >
          ログアウト
        </button>
      )}
    </nav>
  );
};
