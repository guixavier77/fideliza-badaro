'use client'
import PointsAnimation from '@/components/animations/points'
import BottomNavigation from '@/components/bottonNavigation'
import HeaderHome from '@/components/headerHome'
import HomeContent from '@/components/content/HomeContent'
import { useTab } from '@/contexts/tabContext'
import { TABS } from '@/utils/types/tabs'
import React from 'react'
import WalletContent from '@/components/content/WalletContent'
import QrCodeContent from '@/components/content/QrCodeContent'
import HistoryContent from '@/components/content/HistoryContent'
import ProfileContent from '@/components/content/ProfileContent'

const Home = () => {
  const { tabSelected } = useTab();
  return (
    <div className="bg-light " >
      <HeaderHome />

      <div className='bg-light h-screen rounded-t-40 absolute w-screen top-20 pt-10 px-6'>
        <HomeContent hidden={tabSelected !== TABS.HOME} />
        <WalletContent hidden={tabSelected !== TABS.WALLET} />
        <QrCodeContent hidden={tabSelected !== TABS.QRCODE} />
        <HistoryContent hidden={tabSelected !== TABS.HISTORY} />
        <ProfileContent hidden={tabSelected !== TABS.PROFILE} />
      </div>

      <BottomNavigation />


    </div>
  )
}

export default Home