import { useRouter } from 'next/router'

export default function Post() {
  const router = useRouter()
  const { id } = router.query

  return (
    <>
    <p>postID: {id}</p>
    </>
  )
}
