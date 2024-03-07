'use client'
import React, { useContext } from 'react'
import Logo from '../logo'
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import GroupIcon from '@mui/icons-material/Group';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import QrCodeIcon from '@mui/icons-material/QrCode';
import { TABS_DASH } from '@/utils/types/tabs';
import { useTab } from '@/contexts/tabContext';

const tabs = [
  {
    name: 'Dashboard',
    icon: <DashboardIcon />,
    value: TABS_DASH.DASH,
  },
  {
    name: 'Usuários',
    icon: <PersonIcon />,
    value: TABS_DASH.USERS,

  },
  {
    name: 'Promoções',
    icon: <MonetizationOnIcon />,
    value: TABS_DASH.PROMOTIONS,
  },
  {
    name: 'Clientes',
    icon: <GroupIcon />,
    value: TABS_DASH.CUSTOMERS
  },
  {
    name: 'Resgates',
    icon: <EmojiEventsIcon />,
    value: TABS_DASH.REEWARDS
  },
  {
    name: 'QR Code',
    icon: <QrCodeIcon />,
    value: TABS_DASH.QRCODE

  }
]

const AsideBar = () => {
  const { tabDashSelected, setTabDashSelected } = useTab();
  console.log(tabDashSelected)

  return (
    <div className='bg-black h-screen w-[200px]'>
      <div>
        <h1 className=' flex flex-col text-4xl font-bold text-center text-white  leading-5 py-5 '>
          Fideliza<span className="text-red text-3xl ">Badaro</span>
        </h1>
        <div className='flex px-4 justify-center flex-col py-5 mt-5'>
          {tabs.map((tab) => (
            <button
              key={tab.value}
              className={`button ${tabDashSelected === tab.value ? 'bg-red py-2 rounded-40' : ''} pl-2 flex gap-5 items-center mb-5 transition-colors duration-300 ease-in`}
              onClick={() => setTabDashSelected(tab.value)}
            >
              {React.cloneElement(tab.icon, {
                style: {
                  fontSize: 36,
                  color: '#FFFFFF',
                }
              })}
              <p className='text-white font-bold'>{tab.name}</p>
            </button>
          ))}

        </div>

      </div>



    </div>
  )
}

export default AsideBar