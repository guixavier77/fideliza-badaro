'use client'
import { DefaultContext } from '@/contexts/defaultContext';
import { useTab } from '@/contexts/tabContext';
import { ROLE, ROLE_PTBR } from '@/utils/types/roles';
import { TABS_DASH } from '@/utils/types/tabs';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import GroupIcon from '@mui/icons-material/Group';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PersonIcon from '@mui/icons-material/Person';
import QrCodeIcon from '@mui/icons-material/QrCode';
import StoreIcon from '@mui/icons-material/Store';
import React, { useContext } from 'react';

const tabs = [
  {
    name: 'Dashboard',
    icon: <DashboardIcon />,
    value: TABS_DASH.DASH,
  },
  {
    name: 'Lojas',
    icon: <StoreIcon />,
    value: TABS_DASH.STORE,
    role: ROLE.SUPERADMIN

  },
  {
    name: 'Usuários',
    icon: <PersonIcon />,
    value: TABS_DASH.USERS,

  },
  {
    name: 'Prêmios',
    icon: <CardGiftcardIcon />,
    value: TABS_DASH.AWARDS,
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
  },

]

const AsideBar = () => {
  const { user } = useContext(DefaultContext)
  const { tabDashSelected, setTabDashSelected } = useTab();


  return (
    <div className='bg-black h-screen pt-7 flex flex-col justify-between shadow-xl col-start-1 col-end-3 row-start-1 row-end-13 '>
      <div>
        <h1 className=' flex flex-col text-4xl font-bold text-center text-white  leading-5 '>
          Fideliza<span className="text-red text-3xl ">Badaro</span>
        </h1>
        <div className='flex px-4 justify-center flex-col py-5 mt-5'>
          {tabs.map((tab) => (
            (tab.value !== TABS_DASH.STORE || user?.role === ROLE.SUPERADMIN) && (
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
            )
          ))}

        </div>

      </div>


      <div className=''>
        <div className='p-3  flex flex-row items-center gap-2 self-start '>
          <div className='bg-red w-12 h-12 rounded-full flex justify-center items-center'>

            <PersonIcon style={{
              fontSize: 36,
              color: '#FFFFFF',
            }} />
          </div>

          <div>
            <p className='text-white font-bold text-sm'>{user?.name?.substring(0, 17)}</p>
            <p className='text-white font-light text-sm'>{ROLE_PTBR[user?.role || 0]}</p>
          </div>

        </div>
      </div>




    </div >
  )
}

export default AsideBar