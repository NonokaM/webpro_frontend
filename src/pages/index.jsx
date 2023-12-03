import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "@/lib/firebase";
import Link from 'next/link';
import styles from '@/styles/index.module.css';

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
          <Link className={styles.link}
            key={item.id}
            href={{
              pathname: `/post/${item.id}`,
              query: {
                subject: item.subject, department: item.department, grade: item.grade,
                year: item.year, overviw: item.overviw, postTime: item.postTime, images: item.images
              }
            }}
          >
            <div className={styles.big}>
              <p>{item.userName}</p>
              {item.postTime && <p className={styles.time}>{item.postTime.toDate().toString()}</p>}
              <div className={styles.title}>
                <p className={styles.kamoku}>{item.subject}</p>
                <div className={styles.when}>
                  <p className={styles.gakka}>{item.department}</p>
                  <div className={styles.line}>/</div>
                  <p className={styles.gakunen}>{item.grade}</p>
                  <div className={styles.line}>/</div>
                  <p className={styles.nendo}>{item.year}</p>
                </div>
              </div>
              <p className={styles.gaiyou}>{item.overviw}</p>
              {item.images && <img src={item.images} className={styles.img} alt="Uploaded" />}
            </div>
          </Link>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
