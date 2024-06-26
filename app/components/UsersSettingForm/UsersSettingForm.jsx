import { setDoc, doc, serverTimestamp, getDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../firebase";
import { useAuthContext } from "../AuthContextProvider/useAuthContext";
import "./UsersSettingForm.css";
import { useNavigate } from "@remix-run/react";

export const UsersSettingForm = () => {
  const { user } = useAuthContext();
  const [name, setName] = useState("");
  const [feedback, setFeedback] = useState({
    type: null,
    message: "",
  });
  const navigate = useNavigate();

  const createUserDoc = async () => {
    if (!user.uid || name === "") {
      setFeedback({
        type: "error",
        message: "プロフィール名を入力してください",
      });
      return;
    }

    try {
      const targetUserDocRef = doc(db, "users", user.uid);
      const snapshot = await getDoc(targetUserDocRef);

      if (snapshot.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          ...snapshot.data(),
          name,
          updatedAt: serverTimestamp(),
        });
        setFeedback({
          type: "success",
          message: "ユーザー情報を保存しました",
        });
      } else {
        await setDoc(doc(db, "users", user.uid), {
          name,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        setFeedback({
          type: "success",
          message: "ユーザー情報を更新しました",
        });
      }
      navigate(".", { replace: true });
    } catch (error) {
      setFeedback({
        type: "error",
        message: "エラーが発生しました",
      });
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createUserDoc();
      }}
    >
      <div className="users-setting-form__box">
        <div className="users-setting-form__box">
          <label className="users-setting-form__label">
            名前
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="users-setting-form__input"
            />
          </label>
        </div>
        <button type="button" onClick={createUserDoc}>
          保存
        </button>
      </div>
      {feedback.type && (
        <p
          className="users-setting-form__feedback"
          data-feedback-type={feedback.type}
        >
          {feedback.message}
        </p>
      )}
    </form>
  );
};
