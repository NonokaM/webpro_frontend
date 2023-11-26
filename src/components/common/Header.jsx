import { useContext } from "react"
import { AuthFlagContext } from "@/providers/AuthFlagProvider";
import Link from "next/link"

export default function Header() {
  const { isAuth, setIsAuth } = useContext(AuthFlagContext);
  console.log(isAuth)

  return (
    <>
      <p>header</p>

      <nav>
        <ul>
        <Link href="/register">　/register</Link>
        <Link href="/login">　/login</Link>

        <Link href="/post/create">　/post/create</Link>
        <Link href="/post/1">　/post/[id]</Link>

        <Link href="/question/1">　/question/[id]</Link>

        <Link href="/user/1">　/user/[id]</Link>
        </ul>
      </nav>
    </>
  )
}
