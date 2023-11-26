import { useRouter } from 'next/router'

export default function Question() {
  const router = useRouter()
  const { id } = router.query

  return (
    <>
    <p>questionID: {id}</p>
    </>
  )
}
