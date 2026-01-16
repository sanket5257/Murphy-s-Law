import SmoothScrolling from '@/components/SmoothScrolling'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SmoothScrolling>
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </SmoothScrolling>
  )
}
