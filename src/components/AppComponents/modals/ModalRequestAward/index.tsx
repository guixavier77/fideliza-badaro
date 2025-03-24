import ButtonStyled from '@/components/GlobalComponents/button'
import { DefaultContext } from '@/contexts/defaultContext'
import WalletCustomer from '@/interfaces/walletCustomer.interface'
import PreFeedBack from '@/utils/feedbackStatus'
import CardGiftcard from '@mui/icons-material/CardGiftcard'
import CancelIcon from '@mui/icons-material/Cancel'
import { Modal } from '@mui/material'
import { useCallback, useContext, useState } from 'react'
import api from '@/services/api'

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
  const [loading, setloading] = useState<Boolean>(false)
  const { onShowFeedBack } = useContext(DefaultContext)

  const onError = (e: any) => {
    onShowFeedBack(PreFeedBack.error('Falhou ao enviar solicitação'))
    console.log('[ERROR API /requestAward]', e?.response?.data)
    setIsClose()
  }

  const onSuccess = (e: any) => {
    onShowFeedBack(PreFeedBack.success('Solicitação enviada com sucesso.'))
    if(wallet) wallet.requestAward = true;
    console.log('[ERROR API /requestAward]', e?.response?.data)
    setIsClose()
  }

  console.log(wallet)
  const onRequest = useCallback(() => {
    api.post(`requestAward/${wallet?.promotionId}`)
    .then(onSuccess)
    .catch(error => onError(error))
    .finally(() => setloading(false));
    
  }, [wallet])

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

        {wallet?.canRescue && !wallet.requestAward &&
          <>
            <ButtonStyled
              onClick={onRequest}
              icon={<CardGiftcard style={{ fontSize: 32, color: '#FFFFFF' }} />}
              type="button"
              styles="w-full"
              bgColor="bg-black"
              title="Enviar solicitação"
            />
          </>
        }


        {wallet?.canRescue && wallet.requestAward &&
          <>
            <p className="font-semibold text-xl text-center uppercase pb-5 text-green" >
              VOCÊ SOLICITOU SUA RETIRADA, AGUARDE O CONTATO DA LOJA.
            </p>
          </>
        }

        {!wallet?.canRescue &&
          <p className="font-semibold text-xl text-center uppercase pb-5 text-red" >
            VOCÊ NÃO ESTÁ APTO A SOLICITAR O PRÊMIO.

          </p>
        }
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
