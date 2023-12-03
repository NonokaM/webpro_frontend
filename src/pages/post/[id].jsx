import { useRouter } from 'next/router';
import styles from '@/styles/id.module.css';

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
      <div className={styles.big}>
        <div className={styles.title}>
          <p className={styles.kamoku}> {subject}</p>
          <div className={styles.when}>
            <p>{department}</p>
            <div className={styles.line}>/</div>
            <p>{grade}</p>
            <div className={styles.line}>/</div>
            <p>{year}</p>
          </div>
        </div>
        {images && <img className={styles.img} src={images} alt="Uploaded" />}
        <button className={styles.button} onClick={navigateToQuestionPage}>
          未来問作成
        </button>
      </div>
    </div>
  );
}
