import { useState, useEffect } from 'react';
import { storage } from '@/lib/firebase';
import { getDownloadURL, ref } from "firebase/storage";
import useGenerateQuestion from '@/hooks/useGenerateQuestion';

export default function TestAI() {
    const filePath = 'img2.JPG'
    const [url, setUrl] = useState('');
    const { generateFunc, data } = useGenerateQuestion(filePath);

    useEffect(() => {
        const pathReference = ref(storage, filePath);

        getDownloadURL(pathReference)
            .then((downloadUrl) => {
                setUrl(downloadUrl);
                generateFunc(downloadUrl);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [filePath, generateFunc]);

    return (
        <>
            <p>About</p>
            {url && <div>URL: {url}</div>}
            {data && (
                <div>
                    <h3>Questions</h3>
                    {data.questions.map((question, index) => (
                        <p key={index}>{question}</p>
                    ))}
                    <h3>Answers</h3>
                    {data.answers.map((answer, index) => (
                        <p key={index}>{answer}</p>
                    ))}
                </div>
            )}
        </>
    );
}
