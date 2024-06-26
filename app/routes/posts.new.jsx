import { Link, useNavigate } from "@remix-run/react";
import { useGuardAuthPage } from "../components/AuthContextProvider/useGuardAuthPage";
import { NewPostForm } from "../components/NewPostForm/NewPostForm";
import { useRefirectIfProfileNone } from "../components/UsersSettingForm/useRedirectIfProfileNone";

export default function NewPostPage() {
  const isEnableShowPage = useGuardAuthPage();
  useRefirectIfProfileNone();
  const navigate = useNavigate();

  if (!isEnableShowPage) return null;
  return (
    <div>
      <h1>新規投稿ページ</h1>
      <NewPostForm
        onSuccess={() => {
          // 投稿後にトップページに移動する
          navigate("/");
        }}
      />
      <p>
        <Link to="/">トップページへ</Link>
      </p>
    </div>
  );
}
