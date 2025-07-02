import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'
import { Toaster } from '@/components/ui/toaster'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Kartik Digital Store - Premium Digital Products & Services',
  description: 'Your one-stop destination for premium digital products and professional services. Built with passion for developers, designers, and entrepreneurs.',
  keywords: 'digital products, templates, components, web development, design',
  authors: [{ name: 'Kartik Singh' }],
  openGraph: {
    title: 'Kartik Digital Store',
    description: 'Premium digital products and professional services',
    url: 'https://kartik-digital-store.vercel.app',
    siteName: 'Kartik Digital Store',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kartik Digital Store',
    description: 'Premium digital products and professional services',
    images: ['/og-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <SessionProvider>
          <div className="min-h-screen bg-background text-foreground">
            <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-teal-900/20 pointer-events-none" />
            <div className="relative z-10">
              <Navbar />
              <main className="min-h-screen">
                {children}
              </main>
              <Footer />
            </div>
          </div>
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  )
}