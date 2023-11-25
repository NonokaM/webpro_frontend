import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}
