import { addDoc, collection, serverTimestamp, doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { firestore, storage } from "@/lib/firebase";
import Router from "next/router";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import styles from '@/styles/create.module.css';

const Create = () => {
    const [image, setImage] = useState(null);
    const [subject, setSubject] = useState("");
    const [department, setDepartment] = useState("");
    const [grade, setGrade] = useState("");
    const [year, setYear] = useState(null);
    const [overview, setOverview] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [images, setImages] = useState("");

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
                // imagesはまだ設定しない
            };

            await setDoc(docRef, docData);

            // Storageに画像を保存し、URLを取得
            const imageRef = ref(storage, `posts/${docRef.id}/${image.name}`);
            await uploadBytes(imageRef, image);
            const images = await getDownloadURL(imageRef);

            // Firestoreのドキュメントを更新して、imagesを追加
            await setDoc(docRef, { ...docData, images: images }, { merge: true });

            Router.push('/');
        } catch (err) {
            console.error(err);
            setErrorMessage("エラーが発生しました");
        }
    };

    return (
        <div className={styles.page}>
            <h1 className={styles.titol}>過去問を投稿!</h1>
            <form onSubmit={doCreate}>
                <input className={styles.img_app}
                    type="file"
                    name="image"
                    placeholder="過去問をアップロード"
                    onChange={handleImage}
                />

                <input className={styles.input_ln}
                    type="text"
                    name="subject"
                    placeholder="科目"
                    onChange={(e) => setSubject(e.target.value)}
                />

                <input className={styles.input_ln}
                    type="text"
                    name="department"
                    placeholder="学科"
                    onChange={(e) => setDepartment(e.target.value)}
                />

                <input className={styles.input_ln}
                    type="text"
                    name="grade"
                    placeholder="学年"
                    onChange={(e) => setGrade(e.target.value)}
                />

                <input className={styles.input_ln}
                    type="text"
                    name="year"
                    placeholder="年度"
                    onChange={(e) => setYear(e.target.value)}
                />

                <input className={styles.overview_ln}
                    type="text"
                    name="overview"
                    placeholder="概要"
                    onChange={(e) => setOverview(e.target.value)}
                />

                <button type="submit" className={styles.create_button}>投稿</button>
                </form>
            {errorMessage && <p>{errorMessage}</p>}
            {images && <img src={images} alt="uploaded" />}
        </div>
    );
};

export default Create;
