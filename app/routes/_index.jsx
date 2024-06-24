import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <div>
      <h1>トップページ</h1>
      <p>
        <Link to="/posts/new">新規投稿ページへ</Link>
      </p>
    </div>
  );
}
