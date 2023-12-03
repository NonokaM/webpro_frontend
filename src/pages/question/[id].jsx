import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import useGenerateQuestion from '@/hooks/useGenerateQuestion';
import { firestore } from '@/lib/firebase';

export default function PostPage() {
  const router = useRouter();
  const { id } = router.query;
  const [imageUrl, setImageUrl] = useState('');
  const { generateFunc, data } = useGenerateQuestion();

  useEffect(() => {
    if (id) {
      const docRef = doc(firestore, 'posts', id);
      getDoc(docRef).then(docSnap => {
        if (docSnap.exists()) {
          const imageData = docSnap.data();
          setImageUrl(imageData.images);
        } else {
          console.log("No such document");
        }
      }).catch(error => {
        console.error("Error getting document:", error);
      });
    }
  }, [id]);

  useEffect(() => {
    if (imageUrl) {
      generateFunc(imageUrl);
    }
  }, [imageUrl, generateFunc]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3>Questions</h3>
      {data.questions && data.questions.map((question, index) => (
        <p key={index}>{question}</p>
      ))}
      <h3>Answers</h3>
      {data.answers && data.answers.map((answer, index) => (
        <p key={index}>{answer}</p>
      ))}
    </div>
  );
}
