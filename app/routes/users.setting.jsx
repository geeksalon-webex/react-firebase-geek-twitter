import { Link, json, redirect, useLoaderData } from "@remix-run/react";

import { UsersSettingForm } from "../components/UsersSettingForm/UsersSettingForm";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

// ポイント解説
// `clientLoader` は、ページにアクセスしたとき、Reactコンポーネントを表示する前に実行される関数
// `return json()`を使って返した値は、`useLoaderData()`で取得できる
// React コンポーネントのライフタイムを意識せずに非同期処理を実装できるメリットがある
// (同じようなデータを取得する処理をReact コンポーネント内で`useEffect(() => {},[])`を使って実装することもできる)
//
// メモ
// auth.currentUser を使えば Promise を使わずに実装できるが、`<Link to="/users/setting" />`を使わずに直接 `/users/setting` にアクセスした場合に認証情報を取得できない
// しかし `new Pormise()` を使うことなく実装できるので、どちらを使うかは状況に応じて使い分けると良い
export const clientLoader = async () => {
  const auth = getAuth();
  // ポイント解説
  // `await new Pormise()` は `resolve()` が実行されるまで待機する
  // `resolve()` の第1引数は、`await new Pormise()` の戻り値になる
  // 参照(Promise): https://ja.javascript.info/promise-basics
  const result = await new Promise((resolve) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe();
      if (user) {
        getDoc(doc(db, "users", auth.currentUser.uid)).then((snapshot) => {
          const profileData = snapshot.data();
          resolve(json({ ...profileData }));
        });
      } else {
        resolve(redirect("/"));
      }
    });
  });
  return result;
};

export default function UsersSetting() {
  // ポイント解説
  // 以下のコメントは jsdoc と言い、`useLoaderData()`の戻り値の型を定義している
  // 無くても良いが、VS Codeの静的解析がうるさい場合は追加すると良い
  /**
   * @type {{ name: string }}
   */
  const profile = useLoaderData();
  return (
    <div>
      <h1>ユーザー設定</h1>
      <UsersSettingForm />
      <div>
        <h2>プロフィール情報</h2>
        {typeof profile?.name !== "string" ? (
          <p>プロフィールが設定されていません</p>
        ) : (
          <p>{profile.name}</p>
        )}
      </div>
      <p>
        <Link to="/">トップページへ</Link>
      </p>
    </div>
  );
}
