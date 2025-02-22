import Promotion from '@/interfaces/promotion.interface';
import WalletCustomer from '@/interfaces/walletCustomer.interface';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';
import React from 'react';

interface AppCardWalletContentProps {
    wallet?: WalletCustomer
}

const AppCardWalletContent: React.FC<AppCardWalletContentProps> = ({ wallet }) => {
  return (
    <div className='bg-white shadow-md py-4 px-3 rounded-20 flex justify-between items-center relative'>
        <div className={`absolute top-0 right-5 px-3 rounded-b-xl ${wallet?.active ? 'bg-yellow' : 'bg-red'}`}>
          <p className='text-[9px] text-black font-bold'>{wallet?.active ? 'Em andamento' : 'Encerrado'}</p>
        </div>
        <div className='flex items-center gap-2'>
          <StoreMallDirectoryIcon style={{ fontSize: 52 }} />
          <div>
            <p className='font-bold'>{wallet?.storeName}</p>
            <p className='font-extralight'>{wallet?.promotionName}</p>
          </div>

        </div>


        <p className='font-extralight text-2xl'>
          {wallet?.points}/
          <span className='font-bold'>{wallet?.maxPoints}</span>
        </p>



      </div>
  )
}

export default AppCardWalletContent