import { storage } from '@/lib/firebase';
import { getDownloadURL, ref } from "firebase/storage";

export default function TestAI() {
    const pathReference = ref(storage, 'images/GDSC23-VideoChatBG-Yellow.png');

    getDownloadURL(pathReference)
    .then((url) => {
        console.log(url);
    })
    .catch((error) => {
        console.log(error);
    });

    return (
        <>
            <p>About</p>
        </>
    );
}
