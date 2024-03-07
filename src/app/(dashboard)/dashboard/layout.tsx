import AsideBar from '@/components/asideBar'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'
import { Providers } from '@/contexts/providers/provider'
import HeaderDash from '@/components/headerDash'
import FooterDash from '@/components/footerDash'



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
      <body className={`${inter.className} w-screen h-screen overflow-hidden  grid grid-cols-12 grid-rows-12`}>
        <Providers>
          <HeaderDash/>
          <AsideBar />
          <FooterDash/>

          <div className='col-start-4 col-end-13 row-start-2 row-end-13'>

          </div>

          {children}
        </Providers>
      </body>
    </html>
  )
}
