import { createContext, useContext } from "react";

/**
 * このコメントは jsdoc といい、TypeScriptの型定義をコメントとして書くための記法。
 * `user` に型定義を付けて、`user`の持つプロパティを他の箇所でVS Code越しに知りたいので使用している
 * @typedef {Object} AuthContextInitialState
 * @property {boolean} isInitialized
 * @property {boolean} isSignedIn
 * @property {import("firebase/auth").User | null} user
 */

/**
 * @type {AuthContextInitialState}
 */
export const authContextInitialState = {
  isInitialized: false,
  isSignedIn: false,
  user: null,
};
export const AuthContext = createContext(authContextInitialState);
export const useAuthContext = () => useContext(AuthContext);
