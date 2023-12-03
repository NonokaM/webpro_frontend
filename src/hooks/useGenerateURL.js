// import { useState, useEffect } from 'react';
// import { storage } from '@/lib/firebase';
// import { getDownloadURL, ref } from "firebase/storage";
// import useGenerateQuestion from '@/hooks/useGenerateQuestion';

// function useGenerateURL(filePath) {
//     const [url, setUrl] = useState('');
//     const { generateFunc, data } = useGenerateQuestion();

//     useEffect(() => {
//         const pathReference = ref(storage, filePath);

//         getDownloadURL(pathReference)
//             .then((downloadUrl) => {
//                 setUrl(downloadUrl);
//                 generateFunc(downloadUrl);
//             })
//             .catch((error) => {
//                 console.log(error);
//             });
//     }, [filePath, generateFunc]);

//     return { url, questionsData: data };
// }

// export default useGenerateURL;
