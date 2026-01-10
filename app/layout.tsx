import './globals.css'
import type { Metadata } from 'next'
import SmoothScrolling from '@/components/SmoothScrolling'

export const metadata: Metadata = {
  title: 'Murphys Law',
  description: 'A people first digital studio',
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
          {children}
        </SmoothScrolling>
      </body>
    </html>
  )
}