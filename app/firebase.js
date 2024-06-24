// 必要な関数を import
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  //...
};

// Firebaseアプリオブジェクトを初期化
const app = initializeApp(firebaseConfig);
// Firestoreを読み込み、db(databaseの略)として export
export const db = getFirestore(app);
