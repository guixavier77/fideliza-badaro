
import AsideBar from '@/components/DashboardComponents/asideBar'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ContentDash from '@/components/DashboardComponents/contentDash'
import FooterDash from '@/components/DashboardComponents/footerDash'
import HeaderDash from '@/components/DashboardComponents/headerDash'
import { Providers } from '@/contexts/providers/provider'
import './globals.css'



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
          <HeaderDash />
          <AsideBar />
          <FooterDash />
          <ContentDash />


          {children}
        </Providers>
      </body>
    </html>
  )
}
