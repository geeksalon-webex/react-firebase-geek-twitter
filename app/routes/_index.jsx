import { Link } from "@remix-run/react";
import { NewPostForm } from "../components/NewPostForm/NewPostForm";

export default function Index() {
  return (
    <div>
      <h1>トップページ</h1>
      <NewPostForm />
      <p>
        <Link to="/posts/new">新規投稿ページへ</Link>
      </p>
    </div>
  );
}
