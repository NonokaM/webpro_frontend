import { useState } from 'react';
import { auth } from '@/lib/firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { firestore } from '@/lib/firebase';
import { collection, addDoc } from "firebase/firestore";
import Link from "next/link"
import Router from 'next/router';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const doRegister = () => {
    if (!email || !password || !passwordConfirm || !username) {
      setErrorMessage('未入力の項目があります');
      return;
    }

    if (password !== passwordConfirm) {
      setErrorMessage('パスワードと確認用パスワードが一致しません');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;
      await addDoc(collection(firestore, "users"), {
        username: username,
        email: email,
        user_uid: user.uid
      });
      Router.push('/');
    })
    .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          setErrorMessage('このメールアドレスは既に登録されています。');
        } else {
          setErrorMessage('エラーが発生しました。もう一度お試しください。');
          console.log(error);
        }
      });
  }

  return (
    <div>
      <h1>新規登録</h1>
      {errorMessage && <p>{errorMessage}</p>}

      <form>
        <input
          type="email"
          name="email"
          placeholder="メールアドレス"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="パスワード（6文字以上）"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          name="passwordConfirm"
          placeholder="パスワード（再入力）"
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        <input
          type="text"
          name="username"
          placeholder="ユーザーネーム"
          onChange={(e) => setUsername(e.target.value)}
        />
        <button
          onClick={(e)=>{
            e.preventDefault();
            doRegister();
          }}
        >
        登録
        </button>
      </form>

      <Link href="/login">
        ログインする
      </Link>
    </div>
  )
}
