import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Dexter - Autonomous Financial Research Agent',
  description: 'AI-powered financial research and analysis platform built with Claude',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
