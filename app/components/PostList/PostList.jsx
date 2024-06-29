import { useEffect, useState } from "react";
import { db } from "../../firebase";
import {
  Timestamp,
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import "./PostList.css";

export const PostList = ({ triggerKey = 0 }) => {
  const [tweets, setTweets] = useState([]);
  const [feedback, setFeedback] = useState("投稿を取得しています...");

  const fetchTweets = async () => {
    try {
      const queryRef = query(
        collection(db, "tweets"),
        orderBy("createdAt", "desc")
      );

      const snapshot = await getDocs(queryRef);

      // ポイント解説
      // ここの処理は`map()`を使わずとも簡単に書き直すこともできる
      // 参照(ChatGPT): https://chatgpt.com/share/092147b4-62d6-4c06-8d2e-c4fb194c853b
      const tweets = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        // ポイント解説
        // `new Timestamp()` を使うことで `{ seconds: number; nanoseconds: number; }` という構造になっている `doc.data().createdAt` を Timestamp に変換した後、
        // Timestamp が持つ `toDate()` メソッドを使って Date オブジェクトに変換できる。
        // 他にもTimestampが持つメソッドは https://firebase.google.com/docs/reference/js/firestore_.timestamp?hl=ja に紹介されているが、
        // JavaScriptでは、日付を Date オブジェクトで取り扱うことが多いので、`toDate()` メソッドでDateに変換してすると良い。
        createdAt: new Timestamp(
          doc.data().createdAt.seconds,
          doc.data().createdAt.nanoseconds
        ).toDate(),
      }));

      const usersSnapshot = await getDocs(
        query(collection(db, "users"), orderBy("createdAt", "desc"))
      );

      const tweetsWithName = tweets.map((tweet) => {
        // ポイント解説
        // `@ts-ignore` は VS Code が TypeScript の型チェックを無視するためのコメント。
        // `@ts-ignore` のコメントを消してみると、VS Code がエラーを表示する
        // @ts-ignore
        const user = usersSnapshot.docs.find((doc) => doc.id === tweet.userId);

        if (user) {
          return {
            ...tweet,
            userName: user.data().name,
          };
        } else {
          return {
            ...tweet,
            userName: "不明",
          };
        }
      });

      setTweets(tweetsWithName);
    } catch (error) {
      setFeedback("投稿の取得に失敗しました");
    }
  };

  // ポイント解説
  // useEffectは第二引数の依存配列が空の時は初回のレンダリング時のみ実行される。
  useEffect(() => {
    fetchTweets();
  }, []);

  // triggerKey が変更されたら、fetchTweets() を実行する。ことで、新規投稿があったときに投稿一覧を更新する。
  // ここでは 0 を初期値として扱っており、1以上は更新されたことを示す。
  useEffect(() => {
    if (triggerKey > 0) {
      fetchTweets();
    }
  }, [triggerKey]);

  return (
    <div>
      <h2>投稿一覧</h2>
      {tweets.length === 0 ? (
        <p>{feedback}</p>
      ) : (
        <ul>
          {tweets.map((tweet) => (
            <li key={tweet.id}>
              <div className="post-list__post-info">
                {/* ポイント解説: `.toLocaleString()` は Date が持つメソッド。参照(Date): https://ja.javascript.info/date  */}
                <div>
                  投稿日時：<time>{tweet.createdAt.toLocaleString()}</time>
                </div>
                <div>
                  投稿者：<span>{tweet.userName}</span>
                </div>
              </div>

              <p>{tweet.text}</p>

              {/* ポイント解説: `JSON.stringify(tweet, null, 2)` とすることで、`tweet` を JSON に変換して見やすく表示できる。デバッグのときに役立つ。  */}
              {/* <pre>{JSON.stringify(tweet, null, 2)}</pre> */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
