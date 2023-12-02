"use client"

import { storage} from '@/lib/firebase';
import { getDownloadURL, ref } from "firebase/storage";

export default function TestAI() {
    getDownloadURL(ref(storage, 'Img2.JPG'))
      .then((url) => {
        console.log(url);
        // `url` is the download URL for 'images/stars.jpg'

        // This can be downloaded directly:
        // const xhr = new XMLHttpRequest();
        // xhr.responseType = 'blob';
        // xhr.onload = (event) => {
        //   const blob = xhr.response;
        // };
        // xhr.open('GET', url);
        // xhr.send();

        // // Or inserted into an <img> element
        // const img = document.getElementById('myimg');
        // img.setAttribute('src', url);
      })
      .catch((error) => {
        // Handle any errors
      });

    // useEffect(() => {
    //     const getDownloadURL = async (filePath) => {
    //         try {
    //             const url = await storage.ref(filePath).getDownloadURL();
    //             console.log("File URL:", url);
    //           } catch (error) {
    //             console.error("Error getting download URL", error.message);
    //           }
    //     };

    //     // 使用例
    //     const filePath = "Img2.JPG";
    //     getDownloadURL(filePath);
    // }, []); // 空の依存配列を使用して、コンポーネントのマウント時にのみ実行

    return (
        <>
            <p>About</p>
        </>
    );
}
