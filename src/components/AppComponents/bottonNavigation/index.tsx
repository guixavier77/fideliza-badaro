'use client'
import { DefaultContext } from '@/contexts/defaultContext'
import { useTab } from '@/contexts/tabContext'
import { ROLE } from '@/utils/types/roles'
import { TABS } from '@/utils/types/tabs'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import HistoryIcon from '@mui/icons-material/History'
import HomeIcon from '@mui/icons-material/Home'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'
import NotificationsIcon from '@mui/icons-material/Notifications'
import PersonIcon from '@mui/icons-material/Person'
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner'
import WalletIcon from '@mui/icons-material/Wallet'
import React, { useContext, useMemo } from 'react'

const styleIcons = {
  fontSize: 48,
  color: '#1D1D1D',
}
const tabsCommomUser = [
  {
    name: 'Ínicio',
    icon: <HomeIcon style={styleIcons} />,
    value: TABS.HOME,
  },
  {
    name: 'Carteira',
    icon: <WalletIcon style={styleIcons} />,
    value: TABS.WALLET,
  },
  {
    name: 'QR Code',
    icon: <QrCodeScannerIcon style={styleIcons} />,
    value: TABS.QRCODE,
  },
  {
    name: 'Histórico',
    icon: <HistoryIcon style={styleIcons} />,
    value: TABS.HISTORY,
  },
  {
    name: 'Perfil',
    icon: <PersonIcon style={styleIcons} />,
    value: TABS.PROFILE,
  },
]

const tabsAdminOrCashier = [
  {
    name: 'Ínicio',
    icon: <HomeIcon style={styleIcons} />,
    value: TABS.HOMEADMIN,
  },
  {
    name: 'Pontos',
    icon: <MonetizationOnIcon style={styleIcons} />,
    value: TABS.LAUNCHERPOINTS,
  },
  // {
  //   name: 'Resgates',
  //   icon: <EmojiEventsIcon style={styleIcons} />,
  //   value: TABS.DELIVEREDREWARDS,
  // },
  {
    name: 'Histórico',
    icon: <NotificationsIcon style={styleIcons} />,
    value: TABS.NOTIFICATIONS,
  },
  {
    name: 'Perfil',
    icon: <PersonIcon style={styleIcons} />,
    value: TABS.PROFILE,
  },
]

const BottomNavigation = () => {
  const { user } = useContext(DefaultContext)
  const { tabSelected, setTabSelected } = useTab()
  const renderTabs = useMemo(
    () => (user?.role === ROLE.CUSTOMER ? tabsCommomUser : tabsAdminOrCashier),
    [user],
  )
  return (
    <div className="fixed bottom-0 w-full bg-white z-20 shadow-lg">
      <div className="flex justify-between px-4 py-2 items-center">
        {renderTabs.map((tab, index) => (
          <button
            key={index}
            className={`flex items-center flex-col`}
            onClick={() => setTabSelected(tab.value)}
          >
            <div
              className={`${
                tabSelected === tab.value
                  ? 'bg-red w-16 h-16 flex justify-center items-center'
                  : ''
              } transition-colors duration-500 ease-in rounded-full`}
            >
              {React.cloneElement(tab.icon, {
                style: {
                  fontSize: 48,
                  color: tabSelected === tab.value ? '#FFFFFF' : '#1D1D1D',
                },
              })}
            </div>
            <p
              className={`${
                tabSelected === tab.value ? 'text-red' : ''
              } text-black font-semibold`}
            >
              {tab.name}
            </p>
          </button>
        ))}
      </div>
    </div>
  )
}

export default BottomNavigation
