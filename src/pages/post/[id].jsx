import { useRouter } from 'next/router';

export default function Post() {
  const router = useRouter();
  const { id, subject, department, grade, year, overview, postTime, images } = router.query;

  // クエリパラメータが存在するかを確認
  if (router.isFallback || !router.isReady) {
    return <p>Loading...</p>;
  }

  // 質問ページへのナビゲーションを行う関数
  const navigateToQuestionPage = () => {
    router.push(`/question/${id}`);
  };

  return (
    <div>
      <h1>投稿詳細</h1>
      <p>Question ID: {id}</p>
      <p>Subject: {subject}</p>
      <p>Year: {year}</p>
      <p>{department}</p>
      <p>{grade}</p>
      {images && <img src={images} alt="Uploaded" />}
      <button onClick={navigateToQuestionPage}>
        AIで未来問をつくる
      </button>
    </div>
  );
}
