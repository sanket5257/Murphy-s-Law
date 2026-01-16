import '../globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin Panel - Murphy\'s Law',
  description: 'Content Management System',
}

export default function AdminLayout({ 
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        {children}
      </body>
    </html>
  )
}
