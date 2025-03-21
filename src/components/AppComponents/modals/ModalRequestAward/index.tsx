import ButtonStyled from '@/components/GlobalComponents/button'
import { DefaultContext } from '@/contexts/defaultContext'
import WalletCustomer from '@/interfaces/walletCustomer.interface'
import PreFeedBack from '@/utils/feedbackStatus'
import CardGiftcard from '@mui/icons-material/CardGiftcard'
import CancelIcon from '@mui/icons-material/Cancel'
import { Modal } from '@mui/material'
import { useCallback, useContext } from 'react'

interface ILauncherPoints {
  open: boolean
  setIsClose: () => void
  wallet?: WalletCustomer
}

const ModalRequestAward: React.FC<ILauncherPoints> = ({
  open,
  setIsClose,
  wallet,
}) => {
  const { onShowFeedBack } = useContext(DefaultContext)

  const onErrorUpdate = (e: any) => {
    onShowFeedBack(PreFeedBack.error('Falhou ao gerar QR Code'))
    console.log('[ERROR API /launcherPoints/generateQrCode]', e?.response?.data)
    setIsClose()
  }

  console.log(wallet)
  const onLauncherByCpf = useCallback(() => {}, [])

  return (
    <Modal
      open={open}
      onClose={setIsClose}
      className="flex justify-center items-center"
    >
      <div className="bg-white rounded-20 w-10/12 p-4">
        <p className="font-semibold text-xl text-center uppercase pb-5">
          Solicitação de retirada do prêmio
        </p>
        <ButtonStyled
          onClick={onLauncherByCpf}
          icon={<CardGiftcard style={{ fontSize: 32, color: '#FFFFFF' }} />}
          type="button"
          styles="w-full"
          bgColor="bg-black"
          title="Enviar solicitação"
        />
        <ButtonStyled
          onClick={setIsClose}
          icon={<CancelIcon style={{ fontSize: 32, color: '#FFFFFF' }} />}
          type="button"
          styles="w-full mt-4"
          bgColor="bg-red"
          title="Cancelar"
        />
      </div>
    </Modal>
  )
}

export default ModalRequestAward
