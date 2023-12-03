import axios from 'axios';
import { useState } from 'react';

const useGenerateQuestion = () => {
    const [data, setData] = useState(null);

    const generateFunc = async (url) => {
      try {
        const response = await axios.get(`http://localhost:3000/generate?image_url=${url}`);
        console.log('API Response:', response.data);

        const { openai } = response.data;
        if (!openai || openai.length === 0) {
          console.log('No data found in response');
          return { success: false };
        }

        const questions = openai.map(item => item.question).flat();
        const answers = openai.map(item => item.answer).flat();

        setData({ questions, answers });
        return { success: true };
      } catch (err) {
        console.log(err);
        return { success: false };
      }
    };

    return { generateFunc, data };
};

export default useGenerateQuestion;
