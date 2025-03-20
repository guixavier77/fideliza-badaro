'use client'
import BottomNavigation from '@/components/AppComponents/bottonNavigation'

import HeaderHome from '@/components/AppComponents/headerHome'
import { useTab } from '@/contexts/tabContext'
import AppHomeContent from '@/screens/AppScreens/screenAdminUser/HomeContent'
import HomeContent from '@/screens/AppScreens/screenCommonUser/HomeContent'
import AppLauncherPointsContent from '@/screens/AppScreens/screenAdminUser/LauncherPointsContent'
import AppNotificationsContent from '@/screens/AppScreens/screenAdminUser/NotificationsContent'
import AppRewardsContent from '@/screens/AppScreens/screenAdminUser/RewardsContent'
import HistoryContent from '@/screens/AppScreens/screenCommonUser/HistoryContent'
import ProfileContent from '@/screens/AppScreens/screenCommonUser/ProfileContent'
import QrCodeContent from '@/screens/AppScreens/screenCommonUser/QrCodeContent'
import WalletContent from '@/screens/AppScreens/screenCommonUser/WalletContent'
import { TABS } from '@/utils/types/tabs'

const Home = () => {
  const { tabSelected } = useTab()
  console.log(tabSelected)
  return (
    <div className="bg-black ">
      <HeaderHome />
      <div className="bg-light rounded-t-40  w-full pt-10 px-6 s:pt-4 h-full">
        <HomeContent hidden={tabSelected !== TABS.HOME} />
        <WalletContent hidden={tabSelected !== TABS.WALLET} />
        <QrCodeContent hidden={tabSelected !== TABS.QRCODE} />
        <HistoryContent hidden={tabSelected !== TABS.HISTORY} />
        <ProfileContent hidden={tabSelected !== TABS.PROFILE} />
        <AppLauncherPointsContent
          hidden={tabSelected !== TABS.LAUNCHERPOINTS}
        />
        <AppRewardsContent hidden={tabSelected !== TABS.DELIVEREDREWARDS} />
        <AppNotificationsContent hidden={tabSelected !== TABS.NOTIFICATIONS} />
        <AppHomeContent hidden={tabSelected !== TABS.HOMEADMIN} />
      </div>

      <BottomNavigation />
    </div>
  )
}

export default Home
