import Promotion from '@/interfaces/promotion.interface'
import WalletCustomer from '@/interfaces/walletCustomer.interface'
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory'
import React, { useCallback, useState } from 'react'
import ModalRequestAward from '../../modals/ModalRequestAward'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
interface AppCardWalletContentProps {
  wallet?: WalletCustomer
}

const AppCardWalletContent: React.FC<AppCardWalletContentProps> = ({
  wallet,
}) => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const handleOpenModal = useCallback(() => {
    setOpenModal(true)
  }, [])
  return (
    <>
      <button
        onClick={handleOpenModal}
        className="bg-white shadow-lg py-4 px-3 rounded-20 flex justify-between items-center relative mb-3"
      >
        <div
          className={`absolute top-0 right-5 px-3 rounded-b-xl ${wallet?.active ? 'bg-yellow' : 'bg-red'}`}
        >
          <p className="text-[9px] text-black font-bold">
            {wallet?.active ? 'Em andamento' : 'Encerrado'}
          </p>
        </div>
        <div className="flex items-center gap-2 text-left ">
          <AccountBalanceWalletIcon style={{ fontSize: 52 }} />
          <div>
            <p className="font-bold">{wallet?.storeName}</p>
            <p className="font-extralight ">{wallet?.promotionName}</p>
          </div>
        </div>

        <p className="font-extralight text-2xl">
          {wallet?.points}/
          <span className="font-bold">{wallet?.maxPoints}</span>
        </p>
      </button>
      <ModalRequestAward
        open={openModal}
        setIsClose={() => setOpenModal(false)}
        wallet={wallet}
      />
    </>
  )
}

export default AppCardWalletContent
