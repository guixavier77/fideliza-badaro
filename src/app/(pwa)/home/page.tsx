'use client'
import BottomNavigation from '@/components/AppComponents/bottonNavigation'
import AppHomeContent from '@/components/AppComponents/contentAdminUser/HomeContent'
import AppLauncherPointsContent from '@/components/AppComponents/contentAdminUser/LauncherPointsContent'
import AppNotificationsContent from '@/components/AppComponents/contentAdminUser/NotificationsContent'
import AppRewardsContent from '@/components/AppComponents/contentAdminUser/RewardsContent'
import HistoryContent from '@/components/AppComponents/contentCommonUser/HistoryContent'
import HomeContent from '@/components/AppComponents/contentCommonUser/HomeContent'
import ProfileContent from '@/components/AppComponents/contentCommonUser/ProfileContent'
import QrCodeContent from '@/components/AppComponents/contentCommonUser/QrCodeContent'
import WalletContent from '@/components/AppComponents/contentCommonUser/WalletContent'
import HeaderHome from '@/components/AppComponents/headerHome'
import { useTab } from '@/contexts/tabContext'
import { TABS } from '@/utils/types/tabs'

const Home = () => {
  const { tabSelected } = useTab();
  return (
    <div className="bg-light " >
      <HeaderHome />

      <div className='bg-light h-screen rounded-t-40 absolute w-full top-20 pt-10 px-6'>
        <HomeContent hidden={tabSelected !== TABS.HOME} />
        <WalletContent hidden={tabSelected !== TABS.WALLET} />
        <QrCodeContent hidden={tabSelected !== TABS.QRCODE} />
        <HistoryContent hidden={tabSelected !== TABS.HISTORY} />
        <ProfileContent hidden={tabSelected !== TABS.PROFILE} />

        <AppLauncherPointsContent  hidden={tabSelected !== TABS.LAUNCHERPOINTS} />
        <AppRewardsContent  hidden={tabSelected !== TABS.DELIVEREDREWARDS} />
        <AppNotificationsContent  hidden={tabSelected !== TABS.NOTIFICATIONS} />
        <AppHomeContent hidden={tabSelected !== TABS.HOMEADMIN}/>

      </div>

      <BottomNavigation />


    </div>
  )
}

export default Home