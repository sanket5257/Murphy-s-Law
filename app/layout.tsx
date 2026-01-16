import './globals.css'
import type { Metadata } from 'next'

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
        {children}
      </body>
    </html>
  )
}
