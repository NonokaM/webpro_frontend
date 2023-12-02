import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "@/lib/firebase";
import Router from "next/router";

export default function Create() {
    const [image, setImage] = useState(null);
    const [subject, setSubject] = useState("");
    const [department, setDepartment] = useState("");
    const [grade, setGrade] = useState("");
    const [year, setYear] = useState();
    const [overviw, setOverviw] = useState("");
    // const [timestamp, setTimestamp] = useState(new Date());
    const [errorMessage, setErrorMessage] = useState("");
    
    //画像の処理
    // const handleImage = event => {
    //     const image = event.target.files[0];
    //     setImage(image);
    // };

    const doCreate = async () => {
        if ( !subject ) {
            setErrorMessage("必須の項目を入力してください");
            return;
        };

        //画像の処理
        // const changeImage = () => {
        //     if (!e.target.files) return;
        
        //     const imgObject = e.target.files[0];
        //     setImage(window.URL.createObjectURL(imgObject))   
        // };

        await addDoc(collection(firestore, "posts"),{
            images: image,
            subject: subject,
            department: department,
            grade: grade,
            year: year,
            overviwd: overviw,
            postTime: new Date(),
        });
        Router.push('/');
    };

    // useEffect(() => {
    //     const getCurrentTimestamp = () => {
    //         const timestamp = new Date();
    //         setTimestamp(timestamp);
    //     };

    //     getCurrentTimestamp();
    // }, []);

    return (
        <div>
            <h1>過去問を投稿</h1>
            <form doCreate={doCreate}>
                {/* <input
                    type="file"
                    name="image"
                    placeholder="過去問をアップロード"
                    onChange={handleImage}
                /> */}

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