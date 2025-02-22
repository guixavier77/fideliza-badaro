import React from 'react'
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';
import useLoadWalletCustomer from '@/hooks/useLoadWalletCustomer';
import AppCardWalletContent from '@/components/AppComponents/cards/AppCardWalet';
import Loading from '@/components/GlobalComponents/loading';

interface WalletContentProps {
  hidden: boolean;
}

const WalletContent: React.FC<WalletContentProps> = ({ hidden }) => {
  const {loading, data} = useLoadWalletCustomer(hidden);
  return (
    <div hidden={hidden}>
      <h1 className='text-black text-3xl font-bold text-center mb-5'>Pontos</h1>

      {loading ? 
        <div className='d-flex pb-10'>
          <Loading text='Buscando dados...'/>
        </div>
      : 
        <>
        {data?.map((wallet) => (
          <AppCardWalletContent wallet={wallet}/>
        ))}
        </>
      }

    </div>
  )
}

export default WalletContent