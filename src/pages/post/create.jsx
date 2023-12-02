import { addDoc, collection, serverTimestamp, doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { firestore, storage } from "@/lib/firebase";
import Router from "next/router";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export default function Create() {
    const [image, setImage] = useState(null);
    const [subject, setSubject] = useState("");
    const [department, setDepartment] = useState("");
    const [grade, setGrade] = useState("");
    const [year, setYear] = useState(null);
    const [overview, setOverview] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const handleImage = (e) => {
        setImage(e.target.files[0]);
    };

    const doCreate = async (e) => {
        e.preventDefault();

        if (!subject || !image) {
            setErrorMessage("必須の項目を入力してください");
            return;
        }

        try {
            // Firestoreに先にデータを保存してドキュメントIDを取得
            const docRef = doc(collection(firestore, "posts"));
            const docData = {
                subject: subject,
                department: department,
                grade: grade,
                year: year,
                overview: overview,
                postTime: serverTimestamp(),
                // imageUrlはまだ設定しない
            };

            await setDoc(docRef, docData);

            // Storageに画像を保存し、URLを取得
            const imageRef = ref(storage, `posts/${docRef.id}/${image.name}`);
            await uploadBytes(imageRef, image);
            const imageUrl = await getDownloadURL(imageRef);
            setImageUrl(imageUrl);

            // Firestoreのドキュメントを更新して、imageUrlを追加
            await setDoc(docRef, { ...docData, images: imageUrl }, { merge: true });

            Router.push('/');
        } catch (err) {
            console.log(err);
            setErrorMessage("エラーが発生しました");
        }
    };

    return (
        <div>
            <h1>過去問を投稿</h1>
            <form onSubmit={doCreate}>
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
                    onChange={(e) => setOverview(e.target.value)}
                />

                <button type="submit">投稿</button>
                </form>
            {errorMessage && <p>{errorMessage}</p>}
            {imageUrl && <img src={imageUrl} alt="uploaded" />}
        </div>
    );
}
