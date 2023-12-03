import { useRouter } from 'next/router';
import useGenerateURL from '@/hooks/useGenerateURL';

export default function PostPage() {
    const router = useRouter();
    const { id } = router.query;

    const filePath = `images/${id}.JPG`;
    const { url, questionsData } = useGenerateURL(filePath);

    if (!url || !questionsData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <p>About</p>
            {url && <div>URL: {url}</div>}
            {questionsData && (
                <div>
                    <h3>Questions</h3>
                    {questionsData.questions.map((question, index) => (
                        <p key={index}>{question}</p>
                    ))}
                    <h3>Answers</h3>
                    {questionsData.answers.map((answer, index) => (
                        <p key={index}>{answer}</p>
                    ))}
                </div>
            )}
        </div>
    );
}
