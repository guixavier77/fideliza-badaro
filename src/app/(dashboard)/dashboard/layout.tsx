import AsideBar from '@/components/asideBar'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'
import { Providers } from '@/contexts/providers/provider'



const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FidelizaBadaro',
  description: 'Sua fidelidade digital',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} w-screen h-screen`}>
        <Providers>
          <AsideBar />

          {children}
        </Providers>
      </body>
    </html>
  )
}
