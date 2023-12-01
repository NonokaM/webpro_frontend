import { useState } from "react";


export default function Create() {
    const [image, setImage] = useState([]);
    const [subject, setSubject] = useState("");
    const [department, setDepartment] = useState("");
    const [grade, setGrade] = useState("");
    const [year, setYear] = useState();
    const [overviw, setOverviw] = useState("");

    const doCreate = () => {
        if ( !image ) {
            setErrorMessage("")
        }
    }
}