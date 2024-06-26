import { useState } from "react";
import { Link } from "@remix-run/react";
import { NewPostForm } from "../components/NewPostForm/NewPostForm";
import { PostList } from "../components/PostList/PostList";
import { useRefirectIfProfileNone } from "../components/UsersSettingForm/useRedirectIfProfileNone";

export default function Index() {
  const [triggerKey, setTriggerKey] = useState(0);
  useRefirectIfProfileNone();
  return (
    <div>
      <h1>トップページ</h1>
      <NewPostForm
        onSuccess={() => {
          setTriggerKey((prev) => prev + 1);
        }}
      />
      <PostList triggerKey={triggerKey} />
      <p>
        <Link to="/posts/new">新規投稿ページへ</Link>
      </p>
    </div>
  );
}
