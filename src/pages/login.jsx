import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import Link from "next/link"
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import { AuthFlagContext } from "@/providers/AuthFlagProvider";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const contextValue = useContext(AuthFlagContext);
  console.log(contextValue);

  const doLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage('未入力の項目があります');
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        router.push('/');
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/invalid-email':
          case 'auth/user-disabled':
          case 'auth/user-not-found':
          case 'auth/wrong-password':
            setErrorMessage('パスワードもしくはメールアドレスが間違っています。');
            break;
          default:
            setErrorMessage('エラーが発生しました。もう一度お試しください。');
            break;
        }
      });
  }

  return (
    <div>
      <h1>ログイン</h1>
      {errorMessage && <p>{errorMessage}</p>}

      <form onSubmit={doLogin}>
        <input
          type="email"
          name="email"
          placeholder="メールアドレス"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="パスワード"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button> ログイン </button>
      </form>

      <Link href="/register">
        新規登録はこちら
      </Link>
    </div>
  )
}
