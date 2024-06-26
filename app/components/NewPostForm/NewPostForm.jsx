import { useState } from "react";
import { useAuthContext } from "../AuthContextProvider/useAuthContext";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";
import "./NewPostForm.css";

// ポイント解説
// `({ onSuccess = () => {} }) => {}` は 分割代入とデフォルトの引数の組み合わせを行っており
// `({ onSuccess }) => {}` で 第一引数の引数を分割して `onSuccess` を取り出している
// `({ onSuccess = () => {} }) => {}` で `onSuccess` が undefined だったときの初期値を設定している
// 参照(分割代入): https://ja.javascript.info/destructuring-assignment
// 参照(デフォルト引数): https://ja.javascript.info/function-basics#ref-173
export const NewPostForm = ({ onSuccess = () => {} }) => {
  const { user } = useAuthContext();
  const [text, setText] = useState("");
  const [feedback, setFeedback] = useState({
    type: null,
    message: "",
  });
  const addNewPost = async () => {
    if (text === "") {
      setFeedback({ type: "error", message: "何か入力してください" });
      return;
    }

    // ポイント解説
    // `user?.uid` の `?` はオプショナルチェーンといい user.uid が null または undefined だったときに undefined を返してくれる
    // `user?.uid ?? ""` の `??` はNull 合体演算子といい user?.uid が undefined だったときは "" を返してくれる
    // 参照(オプショナルチェーン): https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Optional_chaining
    // 参照(Null 合体演算子): https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator
    const userId = user?.uid ?? "";
    if (userId === "") {
      setFeedback({
        type: "error",
        message: "ユーザー情報が取得できません",
      });
      return;
    }

    const postRef = collection(db, "tweets");

    const newPost = {
      text,
      userId: user.uid,
      // ポイント解説
      // `serverTimestamp()` は firestore がデータを保存するときに時刻を保存するための関数
      // `new Date()`を用いても時刻を保存できる。(ただし、クライアント(ブラウザ)で処理した時間になる)
      createdAt: serverTimestamp(),
    };

    try {
      // firestore に保存する
      await addDoc(postRef, newPost);

      // 入力欄を空にする
      setText("");

      // feedbackを表示する
      setFeedback({
        type: "success",
        message: "ポストを投稿しました",
      });

      // 2秒後にfeedbackを消す
      setTimeout(() => {
        setFeedback({ type: null, message: "" });
      }, 2000);

      // 親コンポーネントから渡している追加の処理があれば実行する
      onSuccess();
    } catch (e) {
      setFeedback({
        type: "error",
        message: "ポストに失敗しました",
      });
    }
  };

  return (
    <form
      onSubmit={(e) => {
        // ポイント解説
        // `preventDefault()` は form.submit イベントのデフォルトの動作をキャンセルする。
        // ここではエンターキーなどでsubmitイベントが起きた時に `addNewPost()` を実行したいため、onSubmitを上書きしている
        e.preventDefault();
        addNewPost();
      }}
    >
      <div className="new-post-form__box">
        <input
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          className="new-post-form__input"
        />
        <button type="button" onClick={addNewPost}>
          投稿する
        </button>
      </div>
      {feedback.type && (
        <p
          className="new-post-form__feedback"
          data-feedback-type={feedback.type}
        >
          {feedback.message}
        </p>
      )}
    </form>
  );
};
