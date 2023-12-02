import axios from 'axios';
import { useState } from 'react';

const useGenerateQuestion = () => {
    const [data, setData] = useState(null);

    const generateFunc = async (url) => {
      try {
        const response = await axios.get(`http://localhost:3000/generate?image_url=${url}`);
        console.log('API Response:', response.data);

        const { openai } = response.data;
        const { question, answer } = openai[0];

        setData({ questions: question[0], answers: answer[0] });
        return { success: true };
      } catch (err) {
        console.log(err);
        return { success: false };
      }
    };

    return { generateFunc, data };
};

export default useGenerateQuestion;
