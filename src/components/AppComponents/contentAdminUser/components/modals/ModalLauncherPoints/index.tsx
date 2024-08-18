import ButtonStyled from '@/components/GlobalComponents/button';
import InputStyled from '@/components/GlobalComponents/input';
import Promotion from '@/interfaces/promotion.interface';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import FlagIcon from '@mui/icons-material/Flag';
import QrCodeIcon from '@mui/icons-material/QrCode';
import { Modal } from '@mui/material';
import { QRCodeSVG } from 'qrcode.react';
import { useCallback, useEffect, useState } from 'react';




interface ILauncherPoints {
  open: boolean;
  setIsClose: () => void,
  promotion?: Promotion


}

const ModalLauncherPoints: React.FC<ILauncherPoints> = ({ open, setIsClose, promotion }) => {
  const [launcherByCpf, setLauncherByCpf] = useState(false);
  const [generateQrCode, setGenerateQrCode] = useState(false);

  useEffect(() => {
    setLauncherByCpf(false);
    setGenerateQrCode(false);
  },[open])

  const onGenerateQrCode = useCallback(() => {
    setGenerateQrCode(true);
    setLauncherByCpf(false);
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

              <InputStyled
                id="points"
                // onChange={formik.handleChange}
                // value={formik.values.points}
                label="Pontos"
                type="number"
                stylesInput='w-full'
                placeholder="Ex: 5"
                icon={<FlagIcon style={{ color: '#C90B0B' }} />}
              />

            </div>
            <div className='flex flex-col mt-5'>
              <ButtonStyled
                  onClick={onGenerateQrCode}
                  type="button"
                  styles="w-full"
                  bgColor='bg-red'
                  title="Confirmar"
              />

              <ButtonStyled
                  onClick={onLauncherBack}
                  type="button"
                  styles="w-full"
                  bgColor='bg-black'
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
              <QRCodeSVG 
                value="Guilherme"
              />

            </div>
            <div className='flex flex-col mt-5'>
              <ButtonStyled
                  onClick={setIsClose}
                  type="button"
                  styles="w-full"
                  bgColor='bg-red'
                  title="Cancelar"
              />
            </div>
          </>
        }

        
      </div>
    </Modal>
  )
}

export default ModalLauncherPoints