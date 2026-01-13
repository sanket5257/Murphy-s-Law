import './globals.css'
import type { Metadata } from 'next'
import SmoothScrolling from '@/components/SmoothScrolling'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Murphys Law AI',
  description: 'Legal Intelligence Redefined - AI-powered legal assistance platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <SmoothScrolling>
          <Header />
          <main>
            {children}
          </main>
          <Footer />
        </SmoothScrolling>
      </body>
    </html>
  )
}