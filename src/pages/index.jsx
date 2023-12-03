import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "@/lib/firebase";
import Link from 'next/link';

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

  return (
    <div>
      {data.length > 0 ? (
        data.map((item, i) => (
          <Link
          key={item.id}
          href={{
            pathname: `/post/${item.id}`,
            query: { subject: item.subject, department: item.department, grade: item.grade,
              year: item.year, overviw: item.overviw, postTime: item.postTime, images: item.images}
          }}
          >
          <p>{item.userName}</p>
            <p>{item.subject}</p>
            <p>{item.department}</p>
            <p>{item.grade}</p>
            <p>{item.year}</p>
            <p>{item.overviw}</p>
            {item.postTime && <p>{item.postTime.toDate().toString()}</p>}
            {item.images && <img src={item.images} alt="Uploaded" />}
            <button></button>
          </Link>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
