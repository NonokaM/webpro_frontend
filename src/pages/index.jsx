import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../lib/firebase";

const TARGET_COLLECTION_NAME = "posts";

export default function Home() {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const col = collection(firestore, TARGET_COLLECTION_NAME);
        const querySnapshot = await getDocs(col);
        const ret = [];
        querySnapshot.forEach((doc) => {
          ret.push({ id: doc.id, ...doc.data() });
        });
        setData(ret);
      } catch (error) {
        console.error("Firestore data fetch error:", error);
      }
    }
    fetchData();
  }, []);

  console.log(data);

  return (
    <div>
      {data.length > 0 ? (
        data.map((item, i) => (
          <div key={i}>
            <p>{item.userName}</p>
            <p>{item.subject}</p>
            <p>{item.department}</p>
            <p>{item.grade}</p>
            <p>{item.year}</p>
            <p>{item.overviw}</p>
            {item.postTime && <p>{item.postTime.toDate().toString()}</p>}
            <button></button>
          </div> // 投稿を表示
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
