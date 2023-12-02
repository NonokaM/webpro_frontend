import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import db, { firestore } from "@/lib/firebase";

export default function Create() {
    const [image, setImage] = useState([]);
    const [subject, setSubject] = useState("");
    const [department, setDepartment] = useState("");
    const [grade, setGrade] = useState("");
    const [year, setYear] = useState();
    const [overviw, setOverviw] = useState("");
    const [errorMessage, setErrorMessage] = useState("")
    const handleImage = event => {
        const image = event.target.files[0];
        setImage(image);
    };

    const doCreate = async () => {
        if ( !image || !subject ) {
            setErrorMessage("必須の項目を入力してください");
            return;
        };

        
        await addDoc(collection(firestore, db, "posts"),{
            images: image,
            subject: subject,
            department: department,
            grade: grade,
            year: year,
            overviwd: overviw,
            postTime: firebase.firestore.FieldValue.serverTimestamp(),
        });           
        router.push('/');
    }

    return (
        <div>
            <h1>過去問を投稿</h1>
            <form doCreate={doCreate}>
                <input
                    type="file"
                    name="image"
                    placeholder="過去問をアップロード"
                    onChange={(e) => setImage(e.target.value)}
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
    )
}