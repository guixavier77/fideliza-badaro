'use client'
import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import WalletIcon from '@mui/icons-material/Wallet';
import QrCodeIcon from '@mui/icons-material/QrCode';
import HistoryIcon from '@mui/icons-material/History';
import PersonIcon from '@mui/icons-material/Person';
import { TABS } from '@/utils/types/tabs';
import { useTab } from '@/contexts/tabContext';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';

const styleIcons = {
  fontSize: 48,
  color: '#1D1D1D'
}
const tabs = [
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
  }
];


const BottomNavigation = () => {
  const { tabSelected, setTabSelected } = useTab();

  return (
    <div className='w-screen h-20 bg-white z-10 absolute bottom-0 shadow-lg'>
      <div className='flex h-full items-center justify-between px-4'>
        {tabs.map((tab, index) => (
          <button key={index} className={`${tabSelected === tab.value ? 'mb-4' : ''} flex items-center flex-col `} onClick={() => setTabSelected(tab.value)}>
            <div className={`${tabSelected === tab.value ? 'bg-red rounded-full w-16 h-16 flex justify-center items-center' : ''} transition-colors duration-300 ease-in`}>
              {React.cloneElement(tab.icon, {
                style: {
                  fontSize: 48, 
                  color: tabSelected === tab.value ? '#FFFFFF' : '#1D1D1D' 
                }
              })}
            </div>
            <p className={`${tabSelected === tab.value ? 'text-red' : ''} text-black font-semibold`}>
              {tab.name}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomNavigation;
