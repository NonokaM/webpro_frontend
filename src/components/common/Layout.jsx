import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import { AuthFlagProvider } from '@/providers/AuthFlagProvider'

export default function Layout({ children }) {
  return (
    <AuthFlagProvider>
        <Header />
        <main>{children}</main>
        <Footer />
    </AuthFlagProvider>
  )
}
