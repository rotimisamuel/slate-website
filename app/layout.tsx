import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Slate — We build. We scale. We transform.',
  description: 'Slate Technologies Limited — custom software, AI strategy, e-learning platforms, and intelligent hardware. Engineered for African realities, delivered to global standard.',
  keywords: ['software development', 'AI strategy', 'e-learning', 'digital transformation', 'Nigeria', 'UK', 'technology consulting'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable} data-scroll-behavior="smooth">
      <body style={{ fontFamily: 'var(--font-inter), Inter, Arial, sans-serif' }} suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
