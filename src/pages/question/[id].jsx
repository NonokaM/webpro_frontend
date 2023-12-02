import { useRouter } from 'next/router';

export default function Question() {
  const router = useRouter();
  const { id, subject, year } = router.query;

  // クエリパラメータが存在するかを確認
  if (router.isFallback || !router.isReady) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>投稿詳細</h1>
      <p>Question ID: {id}</p>
      <p>Subject: {subject}</p>
      <p>Year: {year}</p>
    </div>
  );
}
