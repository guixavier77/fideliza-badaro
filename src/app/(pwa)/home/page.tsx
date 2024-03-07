'use client'
import BottomNavigation from '@/components/AppComponents/bottonNavigation'
import HistoryContent from '@/components/AppComponents/content/HistoryContent'
import HomeContent from '@/components/AppComponents/content/HomeContent'
import ProfileContent from '@/components/AppComponents/content/ProfileContent'
import QrCodeContent from '@/components/AppComponents/content/QrCodeContent'
import WalletContent from '@/components/AppComponents/content/WalletContent'
import HeaderHome from '@/components/AppComponents/headerHome'
import { useTab } from '@/contexts/tabContext'
import { TABS } from '@/utils/types/tabs'

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