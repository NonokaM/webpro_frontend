import { useContext } from "react"
import { AuthFlagContext } from "@/providers/AuthFlagProvider";

export default function Header() {
  const { isAuth, setIsAuth } = useContext(AuthFlagContext);
  console.log(isAuth)

  return (
    <>
      <p>header</p>
    </>
  )
}
