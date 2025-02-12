import ButtonStyled from '@/components/GlobalComponents/button';
import InputStyled from '@/components/GlobalComponents/input';
import Loading from '@/components/GlobalComponents/loading';
import { DefaultContext } from '@/contexts/defaultContext';
import Promotion from '@/interfaces/promotion.interface';
import api from '@/services/api';
import PreFeedBack from '@/utils/feedbackStatus';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import FlagIcon from '@mui/icons-material/Flag';
import QrCodeIcon from '@mui/icons-material/QrCode';
import { Modal } from '@mui/material';
import { QRCodeSVG } from 'qrcode.react';
import { useCallback, useContext, useEffect, useState } from 'react';




interface ILauncherPoints {
  open: boolean;
  setIsClose: () => void,
  promotion?: Promotion


}

const ModalLauncherPoints: React.FC<ILauncherPoints> = ({ open, setIsClose, promotion }) => {
  const [launcherByCpf, setLauncherByCpf] = useState(false);
  const [generateQrCode, setGenerateQrCode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [idQrCode, setIdQrCode] = useState<string | null>(null)
  const {onShowFeedBack} = useContext(DefaultContext)

  const onErrorUpdate = (e: any) => {
    onShowFeedBack(PreFeedBack.error('Falhou ao gerar QR Code'))
    console.log('[ERROR API /launcherPoints/generateQrCode]', e?.response?.data)
    setIsClose();
  }
  const fnGenerateQrCode = async ( ) => {
    setLoading(false);
    api.get(`launcherPoints/generateQrCode/${promotion?.id}`)
      .then((res) =>  setIdQrCode(res?.data?.qrCode?.id))
      .catch((err) => onErrorUpdate(err))
      .finally(() => setLoading(true))
  }

  useEffect(() => {
    setLauncherByCpf(false);
    setGenerateQrCode(false);
  },[open])

  const onGenerateQrCode = useCallback(() => {
    setGenerateQrCode(true);
    setLauncherByCpf(false);
    fnGenerateQrCode();
  },[])


  const onLauncherByCpf = useCallback(() => {
    setLauncherByCpf(true);
    setGenerateQrCode(false);
  },[])

  const onLauncherBack = useCallback(() => {
    setLauncherByCpf(false);
    setGenerateQrCode(false);
  },[])

  return (
    <Modal
      open={open}
      onClose={setIsClose}
      className="flex justify-center items-center"
    >
      <div className='bg-white rounded-20 w-10/12 p-4'>
        {!launcherByCpf && !generateQrCode &&
          <>
            <p className='font-semibold text-xl text-center uppercase pb-5'>Como deseja lançar ?</p>
    
            <div className='flex flex-col gap-5'>
              <ButtonStyled
                  onClick={onGenerateQrCode}
                  icon={<QrCodeIcon style={{ fontSize: 32, color: '#FFFFFF' }} />}
                  type="button"
                  styles="w-full"
                  bgColor='bg-black'
                  title="Gerar QR Code"
              />
              <ButtonStyled
                  onClick={onLauncherByCpf}
                  icon={<AssignmentIndIcon style={{ fontSize: 32, color: '#FFFFFF' }} />}
                  type="button"
                  styles="w-full"
                  bgColor='bg-red'
                  title="Lançar por CPF"
              />
            </div>
          </>
        }

        {launcherByCpf && !generateQrCode &&
          <>
            <p className='font-semibold text-xl text-center uppercase pb-5'>Lançamento por CPF</p>
            <div className='flex flex-col gap-4'>
              <InputStyled
                id="cpf"
                // onChange={formik.handleChange}
                // value={masks.cpfMask(formik.values.cpf)}
                label="CPF"
                type="tel"
                placeholder="000.000.000-00"
                icon={<ArticleOutlinedIcon style={{ color: '#C90B0B' }} />}
              />


            </div>
            <div className='flex flex-col mt-5 gap-4'>
              <ButtonStyled
                  onClick={onGenerateQrCode}
                  type="button"
                  styles="w-full"
                  bgColor='bg-black'
                  title="Confirmar"
              />

              <ButtonStyled
                  onClick={onLauncherBack}
                  type="button"
                  styles="w-full"
                  bgColor='bg-red'
                  title="Voltar"
              />
            </div>
          </>
        }


        {!launcherByCpf && generateQrCode &&
          <>
            <p className='font-semibold text-xl text-center uppercase pb-2'>QR Code</p>
            <p className='font-light text-base text-center uppercase pb-5'>Instrua o usuário a escanear o QR Code abaixo</p>
            <div className='flex flex-col justify-center items-center'>
            {loading ? 
              <>
                {idQrCode && <QRCodeSVG value={'qrCode:' + idQrCode} />}
              </>
            :
              <Loading text='Gerando QR Code...'/>
          }

            </div>
            <div className='flex flex-col mt-5'>
              <ButtonStyled
                  onClick={onLauncherBack}
                  type="button"
                  styles="w-full"
                  bgColor='bg-red'
                  title="Voltar"
              />
            </div>
          </>
        }

        
      </div>
    </Modal>
  )
}

export default ModalLauncherPoints