import { useGuardAuthPage } from "../components/AuthContextProvider/useGuardAuthPage";

export default function NewPostPage() {
  const isEnableShowPage = useGuardAuthPage();

  if (!isEnableShowPage) return null;
  return (
    <div>
      <h1>新規投稿ページ</h1>
    </div>
  );
}
