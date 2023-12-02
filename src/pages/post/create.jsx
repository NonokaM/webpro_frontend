import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { firebaseApp, firestore, storage } from "@/lib/firebase";
import Router from "next/router";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"

export default function Create() {
    const [image, setImage] = useState(null);
    const [subject, setSubject] = useState("");
    const [department, setDepartment] = useState("");
    const [grade, setGrade] = useState("");
    const [year, setYear] = useState();
    const [overviw, setOverviw] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    
    // const firestorage = firebaseApp.storage();

    //画像の処理
    const handleImage = (e) => {
        setImage(e.target.files[0]);

        e.preventDefault();
        console.log(image);
    };

    const doCreate = async () => {
        if ( !subject ) {
            setErrorMessage("必須の項目を入力してください");
            return;
        };

        try {
            const imageRef = ref(firestorage, image.name);
            await uploadBytes(imageRef, image);
        
            const imageUrl = await getDownloadURL(imageRef);

            await addDoc(collection(firestore, "posts"),{
                images: imageUrl,
                subject: subject,
                department: department,
                grade: grade,
                year: year,
                overviwd: overviw,
                postTime: serverTimestamp(),
            });

            Router.push('/');
        } catch (err) {
            console.log(err);
            setErrorMessage("エラーが発生しました")
        }
    };

    return (
        <div>
            <h1>過去問を投稿</h1>
            <form doCreate={doCreate}>
                <input
                    type="file"
                    name="image"
                    placeholder="過去問をアップロード"
                    onChange={handleImage}
                />

                <input
                    type="text"
                    name="subject"
                    placeholder="科目"
                    onChange={(e) => setSubject(e.target.value)}
                />

                <input
                    type="text"
                    name="department"
                    placeholder="学科"
                    onChange={(e) => setDepartment(e.target.value)}
                />

                <input
                    type="text"
                    name="grade"
                    placeholder="学年"
                    onChange={(e) => setGrade(e.target.value)}
                />

                <input
                    type="text"
                    name="year"
                    placeholder="年度"
                    onChange={(e) => setYear(e.target.value)}
                />

                <input
                    type="text"
                    name="overview"
                    placeholder="概要"
                    onChange={(e) => setOverviw(e.target.value)}
                />

                <button
                    type="submit"
                    onClick={(e)=>{
                    e.preventDefault();
                    doCreate();
                    }}
                >
                投稿
                </button>
            </form>
            {errorMessage && <p>{errorMessage}</p>}
            {/* <img src={imageUrl} alr="uploaded" /> */}
        </div>
    );
}
